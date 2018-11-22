FROM node:8.9-alpine as node

RUN npm install pm2 -g
# ENV PM2_PUBLIC_KEY XXXX
# ENV PM2_SECRET_KEY YYYY
COPY . /usr/app-e-authorization/
COPY package.json /usr/app-e-authorization
#COPY .npmrc ./
WORKDIR /usr/app-e-authorization/
RUN npm install --only=production

#default environment variables
ENV NODE_ENV production
ENV PORT 8098
EXPOSE 8098
CMD ["pm2-runtime", "server.js"]