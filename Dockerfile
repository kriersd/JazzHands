FROM registry.redhat.io/ubi7/ubi

USER root

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production
# RUN npm update

RUN rpm -Uvh http://mirror.pnl.gov/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
RUN yum install nodejs npm -y

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
