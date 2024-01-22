FROM node:alpine

RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend
RUN npm i -g npm@latest
RUN npm i -g nodemon
#RUN npm i
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
#CMD "npm" "run" "dev"
