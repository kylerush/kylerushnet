var collections  = require('metalsmith-collections'),
    gulp         = require('gulp'),
    swig         = require('swig'),
    layouts      = require('metalsmith-layouts'),
    markdown     = require('metalsmith-markdown'),
    metalsmith   = require('metalsmith'),
    moment       = require('moment'),
    paths        = require('metalsmith-paths'),
    permalinks   = require('metalsmith-permalinks'),
    templates    = require('metalsmith-templates');

metalsmith('./src/html/content')
  .use(paths())
  .use(collections({
    posts: {
      pattern: 'blog/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(layouts({
    engine: 'swig',
    directory: '../layouts'
  }))
  .use(permalinks({
    relative: false,
    pattern: 'blog/:name'
  }))
  .destination('../../../build')
  .build(function(err){
    if(err) throw err;
  });

gulp.task('css', function(){
  var cssimport    = require('postcss-import'),
      postcss   = require('gulp-postcss');

  return gulp.src('./src/css/styles.css')
        .pipe(postcss([cssimport]))
        .pipe(gulp.dest('./build'));
});
