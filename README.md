# 🤖 s3admin

Browse your buckets and check usage without the need to log into AWS Console

### Features

- Standalone
- Secure - your credentials are not stored
- One click deploy to Heroku or deploy anywhere with Docker
- Browse your Buckets and Objects
- Set a custom Delimiter
- Search by Prefix
- Analyze Bucket size & Object count
- See list of largest and smallest files

### Requirements

Programmatic usage credentials from AWS IAM with the proper ACL settings to access your S3 buckets

### Demo

<a href="https://s3admin-demo.herokuapp.com/" target="_blank">-> Demo <-</a>

### Deploy

Heroku

<a href="https://www.heroku.com/deploy/?template=https://github.com/omaksi/s3admin"><img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku"></a>

Docker

    docker run -p 8000:3000 omaksi/s3admin

### Development

Node.js and yarn required

    yarn
    yarn run dev

### TODO

- Bucket Settings

### Contributing

Please open an issue :)

### License

MIT
