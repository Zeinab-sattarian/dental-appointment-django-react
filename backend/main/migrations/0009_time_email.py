# Generated by Django 5.0.6 on 2024-06-02 01:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_time_approved_user_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='time',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]
