var gulp = require('gulp');
var sftp = require('gulp-sftp');
// var sass = require('gulp-sass');

gulp.task('sftp-test', function () {
    return gulp.src('./dist/**/*')
        .pipe(sftp({
            host: '172.20.41.45',
            port:'22',
            auth: 'keyMain',
            remotePath: '/home/apache-tomcat-7.0.57/webapps/dist/'
        }));
});
gulp.task('sftp-release', function () {
    return gulp.src('./dist/**/*')
        .pipe(sftp({
            host: '172.28.34.38',
            port:'22',
            auth: 'keyMain',
            remotePath: '/home/apache-tomcat-7.0.57/webapps/dist/'
        }));
});

/*gulp.task('sass', function() {
    gulp.src('./src/components/scss/leftMenu.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/components/css/'))
});*/

gulp.task('test', ['sftp-test']);
gulp.task('release', ['sftp-release']);
