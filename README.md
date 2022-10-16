# Battle Page
is training application for performance and web performance testing

## How to open

- open browser with `localhost` => http
- open browser with `https://localhost` => https, http/2

### Version / Tag 1
`docker run -it --rm -d -p 80:80 -p 443:443 --name battle quay.io/canarytrace/battle-page:1.2`

**Features**

- unused resources
- http/2, https
- lot of elements
- big image
- gzip, http2_push for some resources
- lot of small icons added, big image = wallpaper added
- 2s wait loading


# v2
## Development

`npm run start`

## For use
`docker run --name battle -it --rm -p 80:80 -p 443:443 -p 3000:3000 quay.io/canarytrace/battle-page:1.5`
