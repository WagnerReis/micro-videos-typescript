FROM node:14.15.4-slim

USER node

WORKDIR /home/nome/app

CMD [ "tail", "-f", "/dev/null" ]