FROM node:20-alpine as build
WORKDIR /app
COPY *.json ./
RUN npm install
COPY . ./
RUN npm run build
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80