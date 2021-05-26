FROM node:14

USER root 

WORKDIR /app

COPY /app/package.json .

COPY /app/run.sh .

RUN chmod 755 ./run.sh

RUN apt-get update

RUN apt-get --yes install mysql-client

RUN yarn

COPY /app .

EXPOSE 3000

ENTRYPOINT ["bash","./run.sh"]