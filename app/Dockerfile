FROM node:14

WORKDIR /app

COPY /app/package.json .

# RUN npm install --global --unsafe-perm yarn

# RUN npm install --global --unsafe-perm nodemon

RUN yarn

COPY /app .

EXPOSE 3000

CMD [ "yarn", "dev"]
# RUN npm start dev