var Metalsmith = require('metalsmith');
var templates = require('metalsmith-templates');
var markdown = require('metalsmith-markdown');

var metalsmith = Metalsmith(__dirname)
  .use(markdown({
    smartypants: true
  }))
  .use(templates('handlebars'))
  .build(function(err){
    if(err) throw err;
  });
