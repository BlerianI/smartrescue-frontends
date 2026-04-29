# --- Build Stage ---
FROM node:20 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Argument for the VITE_API_URL, this must be passed during `docker build`
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the Quasar application
# Assuming Quasar CLI is not installed globally, we can use npx
RUN npx quasar build

# --- Production Stage ---
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /app/dist/spa /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
