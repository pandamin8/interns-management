FROM node:alpine
WORKDIR /usr/src/backend
RUN npm i -g npm@latest
RUN npm i -g nodemon
#RUN npm i
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
#CMD "npm" "run" "dev"
