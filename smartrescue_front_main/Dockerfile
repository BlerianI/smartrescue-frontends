# --- Build Stage ---
FROM node:20 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --ignore-scripts

# Copy the rest of the application code
COPY . .

# Argument for variables, these must be passed during `docker build`
ARG VITE_API_URL
ARG VITE_DEEPL_API_KEY
ARG VITE_DEEPL_URL

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_DEEPL_API_KEY=$VITE_DEEPL_API_KEY
ENV VITE_DEEPL_URL=$VITE_DEEPL_URL

# Build the Quasar application as PWA
RUN npx quasar build -m pwa

# --- Production Stage ---
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder (PWA folder!)
COPY --from=builder /app/dist/pwa /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
