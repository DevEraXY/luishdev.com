FROM node:18-bullseye

# Install dependencies
RUN apt-get update && \
    apt-get install -y git curl && \
    npm install -g npm && \
    npm install -g turbo

WORKDIR /workspace