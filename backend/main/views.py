from django.forms import ValidationError
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from .models import Time, Review
from .permissions import IsDoctor
from .serializer import *
from .permissions import IsRegularUser
from django.contrib.auth import get_user_model

User = get_user_model()



class SignupAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Successfully logged in.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView(APIView):
    def get(self, request):
        logout(request)
        return Response({'message': 'Successfully logged out.'})


class TimeCreateAPIView(generics.CreateAPIView):
    queryset = Time.objects.all()
    serializer_class = TimeSerializer
    permission_classes = [IsAuthenticated, IsDoctor]

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user)


class ReviewCreateAPIView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsRegularUser]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DoctorReviewsAPIView(generics.ListAPIView):
    serializer_class = ReviewSerializer

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
    queryset = User.objects.filter(user_type='doctor')
    serializer_class = DoctorSerializer


class AvailableTimesAPIView(generics.ListAPIView):
    serializer_class = TimeSerializer

    def get_queryset(self):
        doctor_id = self.kwargs['doctor_id']
        return Time.objects.filter(doctor__id=doctor_id, available=True)


class AllTimesAPIView(generics.ListAPIView):
    serializer_class = TimeSerializer
    permission_classes = [IsAuthenticated, IsDoctor]

    def get_queryset(self):
        return Time.objects.filter(doctor=self.request.user)


class NotAvailableTimesAPIView(generics.ListAPIView):
    serializer_class = TimeSerializer
    permission_classes = [IsAuthenticated, IsDoctor]

    def get_queryset(self):
        return Time.objects.filter(doctor=self.request.user, available=False)


class UserTimesAPIView(generics.ListAPIView):
    serializer_class = TimeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Time.objects.filter(user=self.request.user)


class BookTimeAPIView(generics.UpdateAPIView):
    queryset = Time.objects.all()
    serializer_class = TimeSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        if serializer.instance.available and not serializer.instance.user:
            serializer.save(user=self.request.user, available=False)
        else:
            raise ValidationError('This time slot is not available for booking.')
