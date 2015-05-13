var metalsmith = require('metalsmith'),
    collections = require('metalsmith-collections'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates');

metalsmith(__dirname)
  .use(collections({
    blogPosts: {
      pattern: '*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown({
    smartypants: true
  }))
  .use(templates('handlebars'))
  .build(function(err){
    if(err) throw err;
  });
