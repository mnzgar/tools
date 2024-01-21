import gulp from 'gulp';
import concatCSS from 'gulp-concat-css';
import minifyCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';

import dartSass from 'sass'
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

// Compilar Sass a CSS
gulp.task('compile-sass', () => {
  return gulp.src('src/css/*.scss', { sourcemaps: true })
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

// Concatenar los dos ficheros CSS
gulp.task('concat-css', () => {
  return gulp.src('src/css/*.css')
      .pipe(concatCSS('super.css'))
      .pipe(gulp.dest('dist'));
});

// Minificar CSS
gulp.task('minify-css', () => {
  return gulp.src('dist/super.css')
      .pipe(minifyCSS())
      .pipe(gulp.dest('dist'));
});

// Sourcesmaps del CSS
gulp.task('sourcemaps', () => {
  return gulp.src('dist/super.css')
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
});

// Minificar imágenes
gulp.task('minify-images', () => {
  return gulp.src('src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'));
});

// Minificar JavaScript
gulp.task('minify-js', () => {
  return gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
});

// Mover el HTML
gulp.task('move-html', () => {
  return gulp.src('src/html/**/*.html')
      .pipe(gulp.dest('dist'));
});

// BrowserSync
gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('src/html/**/*.html', gulp.series('move-html')).on('change', browserSync.reload);
  gulp.watch('src/css/*.scss', gulp.series('compile-sass')).on('change', browserSync.reload);
  gulp.watch('src/css/*.css', gulp.series('concat-css', 'minify-css', 'sourcemaps')).on('change', browserSync.reload);
  gulp.watch('src/js/*.js', gulp.series('minify-js')).on('change', browserSync.reload);
  gulp.watch('src/images/*', gulp.series('minify-images')).on('change', browserSync.reload);
});

gulp.task('default', 
    gulp.series('compile-sass', 'concat-css', 'minify-css', 'sourcemaps', 'minify-images', 'minify-js', 'move-html', 'browser-sync'));
