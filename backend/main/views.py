from django.forms import ValidationError
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from rest_framework import views, permissions, status
from rest_framework.permissions import IsAuthenticated
from .models import DoctorProfile, Time, Review
from .permissions import IsDoctor
from .serializer import *
from .permissions import IsRegularUser
from django.contrib.auth import get_user_model
from .authentication import JWTAuthentication



User = get_user_model()



class SignupAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ObtainTokenView(views.APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ObtainTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        username_or_phone_number = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')

        user = User.objects.filter(username=username_or_phone_number).first()
        if user is None:
            user = User.objects.filter(phone_number=username_or_phone_number).first()

        if user is None or not user.check_password(password):
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate the JWT token
        jwt_token = JWTAuthentication.create_jwt(user)

        return Response({'token': jwt_token, 'userType': user.user_type})


class TimeCreateAPIView(generics.CreateAPIView):
    queryset = Time.objects.all()
    serializer_class = CreateTimeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsDoctor]

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user)


class ReviewCreateAPIView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsRegularUser]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DoctorReviewsAPIView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        """
        This view should return a list of all reviews
        for the doctor as determined by the doctor_id portion of the URL.
        """
        doctor_id = self.kwargs['doctor_id']
        return Review.objects.filter(doctor__id=doctor_id)


class ListDoctorsAPIView(generics.ListAPIView):
    queryset = User.objects.filter(user_type='doctor')
    serializer_class = DoctorSerializer


class DoctorDetailAPIView(generics.RetrieveAPIView):
    serializer_class = DoctorDetailSerializer
    def get_queryset(self):
        doctor_id = self.kwargs['pk']
        return DoctorProfile.objects.get(user__id=doctor_id)


class AvailableTimesAPIView(generics.ListAPIView):
    serializer_class = TimeSerializer

    def get_queryset(self):
        doctor_id = self.kwargs['doctor_id']
        return Time.objects.filter(doctor__id=doctor_id, available=True)


class AllTimesAPIView(generics.ListAPIView):
    serializer_class = TimeSerializer
    permission_classes = [IsAuthenticated, IsDoctor]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Time.objects.filter(doctor=self.request.user)


class NotAvailableTimesAPIView(generics.ListAPIView):
    serializer_class = TimeSerializer
    permission_classes = [IsAuthenticated, IsDoctor]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Time.objects.filter(doctor=self.request.user, available=False)


class UserTimesAPIView(generics.ListAPIView):
    serializer_class = TimeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Time.objects.filter(user=self.request.user)


class BookTimeAPIView(generics.UpdateAPIView):
    queryset = Time.objects.all()
    serializer_class = TimeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        if serializer.instance.available and not serializer.instance.user:
            serializer.save(user=self.request.user, available=False)
        else:
            raise ValidationError('This time slot is not available for booking.')
