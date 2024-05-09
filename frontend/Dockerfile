# Stage 1: Build the Angular application
FROM node:14 as build
ENV APP_HOME=/opt/deployment
WORKDIR ${APP_HOME}
COPY package*.json ./ 
RUN npm install
COPY . .
RUN ls
RUN echo "Current working directory: $(pwd)"
RUN npm run build --configuration=production --output-path=dist
RUN ls  ${APP_HOME}/dist/

# Stage 2: Serve the application with Nginx
FROM nginx:1.19.2-alpine
ENV APP_HOME=/opt/deployment
COPY --from=build ${APP_HOME}/dist/ ${APP_HOME}
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]