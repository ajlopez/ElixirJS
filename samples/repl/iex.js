
var elixir = require('../..');
var util = require('util');

// http://stackoverflow.com/questions/19182057/node-js-repl-funny-behavior-with-custom-eval-function
var buffer = '';

process.stdin.on('data', function(chunk) {
  buffer += chunk.toString('utf8');
});

var ctx = elixir.context();

util.inspect = function (obj) { return obj.toString(); }

require('repl').start({
    input: process.stdin,
    output: process.stdout,
    eval: function (cmd, context, filename, cb) {
        console.log(buffer);
        var result = elixir.evaluate(buffer, ctx);
        buffer = '';
        cb(null, result == null ? result : result.toString());
    }
});