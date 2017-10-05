FROM mhart/alpine-node:6.2.1
WORKDIR /src
ADD . .
RUN npm install
EXPOSE 9000
CMD ["npm", "run", "prod"]