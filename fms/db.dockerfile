FROM node:9.3.0-slim
WORKDIR /fms

ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install 

ADD . /fms

EXPOSE 3000

CMD ["npm", "run", "start:db"]
