from flask import Flask, request, jsonify, send_file
from minio import Minio
from minio.error import S3Error
import tempfile
import os
from datetime import timedelta

from flask import Blueprint, jsonify, request

filesharing_routes = Blueprint("filesharing_routes", __name__)

# Configure the MinIO client
minioClient = Minio(
    'localhost:9000', 
    access_key='minioadmin', 
    secret_key='minioadmin', 
    secure=False
)

bucket_name = "my-bucket" 

# Create bucket if it doesn't exist
if not minioClient.bucket_exists(bucket_name):
    minioClient.make_bucket(bucket_name)
    print(f"Bucket '{bucket_name}' created.")
else:
    print(f"Bucket '{bucket_name}' already exists.")

# Create upload file endpoint
@filesharing_routes.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    try:
        # Put the file object directly using the MinIO client
        minioClient.put_object(bucket_name, file.filename, file.stream, -1, part_size=10*1024*1024, content_type=file.content_type)
        return jsonify({'message': 'File uploaded successfully'}), 200
    except S3Error as e:
        return jsonify({'error': str(e)}), 500

# Create files endpoint
@filesharing_routes.route('/files', methods=['GET'])
def list_files():
    try:
        objects = minioClient.list_objects(bucket_name)
        files = [obj.object_name for obj in objects]
        return jsonify(files), 200
    except S3Error as e:
        return jsonify({'error': str(e)}), 500

# Create download file endpoint
@filesharing_routes.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    try:
        # Create a temporary directory
        temp_dir = tempfile.gettempdir()  # Gets the temp directory for your OS
        file_path = os.path.join(temp_dir, filename)

        # Download file from MinIO
        response = minioClient.get_object(bucket_name, filename)
        with open(file_path, 'wb') as file_data:
            for d in response.stream(32 * 1024):
                file_data.write(d)

        # Serve the file as a download
        return send_file(file_path, as_attachment=True, download_name=filename)
    except S3Error as e:
        return jsonify({"error": str(e)}), 500
    except FileNotFoundError as e:
        return jsonify({"error": "File not found"}), 404

# Create share file endpoint
@filesharing_routes.route('/share/<filename>', methods=['GET'])
def share_file(filename):
    try:
        # Generate presigned URL
        url = minioClient.presigned_get_object(bucket_name, filename, expires=timedelta(hours=1))
        return jsonify({"url": url}), 200
    except S3Error as e:
        return jsonify({"error": str(e)}), 500
