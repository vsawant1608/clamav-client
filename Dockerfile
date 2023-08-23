# Install the app dependencies in a full Node docker image
FROM registry.access.redhat.com/ubi8/nodejs-18:latest
USER root
RUN yum -y update
RUN yum -y install nc wget bind-utils iputils

# Copy package.json, and optionally package-lock.json if it exists
COPY package.json package-lock.json* ./

# Install app dependencies
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else npm install; \
  fi

# # Copy the dependencies into a Slim Node docker image
# FROM registry.access.redhat.com/ubi8/nodejs-18-minimal:latest
# USER root
# RUN yum -y install nc wget bind-utils iputils

# Install app dependencies
# COPY --from=0 /opt/app-root/src/node_modules /opt/app-root/src/node_modules
# COPY . /opt/app-root/src

ENV NODE_ENV production
ENV PORT 3001

CMD ["npm", "start"]