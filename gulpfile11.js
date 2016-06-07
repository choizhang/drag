var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

// 静态服务器
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: [
                "./src",
                './'
            ]
        }
    });

    gulp.watch("dist/css/*.css").on('change', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
});

//  编译sass 遇到错误 及时将 错误信息返回
gulp.task('sass', function () {
    return gulp.src('src/css/*.scss')
        //.pipe(sass().on('error', sass.logError))

        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
});

// 监听源文件改动   并执行相应的任务
gulp.task('auto', function () {
    gulp.watch('src/css/*.scss', ['sass']);
})

gulp.task('default', ['browser-sync', 'auto'])