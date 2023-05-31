# Base image with Node.js and VSCode installed
FROM node:20

RUN useradd -ms /bin/bash devuser

# Install necessary build tools
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends build-essential

RUN mkdir /app
WORKDIR /
COPY . /app

RUN npm install -g npm@latest && npm install -g yo generator-code typescript @vscode/vsce

EXPOSE 8888

USER devuser

# Start the VSCode extension development environment
CMD ["npm", "run", "watch"]