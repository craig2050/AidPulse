# Use the official Python 3.11 image
FROM python:3.13-slim

# Set the working directory
WORKDIR /workspace

# Install required system dependencies (adjust as needed)
RUN apt-get update && apt-get install -y curl git && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /workspace/
RUN pip install --no-cache-dir -r requirements.txt || echo "No requirements.txt found, skipping install."

# Default command
CMD sleep infinity