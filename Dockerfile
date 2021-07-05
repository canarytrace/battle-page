# https://codingwithmanny.medium.com/configure-self-signed-ssl-for-nginx-docker-from-a-scratch-7c2bcd5478c6
FROM alpine

ENV APP_DIR /var/www/localhost/htdocs
ENV NGINX_CONFIG nginx-alpine-ssl

COPY . ${APP_DIR}
# RUN
RUN apk add nginx
# CONFIGUTATIONS
# nginx configuration
ADD ${NGINX_CONFIG}/config/default.conf /etc/nginx/http.d/default.conf
# keys and certs
ADD ${NGINX_CONFIG}/config/*.key /etc/ssl/private/
ADD ${NGINX_CONFIG}/config/*.crt /etc/ssl/certs/
WORKDIR $APP_DIR
# ENTRYPOINT
COPY ${NGINX_CONFIG}/config/entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]
# EXPOSE PORTS
EXPOSE 80
EXPOSE 443
# RUN COMMAND
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;'; nginx -s reload;"]