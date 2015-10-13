
var parsers = require('../../lib/parsers');
var contexts = require('../../lib/contexts');
var util = require('util');

// http://stackoverflow.com/questions/19182057/node-js-repl-funny-behavior-with-custom-eval-function
var buffer = '';

process.stdin.on('data', function(chunk) {
  buffer += chunk.toString('utf8');
});

var ctx = contexts.context();

util.inspect = function (obj) { return obj.toString(); }

require('repl').start({
    input: process.stdin,
    output: process.stdout,
    eval: function (cmd, context, filename, cb) {
        console.log(buffer);
        var parser = parsers.parser(buffer);
        buffer = '';
        cb(null, parser.parseExpression().evaluate(ctx).toString());
    }
});