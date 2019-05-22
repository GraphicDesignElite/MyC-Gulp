var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    cssmin      = require('gulp-minify-css'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    scsslint    = require('gulp-sass-lint'),
    cache       = require('gulp-cached'),
    prefix      = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    size        = require('gulp-size'),
    plumber     = require('gulp-plumber'),
    deploy      = require('gulp-gh-pages'),
    notify      = require('gulp-notify'),
    rev         = require('gulp-rev'),
    revdel      = require('rev-del'),
    collect     = require('gulp-rev-collector');

// Unused until sass is implemented
gulp.task('scss', function() {
    var onError = function(err) {
      notify.onError({
          title:    "Gulp",
          subtitle: "Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
      })(err);
      this.emit('end');
  };

  return gulp.src('scss/main.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(prefix())
    .pipe(rename('global-edit.css'))
    .pipe(gulp.dest('../css'))
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename('global.css'))
    .pipe(gulp.dest('../css'))
});

gulp.task('css', function() {
    var onError = function(err) {
      notify.onError({
          title:    "Gulp",
          subtitle: "CSS Compilation Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
      })(err);
      this.emit('end');
  };
  return gulp.src('../css/global-edit.css')
    .pipe(plumber({errorHandler: onError}))
    .pipe(prefix())
    .pipe(rename('global.css'))
    .pipe(gulp.dest('../css'))
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest('../css'))

});

gulp.task('js', function() {
  return gulp.src('../js/master-edit.js')
    .pipe(uglify())
    .pipe(concat('master.js'))
    .pipe(gulp.dest('../js'))
});

gulp.task('scss-lint', function() {
  gulp.src('scss/**/*.scss')
    .pipe(cache('scsslint'))
    .pipe(scsslint());
});


gulp.task("revision:rename", ["css"], function(){
  return gulp.src(["../css/global.css"])
  .pipe(rev())
  .pipe(gulp.dest('../css'))
  .pipe(rev.manifest({ path: "manifest.json" }))
  .pipe(revdel({ dest: '../css', force: true }))
  .pipe(gulp.dest('../css'))
});

gulp.task("revision:updateReferences", ["css","revision:rename"], function(){
   return gulp.src(["../css/manifest.json","../templates/common/header_includes.jsp"])
   .pipe(collect({ replaceReved: true }))
   .pipe(gulp.dest("../templates/common/"))
});


gulp.task('jshint', function() {
  gulp.src('../js/master.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('../css/global-edit.css', ['css', 'revision:rename', 'revision:updateReferences']);
  gulp.watch('../js/master-edit.js', ['jshint', 'js']);

});

gulp.task('default', ['css', 'revision:rename', 'revision:updateReferences', 'js', 'watch']);