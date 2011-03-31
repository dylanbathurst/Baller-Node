var http = require('http'),
    url = require('url');

exports.proxy = function (callMeta, callback) {
  var self = this;

  //console.log(url.parse(callMeta.path.replace(/\/zappos-api\//, '/')));

  var options = {
    host: callMeta.host,
    port: callMeta.port,
    path: callMeta.path,
    method: callMeta.method
  };

  var request = http.request(options, function(response) {
    var buffer = '';
    response.on('data', function (chunk) {
      buffer += chunk;
    })
    .on('end', function () {
      callback(buffer);
    });
  });

  request.end();
};

