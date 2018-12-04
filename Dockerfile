FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive

RUN sed -i -e 's/us.archive.ubuntu.com/archive.ubuntu.com/g' /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y gnupg

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs

RUN apt-get -y -q install gdb libreoffice libreoffice-writer ure libreoffice-java-common libreoffice-core libreoffice-common openjdk-8-jre fonts-opensymbol hyphen-fr hyphen-de hyphen-en-us hyphen-it hyphen-ru fonts-dejavu fonts-dejavu-core fonts-dejavu-extra fonts-droid-fallback fonts-dustin fonts-f500 fonts-fanwood fonts-freefont-ttf fonts-liberation fonts-lmodern fonts-lyx fonts-sil-gentium fonts-texgyre fonts-tlwg-purisa
RUN apt-get -y -q remove libreoffice-gnome
EXPOSE 8997

RUN adduser --home=/opt/libreoffice --disabled-password --gecos "" --shell=/bin/bash libreoffice

WORKDIR /app
COPY index.js .
COPY package.json .

RUN ["npm", "install"]

EXPOSE 3000

CMD ["node", "index"]