# Base Image 
FROM node:12-alpine3.11
# Working directory 
WORKDIR /app
# copy package.json to the app direcory created
COPY package.json /app
# run install command
RUN npm install
# copy the rest of the soource files
COPY . /app
# run npm start
CMD ["npm", "start"]
