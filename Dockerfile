FROM node:18-bullseye AS build

WORKDIR /app
COPY client/package*.json .
RUN npm install 
# RUN npm ci # fix this later
COPY client/ .
RUN npm run build

FROM scratch as dist
WORKDIR /app
COPY --from=build /app/index.html .
COPY --from=build /app/dist dist

FROM nginx:alpine
COPY --from=dist /app /var/www/html
CMD ["nginx", "-g", "daemon off;"]
