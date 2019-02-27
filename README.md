# 🤖 s3admin

Browse your buckets and check usage without the need to log into AWS Console

## Features

- **Browse** your Buckets and Objects
  <!-- - Set a custom **Delimiter** -->
- **Search** by Prefix
- **Analyze** Bucket size & Object count
- **List** largest and smallest files
- **Secure** - your credentials are not stored
- **Standalone** - node.js app
- **One click deploy** to Heroku
- **Deploy anywhere** with Docker

## Screenshots

<p align="center">
<a href="https://raw.githubusercontent.com/omaksi/s3admin/master/screenshot2.png" target="_blank">
  <img src="./screenshot2.png" alt="Size Limit example"
       width="200" >
       </a>
<a href="https://raw.githubusercontent.com/omaksi/s3admin/master/screenshot.png" target="_blank">
  <img src="./screenshot.png" alt="Size Limit example"
       width="200" >
       </a>
<a href="https://raw.githubusercontent.com/omaksi/s3admin/master/screenshot3.png" target="_blank">
  <img src="./screenshot3.png" alt="Size Limit example"
       width="200" >
       </a>
</p>

## Requirements

Programmatic usage credentials from AWS IAM with the proper ACL settings to access your S3 buckets (Access Key ID, Secret Access Key)

## Demo

<a href="https://s3admin-demo.herokuapp.com/" target="_blank">-> Demo <-</a>

## Deploy

#### Heroku

<a href="https://www.heroku.com/deploy/?template=https://github.com/omaksi/s3admin"><img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku"></a>

#### Docker

    docker run -p 8000:3000 omaksi/s3admin

## Development

Node.js and yarn required

    yarn
    yarn run dev

## TODO

- Bucket Settings

## Contributing

Please open an issue :)

## License

MIT
