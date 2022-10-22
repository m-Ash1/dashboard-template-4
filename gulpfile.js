var gulp = require("gulp");
const prefix = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const connect = require("gulp-connect");
const webp = require("gulp-webp");

// Compile SCSS into CSS
gulp.task("sass", function () {
  return gulp
    .src(["src/css/main.scss"])
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});

// copy html files
gulp.task("html", function () {
  return gulp.src("src/*.html").pipe(gulp.dest("dist")).pipe(connect.reload());
});

// connect server
gulp.task("connect", function () {
  connect.server({
    root: "./dist/",
    livereload: true,
  });
});

// watch tasks
gulp.task("watch", function () {
  gulp.watch("src/css/**/*.scss", gulp.series("sass"));
  gulp.watch("src/*.html", gulp.series("html"));
});

gulp.task("default", gulp.parallel("connect", "watch"));
