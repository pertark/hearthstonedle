FROM node:18-bullseye AS build

WORKDIR /app
COPY client/package*.json .
RUN npm install 
# RUN npm ci # fix this later
COPY client/ .
RUN npm run build

FROM nginx:alpine
# gonna need to remove build artifacts later
COPY --from=build /app/ /var/www/html
CMD ["nginx", "-g", "daemon off;"]
