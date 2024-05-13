FROM node:18.13.0-bullseye as builder
WORKDIR /opt/deployment
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18.13.0-bullseye
WORKDIR /opt/deployment/backend
COPY package*.json ./
COPY ecosystem.config.js .
COPY start.sh .
RUN npm install --only=production
RUN npm install pm2 -g
COPY --from=builder /opt/deployment/dist .
EXPOSE 3000
# CMD npm run pm2:prod
ENTRYPOINT [ "/opt/deployment/backend/start.sh" ]