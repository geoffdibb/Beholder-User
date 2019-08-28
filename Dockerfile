FROM node:10 as base
COPY . .
RUN npm install
ENTRYPOINT ["npm","run", "server"]
