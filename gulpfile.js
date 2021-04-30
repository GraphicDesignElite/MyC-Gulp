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
    .pipe(rename('global.css'))
    .pipe(gulp.dest('../css'))
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename('global.css'))
    .pipe(gulp.dest('../css'))
});





gulp.task('scss-lint', function() {
  gulp.src('scss/**/*.scss')
    .pipe(cache('scsslint'))
    .pipe(scsslint());
});

//Global
gulp.task('css-global', function() {
    var onError = function(err) {
      notify.onError({
          title:    "Gulp",
          subtitle: "Global CSS Compilation Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
      })(err);
      this.emit('end');
  };
  return gulp.src('../css/global.css')
    .pipe(plumber({errorHandler: onError}))
    .pipe(prefix())
   
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))
    
    .pipe(rev())
    .pipe(gulp.dest('../cdn/css'))
    .pipe(rev.manifest({ path: "manifest.json" }))
    .pipe(revdel({ dest: '../cdn/css', force: true }))
    .pipe(gulp.dest('../cdn/css'))
});

gulp.task("revision:updateReferencesCssGlobal", ["css-global"], function(){
     return gulp.src(["../cdn/css/manifest.json","../templates/common/header_includes.jsp"])
     .pipe(collect({ replaceReved: true }))
     .pipe(gulp.dest("../templates/common/"))
});




gulp.task('css-home', function() {
    var onError = function(err) {
      notify.onError({
          title:    "Gulp",
          subtitle: "Home Page CSS Compilation Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
      })(err);
      this.emit('end');
  };
  return gulp.src('../css/templates/home-page.css')
    .pipe(plumber({errorHandler: onError}))
    .pipe(prefix())
 
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))

    .pipe(rev())
    .pipe(gulp.dest('../cdn/css/templates'))
    .pipe(rev.manifest({ path: "manifest-home-page.json" }))
    .pipe(revdel({ dest: '../cdn/css/templates', force: true }))
    .pipe(gulp.dest('../cdn/css/templates'))
});
gulp.task("revision:updateReferencesCssHome", ["css-home"], function(){
    return gulp.src(["../cdn/css/templates/manifest-home-page.json","../templates/categories/home_page_template.jsp"])
    .pipe(collect({ replaceReved: true }))
    .pipe(gulp.dest("../templates/categories"))
});


//common Category
gulp.task('css-common-category', function() {
    var onError = function(err) {
      notify.onError({
          title:    "Gulp",
          subtitle: "Common Category CSS Compilation Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
      })(err);
      this.emit('end');
  };
  return gulp.src('../css/templates/common-category.css')
    .pipe(plumber({errorHandler: onError}))
    .pipe(prefix())
 
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))

    .pipe(rev())
    .pipe(gulp.dest('../cdn/css/templates'))
    .pipe(rev.manifest({ path: "manifest-common-category.json" }))
    .pipe(revdel({ dest: '../cdn/css/templates', force: true }))
    .pipe(gulp.dest('../cdn/css/templates'))
});
gulp.task("revision:updateReferencesCssCommonCategory", ["css-common-category"], function(){
    return gulp.src(["../cdn/css/templates/manifest-common-category.json","../templates/categories/category_common_template.jsp"])
    .pipe(collect({ replaceReved: true }))
    .pipe(gulp.dest("../templates/categories"))
});

//Product Page
gulp.task('css-product-page', function() {
    var onError = function(err) {
      notify.onError({
          title:    "Gulp",
          subtitle: "Product Page CSS Compilation Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
      })(err);
      this.emit('end');
  };
  return gulp.src('../css/templates/product-page.css')
    .pipe(plumber({errorHandler: onError}))
    .pipe(prefix())
 
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))

    .pipe(rev())
    .pipe(gulp.dest('../cdn/css/templates'))
    .pipe(rev.manifest({ path: "manifest-product-page.json" }))
    .pipe(revdel({ dest: '../cdn/css/templates', force: true }))
    .pipe(gulp.dest('../cdn/css/templates'))
});
gulp.task("revision:updateReferencesCssProductPage", ["css-product-page"], function(){
    return gulp.src(["../cdn/css/templates/manifest-product-page.json","../templates/categories/product-page-template.jsp"])
    .pipe(collect({ replaceReved: true }))
    .pipe(gulp.dest("../templates/categories"))
});



