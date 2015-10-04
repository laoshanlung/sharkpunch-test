var gulp = require('gulp')
    , nodemon = require('gulp-nodemon')
    , eslint = require('gulp-eslint')
    , path = require('path')
    , watch = require('gulp-watch')
    , browserify = require('browserify')
    , reactify = require('reactify')
    , source = require('vinyl-source-stream')
    , buffer = require('vinyl-buffer')
    , gutil = require('gulp-util');

gulp.task('nodemon', function() {
  nodemon({
    script: 'server/server.js',
    ignore: ['client/**/*.js', 'public/**/*.*'],
    ext: 'js html',
    env: {
        'NODE_ENV': 'development'
    }
  });
});

function transform() {
    var b = browserify({
        entries: './client/client.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [reactify]
    });

    return b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./public/'));
}


gulp.task('transform', function () {
    transform();
    watch('client/**/*.js', function() {
        return transform();
    });
});

gulp.task('lint', function() {
    var paths = [
        'server/**/*.js'
    ]
    return gulp.src(paths)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('dev', ['lint', 'nodemon']);
gulp.task('default', ['dev', 'transform']);