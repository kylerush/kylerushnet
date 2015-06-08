var collections  = require('metalsmith-collections'),
    connect      = require('gulp-connect'),
    cssmixins    = require('postcss-mixins')(),
    cssnested    = require('postcss-nested')(),
    cssnext      = require('cssnext')(),
    del          = require('del'),
    gulp         = require('gulp'),
    gulpsmith    = require('gulpsmith'),
    layouts      = require('metalsmith-layouts'),
    markdown     = require('metalsmith-markdown'),
    metalsmith   = require('metalsmith'),
    moment       = require('moment'),
    paths        = require('metalsmith-paths'),
    permalinks   = require('metalsmith-permalinks'),
    postcss      = require('gulp-postcss'),
    swig         = require('swig'),
    templates    = require('metalsmith-templates');


gulp.task('del', function(){
  del('./build');
});

gulp.task('connect', function(){
  connect.server({
    root: './build',
    livereload: true
  });
});

gulp.task('html', function(){

  gulp.src('./src/html/content/**/*.{html,md}')
    .pipe(
      gulpsmith()
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
    )
    .pipe(gulp.dest('./build/html'))
    .pipe(connect.reload());
});

gulp.task('css', function(){
  gulp.src('./src/css/styles.css')
    .pipe(postcss([cssnext, cssnested, cssmixins]))
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/html/**', ['html']);
});

gulp.task('dev', ['connect', 'html', 'css', 'watch']);
