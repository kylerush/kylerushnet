var collections  = require('metalsmith-collections'),
    connect      = require('gulp-connect'),
    cssimport    = require('postcss-import'),
    del          = require('del'),
    gulp         = require('gulp'),
    layouts      = require('metalsmith-layouts'),
    markdown     = require('metalsmith-markdown'),
    metalsmith   = require('metalsmith'),
    moment       = require('moment'),
    paths        = require('metalsmith-paths'),
    permalinks   = require('metalsmith-permalinks'),
    postcss      = require('gulp-postcss'),
    swig         = require('swig'),
    templates    = require('metalsmith-templates');

//kick off a build
buildHTML();
del.sync('./build/css');
buildCSS();

connect.server({
  root: './build',
  livereload: true
});

gulp.watch(['./src/css/**/*.css'], [buildCSS]);

function buildCSS(){
  gulp.src('./src/css/styles.css')
    .pipe(postcss([cssimport]))
    .pipe(gulp.dest('./build/css'));
}

function buildHTML(){
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
    .destination('../../../build/html')
    .build(function(err){
      if(err) throw err;
    });
}
