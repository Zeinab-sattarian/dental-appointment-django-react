from django.urls import path, include

urlpatterns = [
    path('main/', include('main.urls')),  # Include your app's URLs
]
