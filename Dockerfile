FROM nginx:1.13.0-alpine
RUN apk add --no-cache nodejs &&\
    apk add --no-cache git &&\
    apk add --no-cache openssl
RUN mkdir ssl &&\
    cd ssl &&\
    openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem

ADD ssl /etc/nginx/ssl
ADD package.json /tmp/app/package.json
RUN cd /tmp/app &&\
    npm install

ADD . /tmp/app
RUN cd /tmp/app &&\
    npm run build &&\
    mv ./dist/* /usr/share/nginx/html/

RUN rm -Rf /tmp/app &&\
    rm -Rf /root/.npm

EXPOSE 80