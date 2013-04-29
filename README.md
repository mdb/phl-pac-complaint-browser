# Philadelphia Police Advisory Complaints Browser

A map of the 2009 - 2012 complaints logged by the Philadelphia Police Advisory Commission.

pac-complaint-browser is built on AxisPhilly's [app-template](http://github.com/axisphilly/app-template) and was hacked together in a few hours as an entry in Philadelphia's 2013 Barcamp News Innovation. [Casey Thomas](http://github.com/caseypt) helped troubleshoot JavaScript errors. Somehow, the project received first place.

## About the data

pac-complaint-browser is powered by a Google spreadsheet import of the [Philadelphia PAC Complaints CSV](http://www.opendataphilly.org/opendata/resource/218/philadelphia-police-advisory-commission-complaints/) published by OpenData Philly.

Note that the data only includes the 2009 - 2012 complaints reported by the Philadelphia Police Advisory Commission, and not those filed with Philadelphia Police Internal Affairs.

## About the application

- `css` - compiled .scss files for development
- `js` - development versions of JS files
- `js\lib` - vendor/library JS files, i.e. underscore.js, backbone.js, etc.
- `sass` - .scss files
- `views` - EJS templates
- `www`, `www\css`, `www\js` - The compiled app and associated assets

## Install Dependencies

Node.js and [Grunt](http://www.gruntjs.com) handle asset management, static view compiling, and build-time responsibilities.

On OS X, you can use Homebrew to install Node: `$ brew install node`

There is also an install package for OS X and other systems available on the Node [website](http://nodejs.org/download/).

Install the [Grunt](https://github.com/gruntjs/grunt-cli) command line tool globally, with the command line interface: `$ npm install -g grunt-cli`

Install project dependencies (in the project folder): `$ npm install`

## Development/Working locally

In local development, [Express](http://expressjs.com/) serves files, compiles SASS, and renders views. 

To run the server: `$ node server.js`

Visit [http://0.0.0.0:3000](http://0.0.0.0:3000) in your web browser.

## Add a new page

Adding a new page to the app is as simple as adding a route to the Express server and assigning it a view.

- Add a new route to Express. At the very least, you have to pass the environment variable to the view, in order to reference development/production resources respectively. For example:

        app.get('/route-name', function(req, res){
          res.render('view-name', {
            env: app.settings.env
          });
        });

- Then, create a new view in the `view` folder. The view name is the first parameter of the `res.render` method. The view can just be an `html` file, or it can use EJS templating to be more dynamic. Just make sure you pass the EJS variables to the route; which is the second parameter of the `res.render` method.

## Building a project

`grunt build` compiles your project in production mode. It will lint, concatenate, and minify JS files, bake-out the EJS templates into HTML, and compile SASS to CSS.

    $ grunt build

The grunt commands can also be run independently:

- Lint JS files: `$ grunt jshint`
- Concatenate and minify JS files: `$ grunt uglify`
- Compile SASS to CSS: `$ grunt sass`
- Bake-out template files: `$ grunt shell`

## Deployment

Deployment to S3 is handled by grunt. Before deployment, do the following:

- The value of the `name` key in `package.json` will be used as the S3 folder name, so make sure it's URL compliant.
- **Do not add the AWS credentials to the Gruntfile**. Grunt expects environmental variables stored as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. Our convention is to store them in a file called `.env`, which you can then `source` to load into your environment.
- Check all the of `src` and `dest` values in the s3 grunt task `upload` key to make sure they are valid. The defaults are `www/*`, `www/js/*`, `www/css/*`, and `www/data/*`. Basically, they should match the folder structure of `www`.

Once you checked all of the above, you can deploy the app by running:

    $ grunt deploy
