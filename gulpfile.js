var gulp = require("gulp");
var ts = require("gulp-typescript");
var connect = require("gulp-connect");

gulp.task("build", function() {
  return gulp
    .src("src/**/*.ts")
    .pipe(
      ts({
        noImplicitAny: true,
        outFile: "redirect.js"
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
});

gulp.task("watch", function() {
  gulp.watch(["src/*.ts"], gulp.parallel("build"));
});

gulp.task("connect", function() {
  connect.server({
    root: "./dist",
    livereload: true
  });
});

gulp.task("default", gulp.parallel("build"));
gulp.task("start", gulp.parallel("build", "connect", "watch"));
