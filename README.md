# node-mongo-rest-api

A node rest api server build with `polka, mongodb`

### Initial setup

1. Create .env file in root directory with following env variables

```
    PORT=
    CLUSTER_MODE= bool
    TZ=UTC or any timezone

    MONGODB_URL=
    DB_NAME=
    DB_USER=
    DB_PASS=

    ACCESS_TOKEN_SECRET=
    REFRESH_TOKEN_SECRET=

    SALT=
```

### Notes

by default `g-zip compression` is enabled, to disable compression do following on each request

```header
header["x-no-compression"] = true
```

### Docs

- [polka](https://github.com/lukeed/polka)
- [polka-send-type](https://www.npmjs.com/package/@polka/send-type)
- [cors-origin](https://github.com/expressjs/cors#readme)
- [mongoose](https://mongoosejs.com/docs/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [pino-logger](https://github.com/pinojs/pino)
- [http-errors](https://github.com/jshttp/http-errors)
- [donenv](https://github.com/motdotla/dotenv)
- [compression](https://github.com/expressjs/compression)
- [file-upload](https://nodejspedia.com/en/tutorial/4080/file-upload)

### Courtesy

- [video](https://www.youtube.com/playlist?list=PLdHg5T0SNpN3EoN3PEyCmPR42Ok_44OFT)
