from django.urls import path
from .views import *


urlpatterns = [
    path('api/signup/', SignupAPIView.as_view(), name='signup'),
    path('api/login/', ObtainTokenView.as_view(), name='login'),
    path('api/times/create/', TimeCreateAPIView.as_view(), name='create-time'),
    path('api/reviews/create/', ReviewCreateAPIView.as_view(), name='create-review'),
    path('api/doctors/<int:doctor_id>/reviews/', DoctorReviewsAPIView.as_view(), name='doctor-reviews'),
    path('api/doctors/reviews/', AllReviewsAPIView.as_view(), name='all-reviews'),
    path('api/doctors/dashboard/reviews/', DoctorAuthReviewsAPIView.as_view(), name='all-reviews'),
    path('api/doctors/', ListDoctorsAPIView.as_view(), name='list-doctors'),
    path('api/doctors/<int:pk>/', DoctorDetailAPIView.as_view(), name='doctor-detail'),
    path('api/doctors/<int:doctor_id>/times/available/', PublicAvailableTimesAPIView.as_view(), name='public-available-times'),
    path('api/doctors/times/all/', AllTimesAPIView.as_view(), name='all-times'),
    path('api/doctors/times/available/', AvailableTimesAPIView.as_view(), name='available-times'),
    path('api/doctors/times/not-available/', NotAvailableTimesAPIView.as_view(), name='not-available-times'),
    path('api/doctors/profile/update/', UpdateDoctorProfileAPIView.as_view(), name='update-profile'),
    path('api/user/times/', UserTimesAPIView.as_view(), name='user-times'),
    path('api/times/book/', BookTimeAPIView.as_view(), name='book-time'),
    path('api/times/approve/', ApproveTimeAPIView.as_view(), name='approve-time'),
]