var connect = require('connect'),
    baller = require('./lib/baller-node');

function setupUrls(app) {

  app.get('/zappos-api/*?', function (req, res, next) {

    var options = {
      host: 'api.zappos.com',
      port: 80,
      path: req.url.replace('/zappos-api', ''),
      method: 'GET'
    };
  
    baller.proxy(options, function(chunk) {

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(chunk);

    });

  });

  app.get('/twitter-api/*?', function (req, res, next) {

    var options = {
      host: 'www.twitter.com',
      port: 80,
      path: req.url.replace('/twitter-api', ''),
      method: 'GET'
    };
  
    baller.proxy(options, function(chunk) {

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(chunk);

    });

  });

}

connect.createServer(
  connect.router(setupUrls)
).listen(8080);

