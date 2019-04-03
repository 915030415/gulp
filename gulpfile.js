var gulp = require("gulp");
//压缩html html-htmlclean --save-dev
//压缩图片 gulp-imagemin
//压缩js  gulp-uglify 
// 压缩css gulp-clean-css
// 去掉js中的调试语句 gulp-strip-debug 去掉debugger 和console.log（）
// 将less转化成css gulp-less
// 自动添加css3 前缀  两个插件 gulp-postcss autoprefixer  运用 postcss插件的时候 以参数的形式传autoprefixer
// 开启器本地服务器代理  gulp-connect
// gulp插件的应用  下载插件 ---》取到插件 ————>应用插件
var htmlClean = require("gulp-htmlclean");
var imageMin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var debug = require("gulp-strip-debug");
var less = require("gulp-less");
var cleanCss = require("gulp-clean-css");
var postCss = require('gulp-postcss');
var autoprefixer = require("autoprefixer");
var connect = require("gulp-connect");
var folder = {
    src:"src/",
    dist:"dist/"
}
var devMod = process.env.NODE_ENV == 'development';//判断是不是开发环境  'production'
// var devMod = process.env.NODE_ENV == 'production'
// console.log(devMod);
// 语句 export NODE_ENV=development;设置环境
gulp.task("html",function(){//创建html任务
    // console.log(23432)
    //取到html文件中下的所有文件
    var page = gulp.src(folder.src + "html/*")
    .pipe(connect.reload())//当有变化就刷新
    if(!devMod){//为生产环境的时候就压缩
        page.pipe(htmlClean())//在文件流中压缩文件
    }
    page.pipe(gulp.dest(folder.dist + "html/"))//把文件放进管道中 再dest输出到dist文件夹下的html下 没有则自动生成html
})
gulp.task("image",function(){
    gulp.src(folder.src + 'image/*')
         .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "image/"))
})
gulp.task('css',function(){
   var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]));
        if(!devMod){//为生产环境的时候就压缩
            page.pipe(cleanCss())//在文件流中压缩文件
        }
        page.pipe(gulp.dest(folder.dist + "css/"))
})
gulp.task("js",function(){
   var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
        if(!devMod){//为生产环境的时候就压缩
            page .pipe(debug())
            .pipe(uglify())//在文件流中压缩文件
        }
       page.pipe(gulp.dest(folder.dist + "js/"))
})
gulp.task('server',function(){
    //开启服务
    connect.server({
        port:"8888",//更改默认端口
        livereload:true,//开启自动刷新
    })
});
gulp.task('watch',function(){//监听文件变化
    gulp.watch(folder.src + "html/*",["html"])//监听 src下的HTML文件 只要一改变就触发html任务
     gulp.watch(folder.src + 'js/*',["js"]);
     gulp.watch(folder.src + 'css/*',["css"]);
})
gulp.task("default",["html","css","js","image","server","watch"]);//先找到default默认任务再找到html任务
//task任务给他取名叫default 执行gulp 找到配置文件 默认执行default 任务 在执行回调函数
// gulp.task("default",function(){
//     console.log(23423)
// })

// 流操作原理
// 文件读出来后为一个二进制的数
// 读取less文件之后 对当前文件流 操作 最终 将文件输出 一步输入 一步输出 
// 而不是 less文件  处理完后添加css3前缀 变成一个文件 再压缩 再变成一个文件 
//less -->自动添加css3前缀---》压缩---》压缩的css文件


// api
// gulp.pipe()把文件流放入管道
// gulp.src();输入
// gulp.dest();输出
// gulp.task();创建任务
// gulp.watch();监听文件是否改变
// connect.server()


// gulp 面向于开发流程 特点流操作 runner Task
// webpack 将一切都看做模块  module bundle 模块打包器

