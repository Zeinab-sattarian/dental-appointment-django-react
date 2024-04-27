# The first instruction is what image we want to base our container on
# We Use an official Python runtime as a parent image
FROM python:latest

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip3 install --upgrade pip
COPY /backend/requirements.txt .
RUN pip3 install -r requirements.txt

# copy project
COPY /backend .