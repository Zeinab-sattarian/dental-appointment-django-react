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
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if(user is not None and user.user_type == 'doctor'):
                user = DoctorProfile.objects.create(user=user)
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


class ReviewCreateAPIView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):

        doctor_id = request.data['doctor_id']
        text = request.data['text']

        doctor = User.objects.filter(id=doctor_id).first()
        if doctor is not None:
            if request.user.is_authenticated and request.user.user_type == 'regular':
                Review.objects.create(doctor=doctor, text=text, user=request.user)
            else:
                Review.objects.create(doctor=doctor, text=text)
        else:
            return Response({'message': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'successfully created review'})


class DoctorReviewsAPIView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        """
        This view should return a list of all reviews
        for the doctor as determined by the doctor_id portion of the URL.
        """
        doctor_id = self.kwargs['doctor_id']
        return Review.objects.filter(doctor__id=doctor_id)
    
class DoctorAuthReviewsAPIView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsDoctor]

    def get_queryset(self):
        """
        This view should return a list of all reviews
        for the doctor as determined by the doctor_id portion of the URL.
        """
        return Review.objects.filter(doctor=self.request.user)
    
class AllReviewsAPIView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        """
        This view should return a list of all reviews
        for the doctor as determined by the doctor_id portion of the URL.
        """
        return Review.objects.all()


class ListDoctorsAPIView(generics.ListAPIView):
    queryset = User.objects.filter(user_type='doctor')
    serializer_class = DoctorSerializer
    permission_classes = []
    authentication_classes = []


class DoctorDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = DoctorDetailSerializer
    def get_object(self):
        doctor_id = self.kwargs['pk']
        return DoctorProfile.objects.filter(user__id=doctor_id).first()


class AvailableTimesAPIView(generics.ListAPIView):
    serializer_class = TimeSerializer

    def get_queryset(self):
        doctor_id = self.kwargs['doctor_id']
        return Time.objects.filter(doctor__id=doctor_id, available=True)


class AvailableTimesAPIView(generics.ListAPIView):
    serializer_class = TimeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsDoctor]

    def get_queryset(self):
        return Time.objects.filter(doctor=self.request.user, available=True)
    
class PublicAvailableTimesAPIView(generics.ListAPIView):
    serializer_class = TimeSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        doctor_id = self.kwargs['doctor_id']
        return Time.objects.filter(doctor__id=doctor_id, available=True)

class AllTimesAPIView(generics.ListAPIView):
    serializer_class = TimeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsDoctor]

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
        


class BookTimeAPIView(views.APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request):

        time_id = request.data['time_id']
        phone_number = request.data['phone_number']

        time = Time.objects.get(id=time_id)

        if time.available and not time.user:
            time.phone_number=phone_number
            time.available = False
            time.user=self.request.user
            time.save()
            return Response({'message': 'successfully updated'})
        else:
            raise ValidationError('This time slot is not available for booking.')
        


class UpdateDoctorProfileAPIView(views.APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsDoctor]

    def patch(self, request):

        about = request.data['about']
        major = request.data['major']
        experience = request.data['experience']

        profile = DoctorProfile.objects.filter(user__id=self.request.user.id).first()

        if self.request.user.user_type == 'doctor':
            profile.about=about
            profile.major=major
            profile.experience=experience
            profile.save()
            return Response({'message': 'successfully updated'})
        else:
            raise ValidationError('You Are A a Doctor')
