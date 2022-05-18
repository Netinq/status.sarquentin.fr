FROM node:alpine
WORKDIR /usr/share/node/app
COPY --chown=node:node ./app /usr/share/node/app
USER node
RUN npm install
EXPOSE 3000
CMD [ "node", "server.js" ]
