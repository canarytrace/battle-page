# Demo Web

## How to open

- open browser with `localhost` => http
- open browser with `https://localhost` => https, http/2

### Version / Tag 1
`docker run -it --rm -d -p 80:80 -p 443:443 --name demo-web rdpanek/demo-web:1`

**Features**

- unused resources
- http/2, https
- lot of elements
- big image
---
### Version / Tag 2
`docker run -it --rm -d -p 80:80 -p 443:443 --name demo-web rdpanek/demo-web:2`

**Features**

- gzip, http2_push for some resources
---
### Version / Tag 3
`docker run -it --rm -d -p 80:80 -p 443:443 --name demo-web rdpanek/demo-web:3`

**Features**

- lot of small icons added, big image = wallpaper added
