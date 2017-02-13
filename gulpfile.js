var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    print = require('gulp-print');

gulp.task('default', function(){
    gulp.src('src/app.js')
        .pipe(uglify())
        .pipe(print())
        .pipe(gulp.dest('dist/all.js'));
})