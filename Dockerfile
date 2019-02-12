FROM node:alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Copying source files
COPY . .

# Installing dependencies
RUN apk add yarn
RUN apk --no-cache add --virtual builds-deps build-base python
# RUN apk add vips-dev fftw-dev build-base --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/
RUN yarn
RUN yarn run build


# Running the app
CMD [ "yarn", "run", "start" ]
