FROM node:18-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

EXPOSE 3000
