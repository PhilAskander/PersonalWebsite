# Step 1: Build the Angular app
FROM node:18-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Step 2: Serve with NGINX
FROM nginx:alpine

# Remove default NGINX page
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular files
COPY --from=build /app/dist/* /usr/share/nginx/html

# Expose port 80 (what Kubernetes will map to)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
