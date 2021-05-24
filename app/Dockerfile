FROM node:14

WORKDIR /app

COPY /app/package.json .

RUN yarn

COPY /app .

EXPOSE 3000

CMD [ "yarn", "dev"]
# RUN npm start dev