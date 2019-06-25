# FROM registry.redhat.io/ubi7/ubi#
FROM davekrier/nodejs-10

USER root

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
