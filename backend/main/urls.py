from django.urls import path
from .views import *

urlpatterns = [
    path('api/signup/', SignupAPIView.as_view(), name='signup'),
    path('api/login/', LoginAPIView.as_view(), name='login'),
    path('api/logout/', LogoutAPIView.as_view(), name='logout'),
    path('api/times/create/', TimeCreateAPIView.as_view(), name='create-time'),
    path('api/reviews/create/', ReviewCreateAPIView.as_view(), name='create-review'),
    path('api/doctors/<int:doctor_id>/reviews/', DoctorReviewsAPIView.as_view(), name='doctor-reviews'),
    path('api/doctors/', ListDoctorsAPIView.as_view(), name='list-doctors'),
    path('api/doctors/<int:pk>/', DoctorDetailAPIView.as_view(), name='doctor-detail'),
    path('api/doctors/<int:doctor_id>/times/available/', AvailableTimesAPIView.as_view(), name='available-times'),
    path('api/doctors/times/all/', AllTimesAPIView.as_view(), name='all-times'),
    path('api/doctors/times/not-available/', NotAvailableTimesAPIView.as_view(), name='not-available-times'),
    path('api/user/times/', UserTimesAPIView.as_view(), name='user-times'),
    path('api/times/<int:pk>/book/', BookTimeAPIView.as_view(), name='book-time'),
]