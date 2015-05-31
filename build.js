var collections  = require('metalsmith-collections'),
    Handlebars   = require('handlebars'),
    markdown     = require('metalsmith-markdown'),
    metalsmith   = require('metalsmith'),
    moment       = require('moment'),
    paths        = require('metalsmith-paths'),
    permalinks   = require('metalsmith-permalinks'),
    templates    = require('metalsmith-templates');


metalsmith(__dirname)
  .use(paths())
  .use(collections({
    posts: {
      pattern: 'blog/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown({
    smartypants: true
  }))
  .use(function(files, metalsmith, done){
    Handlebars.registerHelper('formatDate', function(date) {
      return moment(date).format('MMM D, YYYY');
    });
    done();
  })
  .use(templates('handlebars'))
  .use(permalinks({
    relative: false,
    pattern: 'blog/:name'
  }))
  .build(function(err){
    if(err) throw err;
  });
