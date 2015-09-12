const _            = require('lodash');
const collections  = require('metalsmith-collections');
const connect      = require('gulp-connect');
const cssmixins    = require('postcss-mixins')();
const cssnested    = require('postcss-nested')();
const cssnext      = require('cssnext')();
const del          = require('del');
const frontmatter  = require('gulp-front-matter');
const gulp         = require('gulp');
const gulpsmith    = require('gulpsmith');
const layouts      = require('metalsmith-layouts');
const markdown     = require('metalsmith-markdown');
const metalsmith   = require('metalsmith');
const moment       = require('moment');
const paths        = require('metalsmith-paths');
const permalinks   = require('metalsmith-permalinks');
const postcss      = require('gulp-postcss');
const swig         = require('swig');
const templates    = require('metalsmith-templates');


gulp.task('del', () => {
  del('./build');
});

gulp.task('connect', () => {
  connect.server({
    root: './build',
    livereload: true
  });
});

gulp.task('connect', () => {
  connect.server({
    root: './build',
    livereload: true
  });
});

gulp.task('html', () => {

  gulp.src('./src/html/content/**/*.{html,md}')
    .pipe(frontmatter())
    .on('data', (file) => {
      _.assign(file, file.frontMatter);
      delete file.frontMatter;
    })
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
          directory: 'src/html/layouts'
        }))
        .use(permalinks({
          relative: false,
          pattern: 'blog/:name'
        }))
    )
    .pipe(gulp.dest('./build/html'))
    .pipe(connect.reload());
});

gulp.task('css', () => {
  gulp.src('./src/css/styles.css')
    .pipe(postcss([cssnext, cssnested, cssmixins]))
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/html/**', ['html']);
});

gulp.task('dev', ['connect', 'html', 'css', 'watch']);
