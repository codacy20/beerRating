# This dockerfile configures a docker base on (Choose)

# you can create .dockerignore file as well
# add 2 line below to that file
#node_modules
#npm-debug.log


# Put this Dockerfile in same folder as your app then follow Build and Run Command below

# Build: 
# To build the docker use the following command if you have --build-arg add them
# (sudo) docker build . --tag (name ur image) 
# Note: each instruction in your Dockerfile results in a new image layer being created and added to your local image cache. That image then becomes the parent for the image created by the next instruction

# Run: 
# run your app map 4000 of the host docker to 8080 exposed port 
# (sudo) docker run --name=(name ur container) -d -i -t -p 4000:8080 (ImageName):tag 
# OR
# $ docker run \
#      -e "NODE_ENV=production" \
#      -u "node" \
#      -m "300M" --memory-swap "1G" \
#      -w "/home/node/app" \
#      --name "my-nodejs-app" \
#      node [script]

# official Node.js image is based on Debian Linux, you can choose any small image that you like 
# for example mhart/alpine-node:latest or base, each already have dependencies installed, some you have to add dependencies yourself
# take a look at https://hub.docker.com/_/node/
FROM node:carbon


# Next Step
# copy our whole project code to the image
# run npm install
# done! mic drop hahaha

# uncomment below if you need global npm dependencies
#ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
ADD . /opt/app

####################### Below is just general approach but above is more optimize regarding image cache

## Create app directory
#WORKDIR /usr/src/app

## Install app dependencies
## A wildcard is used to ensure both package.json AND package-lock.json are copied
## where available (npm@5+)
#COPY package*.json ./

#RUN npm install
## If you are building your code for production
## RUN npm install --only=production

## Bundle app source
#COPY . .

#######################

EXPOSE 3000

CMD [ "npm", "start" ] 
# or CMD ["node","index.js"]