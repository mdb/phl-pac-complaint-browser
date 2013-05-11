# Philadelphia Police Advisory Complaints Browser

A map of the 2009 - 2012 complaints logged by the Philadelphia Police Advisory Commission.

phl-pac-complaint-browser is built on AxisPhilly's [app-template](http://github.com/axisphilly/app-template) and was hacked together in a few hours as an entry in Philadelphia's 2013 Barcamp News Innovation. [Casey Thomas](http://github.com/caseypt) helped troubleshoot JavaScript errors. Somehow, the project received first place.

## About the data

phl-pac-complaint-browser is powered by a <a href="https://docs.google.com/spreadsheet/ccc?key=0Aii0ITjxvJ6fdFlPNHVINHY2dVhfODNsY2JWU0U0NHc#gid=0">Google spreadsheet</a> import of the [Philadelphia PAC Complaints CSV](http://www.opendataphilly.org/opendata/resource/218/philadelphia-police-advisory-commission-complaints/) published by OpenData Philly.

Note that the data only includes the 2009 - 2012 complaints reported by the Philadelphia Police Advisory Commission and not those filed with Philadelphia Police Internal Affairs.

## About the application

- `css` - compiled .scss files for development
- `js` - development versions of JS files
- `js\lib` - vendor/library JS files, i.e. underscore.js, backbone.js, etc.
- `sass` - .scss files
- `views` - EJS templates
- `www`, `www\css`, `www\js` - The compiled app and associated assets

## Install Dependencies

Node.js and [Grunt](http://www.gruntjs.com) handle asset management, static view compiling, and build-time responsibilities.

On OS X, Node.js can be installed with Homebrew: `$ brew install node`

Alternatively, install packages can be downloaded from the Node [website](http://nodejs.org/download/).

Install the [Grunt](https://github.com/gruntjs/grunt-cli) command line tool globally with its command line interface: `$ npm install -g grunt-cli`

Install project dependencies (in the project folder): `$ npm install`

## Development/Working locally

In local development, [Express](http://expressjs.com/) serves files, compiles SASS and renders views. 

To run the server: `$ node server.js`

Visit [http://0.0.0.0:3000](http://0.0.0.0:3000) in your web browser.

## Building the project

`grunt build` compiles the code in production mode. It lints, concatenates, and minifies JS files, bakes out EJS templates into HTML and compiles SASS to CSS.

    $ grunt build

The grunt commands can also be run independently:

- Lint JS files: `$ grunt jshint`
- Concatenate and minify JS files: `$ grunt uglify`
- Compile SASS to CSS: `$ grunt sass`
- Bake-out template files: `$ grunt shell`

## Deployment

Deployment to Amazon S3 is handled by grunt. Before deployment, do the following:

- The value of the `name` key in `package.json` will be used as the S3 folder name. Make sure it's URL-compliant.
- **Do not add the AWS credentials to the Gruntfile**. Grunt expects environmental variables stored as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. These can be stored in an `.env` file loaded into your environment.
- Make sure all `src` and `dest` values in the s3 grunt task `upload` key are valid. They should match the folder structure of `www`.

Deploy the app:

    $ grunt deploy
