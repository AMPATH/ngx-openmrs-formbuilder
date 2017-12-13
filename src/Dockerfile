FROM nginx:1.13.0-alpine


RUN apk add --no-cache bash=4.3.46-r5 &&\
    apk add --no-cache libressl-dev qt-dev &&\
    apk add --no-cache nodejs &&\
    apk add --no-cache git

ADD package.json /tmp/npm_inst/package.json
RUN cd /tmp/npm_inst &&\
    npm install &&\
    mkdir -p /tmp/app &&\
    mv /tmp/npm_inst/node_modules /tmp/app/


ADD . /tmp/app
RUN cd /tmp/app &&\
    npm run build &&\
    mv ./dist/* /usr/share/nginx/html/

RUN rm -Rf /tmp/npm_inst  &&\
    rm -Rf /tmp/app &&\
    rm -Rf /root/.npm &&\
    apk del nodejs

EXPOSE 80