# FROM alpine:latest  
# CMD ["echo", "Hello, World!"]

# Use the official Nginx image from Docker Hub
FROM nginx:alpine

# Copy the static HTML files into the Nginx container
COPY . /usr/share/nginx/html

# Expose port 80 (the default HTTP port)
EXPOSE 80