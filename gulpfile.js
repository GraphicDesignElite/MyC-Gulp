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
gulp.task('jshint', function() {
    gulp.src('../js/master.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('scss-lint', function() {
  gulp.src('scss/**/*.scss')
    .pipe(cache('scsslint'))
    .pipe(scsslint());
});

//css rename for cache bust
gulp.task("revision:renameCss", ["css"], function(){
  return gulp.src(["../css/global.css"])
  .pipe(rev())
  .pipe(gulp.dest('../cdn/css'))
  .pipe(rev.manifest({ path: "manifest.json" }))
  .pipe(revdel({ dest: '../cdn/css', force: true }))
  .pipe(gulp.dest('../cdn/css'))
});

gulp.task("revision:updateReferencesCss", ["css","revision:renameCss"], function(){
   return gulp.src(["../cdn/css/manifest.json","../templates/common/header_includes.jsp"])
   .pipe(collect({ replaceReved: true }))
   .pipe(gulp.dest("../templates/common/"))
});

//js rename for cache bust
gulp.task("revision:renameJs", ["js"], function(){
    return gulp.src(["../js/master.js"])
    .pipe(rev())
    .pipe(gulp.dest('../cdn/js'))
    .pipe(rev.manifest({ path: "manifest.json" }))
    .pipe(revdel({ dest: '../cdn/js', force: true }))
    .pipe(gulp.dest('../cdn/js'))
  });
  
gulp.task("revision:updateReferencesJs", ["js","revision:renameJs"], function(){
     return gulp.src(["../cdn/js/manifest.json","../templates/common/footer_includes.jsp"])
     .pipe(collect({ replaceReved: true }))
     .pipe(gulp.dest("../templates/common/"))
  });




gulp.task('watch', function() {
  gulp.watch('../css/global-edit.css', ['css', 'revision:renameCss', 'revision:updateReferencesCss']);
  gulp.watch('../js/master-edit.js', ['jshint', 'js', 'revision:renameJs', 'revision:updateReferencesJs']);

});

gulp.task('default', ['css', 'revision:renameCss', 'revision:updateReferencesCss', 'js', 'revision:renameJs', 'revision:updateReferencesJs', 'watch']);