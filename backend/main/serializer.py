from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Time, Review


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'name', 'cellphone', 'user_type')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            name=validated_data['name'],
            cellphone=validated_data['cellphone'],
            user_type=validated_data['user_type'],
            password=validated_data['password']
        )
        return user


class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = ['id', 'dateTime', 'available', 'text', 'doctor']
        read_only_fields = ['doctor']  # Doctor will be set based on the request user

    def create(self, validated_data):
        validated_data['doctor'] = self.context['request'].user
        return super().create(validated_data)



class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'doctor', 'user', 'text']
        read_only_fields = ['user']  # User will be set based on the request user

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
    

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'cellphone', 'user_type', 'password']
        # You might want to customize the fields based on what details about the doctor you want to expose.

    
class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = ['id', 'doctor', 'dateTime', 'available', 'text', 'user']
