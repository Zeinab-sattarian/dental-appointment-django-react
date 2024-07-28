from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import DoctorProfile, Time, Review


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'name', 'user_type', 'city')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            name=validated_data['name'],
            city=validated_data['city'],
            user_type=validated_data['user_type'],
            password=validated_data['password']
        )
        return user


class CreateTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = ['id', 'dateTime', 'available', 'hour', 'doctor']
        read_only_fields = ['doctor']  # Doctor will be set based on the request user

    def create(self, validated_data):
        validated_data['doctor'] = self.context['request'].user
        return super().create(validated_data)



class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'doctor', 'text', 'created_at']
    
class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['doctor_id', 'text']
    

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = DoctorProfile
        fields = ['id', 'user', 'about', 'experience', 'major']
        # You might want to customize the fields based on what details about the doctor you want to expose.

class DoctorDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = DoctorProfile
        fields = ['id', 'user', 'about', 'experience', 'major']
        # You might want to customize the fields based on what details about the doctor you want to expose.

    
class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = ['id', 'doctor', 'dateTime', 'available', 'hour', 'user', 'phone_number', 'approved']


class ObtainTokenSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()