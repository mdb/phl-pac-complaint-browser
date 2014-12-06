# phl-pac-complaint-browser

A Polymer-based `<phl-pac-complaint-browser />` custom element mapping 2009-2012 Philadelphia Police Advisory Commission complaints filed by citizens against Philadelphia Police officers.

# Local dev

Install Node.js dependencies:

```
npm install
```

Install bower dependencies:

```
bower install
```

Run local server:

```
gulp connect
```

View the demo in your web browser at `http://localhost:8080/demo.html`

# Building

`phl-pac-complaint-browser` uses vulcanize to concatenate and compress source files
to a single `build/index.html` document.

```
gulp build
```

# Deploying

`phl-pac-complaint-browser`'s demo compiles to a single `index.html` document
that can be deployed to any web server.

`phl-pac-complaint-browser` offers out-of-the-box command line S3 deployment.

Add an `aws.json` file citing your AWS info:

```
{
  "key": "your key",
  "secret": "your secret",
  "bucket": "your S3 bucket",
  "region": "us-east-1"
}
```

To deploy a build:

```
gulp deploy
```
