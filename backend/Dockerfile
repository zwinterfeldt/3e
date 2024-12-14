# Use the official Python image from the Docker Hub
FROM python:3.9-slim as base

# Set the working directory to /app
WORKDIR /app

# Copy requirements.txt into the application directory
COPY app/requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY app/ /app/

# Set environment variables
ENV FLASK_APP=app.py

# Expose port for Flask
EXPOSE 5000

# Main application
FROM base AS main_app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]

# First microservice: file_sharing
FROM base AS file_sharing_service
EXPOSE 5003
CMD ["python", "file_sharing.py"]

# Second microservice: calendar_and_email
FROM base AS calendar_and_email_service
EXPOSE 5001
CMD ["python", "calendar_and_email.py"]

# Third microservice: guest_list
FROM base AS guestlist
WORKDIR /app/guest_list
EXPOSE 5002
CMD ["python", "guestlist.py"]