//Learning Center
gulp.task('css-learning-center', function() {
    var onError = function(err) {
      notify.onError({
          title:    "Gulp",
          subtitle: "Learning Center CSS Compilation Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
      })(err);
      this.emit('end');
  };
  return gulp.src('../css/templates/learning-center.css')
    .pipe(plumber({errorHandler: onError}))
    .pipe(prefix())
 
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))

    .pipe(rev())
    .pipe(gulp.dest('../cdn/css/templates'))
    .pipe(rev.manifest({ path: "manifest-learning-center.json" }))
    .pipe(revdel({ dest: '../cdn/css/templates', force: true }))
    .pipe(gulp.dest('../cdn/css/templates'))
});
gulp.task("revision:updateReferencesCssLearningCenter", ["css-learning-center"], function(){
    return gulp.src(["../cdn/css/templates/manifest-learning-center.json","../templates/categories/learning_center_template.jsp"])
    .pipe(collect({ replaceReved: true }))
    .pipe(gulp.dest("../templates/categories"))
});

//State Hubs
gulp.task('css-state-hub', function() {
    var onError = function(err) {
      notify.onError({
          title:    "Gulp",
          subtitle: "Learning Center CSS Compilation Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
      })(err);
      this.emit('end');
  };
  return gulp.src('../css/templates/state-hub.css')
    .pipe(plumber({errorHandler: onError}))
    .pipe(prefix())
 
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))

    .pipe(rev())
    .pipe(gulp.dest('../cdn/css/templates'))
    .pipe(rev.manifest({ path: "manifest-state-hub.json" }))
    .pipe(revdel({ dest: '../cdn/css/templates', force: true }))
    .pipe(gulp.dest('../cdn/css/templates'))
});
gulp.task("revision:updateReferencesCssStateHub", ["css-state-hub"], function(){
    return gulp.src(["../cdn/css/templates/manifest-state-hub.json","../templates/categories/state_hub_template.jsp", "../templates/categories/state_info_template.jsp"])
    .pipe(collect({ replaceReved: true }))
    .pipe(gulp.dest("../templates/categories"))
});

//About Us
gulp.task('css-about-us', function() {
    var onError = function(err) {
      notify.onError({
          title:    "Gulp",
          subtitle: "Learning Center CSS Compilation Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
      })(err);
      this.emit('end');
  };
  return gulp.src('../css/templates/about-us.css')
    .pipe(plumber({errorHandler: onError}))
    .pipe(prefix())
 
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))

    .pipe(rev())
    .pipe(gulp.dest('../cdn/css/templates'))
    .pipe(rev.manifest({ path: "manifest-about-us.json" }))
    .pipe(revdel({ dest: '../cdn/css/templates', force: true }))
    .pipe(gulp.dest('../cdn/css/templates'))
});
gulp.task("revision:updateReferencesCssAboutUs", ["css-about-us"], function(){
    return gulp.src(["../cdn/css/templates/manifest-about-us.json","../templates/categories/about-us-template.jsp"])
    .pipe(collect({ replaceReved: true }))
    .pipe(gulp.dest("../templates/categories"))
});



gulp.task('js', function() {
    return gulp.src('../js/master.js')
      .pipe(uglify())
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      
      .pipe(concat('master.js'))
      .pipe(rev())
    .pipe(gulp.dest('../cdn/js'))
    .pipe(rev.manifest({ path: "manifest.json" }))
    .pipe(revdel({ dest: '../cdn/js', force: true }))
    .pipe(gulp.dest('../cdn/js'))
     
  });
 
//js rename for cache bust  
gulp.task("revision:updateReferencesJs", ["js"], function(){
     return gulp.src(["../cdn/js/manifest.json","../templates/common/footer_includes.jsp"])
     .pipe(collect({ replaceReved: true }))
     .pipe(gulp.dest("../templates/common/"))
});










gulp.task('watch', function() {
  
  gulp.watch('../js/master.js', ['js', 'revision:updateReferencesJs']);
  gulp.watch('../css/global.css', ['css-global', 'revision:updateReferencesCssGlobal']);
  gulp.watch('../css/templates/home-page.css', ['css-home', 'revision:updateReferencesCssHome']);
  gulp.watch('../css/templates/common-category.css', ['css-common-category', 'revision:updateReferencesCssCommonCategory']);
  gulp.watch('../css/templates/product-page.css', ['css-product-page', 'revision:updateReferencesCssProductPage']);
  gulp.watch('../css/templates/learning-center.css', ['css-learning-center', 'revision:updateReferencesCssLearningCenter']);
  gulp.watch('../css/templates/state-hub.css', ['css-state-hub', 'revision:updateReferencesCssStateHub']);
  gulp.watch('../css/templates/about-us.css', ['css-about-us', 'revision:updateReferencesCssAboutUs']);
});

gulp.task('default', ['watch']);