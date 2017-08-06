FROM node:6.9.1-alpine

ARG DOCKER_HOST
ARG PORT=6300

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

# Install Yarn and Node.js dependencies
RUN npm install yarn --global --no-progress --silent --depth 0 && \
    yarn --production --no-progress

# Copy app
COPY . /usr/src/app


EXPOSE ${PORT}
CMD [ "node", "bin/server.js" ]

