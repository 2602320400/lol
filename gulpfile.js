const gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    htmlmin = require("gulp-htmlmin"),
    cleancss = require("gulp-clean-css"),
    babel = require("gulp-babel"),
    connect = require("gulp-connect"),
    sass = require("gulp-sass");

//制定任务

//把src里面的html文件取出来，做一些压缩的工作，放进dist里面
gulp.task("html", () => {
    //html文件取出后存放到一个管道中
    gulp.src("src/**/*.html")
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
            }
        )).pipe(gulp.dest("dist"))
        .pipe(connect.reload())
})
gulp.task('js', () => {
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
})
gulp.task("css", () => {
    gulp.src("src/css/**/*.scss")
        .pipe(sass())
        .pipe(cleancss())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload())
})
gulp.task("libs", () => {
    gulp.src("src/libs/**/*").pipe(gulp.dest("dist/libs"))
})
gulp.task("img", () => {
    gulp.src("src/img/**/*").pipe(gulp.dest("dist/img"))
})
// 开启一个服务器
// 配置项：livereload支持热更新，port端口号，root项目根目录
gulp.task('server', function() {
    connect.server({
        livereload: true,
        port: 1997,
        root: 'dist'
    })
})
gulp.task("watch", () => {
    //src下面任意html文件发生修改都要重启html任务
    gulp.watch("src/**/*.html",['html']);
    gulp.watch("src/js/**/*.js",['js']);
    gulp.watch("src/css/**/*.scss",['css']);
})
gulp.task("default",["html","css","js","libs","img","server","watch"]);