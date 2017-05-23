'use strict';

let gulp = require('gulp');
let nodemon = require('gulp-nodemon');

gulp.task('serve', function () {
    return nodemon({
        script: 'api',
        ext: 'js',
    }).on('start', function () {
        console.log('**starting**');
    }).on('restart', function () {
        console.log('**restarting**');
    })
});

gulp.task('default', function () {
    gulp.start('serve');
});