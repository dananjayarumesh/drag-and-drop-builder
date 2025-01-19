FROM node:22.9.0
# This is the latest available LTS version. Newer versions might be available
# at https://hub.docker.com/_/node Version last checked on 10 Oct 2022.

# node may come with an older version of npm. Ensure we have a specific npm.
RUN npm install -g npm@11.0.0
# To check if newer versions are available, see https://www.npmjs.com/package/npm


################################################################################
# Install prerequisites
RUN apt-get update
RUN apt-get install -y \
    lsb-release \
    curl