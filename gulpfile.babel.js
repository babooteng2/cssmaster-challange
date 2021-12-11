import gulp from "gulp";
import minify from "gulp-csso";
import del from "del";
import autoPrefixer from "gulp-autoprefixer";

const sass = require("gulp-sass")(require("node-sass"));
const routes = {
  css: {
    watch: "src/scss/*",
    src: "src/scss/styles.scss",
    dest: "dist/css",
  },
};
const styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoPrefixer({
        flexbox: true,
        grid: "autoplace",
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.css.dest));
const clean = () => del(["dist/"]);

/* const watch = () => gulp.watch(routes.css.watch, { usePolling: true }, styles); */
const watch = () => gulp.watch(routes.css.watch, styles);

const prepare = gulp.series([clean]);
const assets = gulp.series([styles]);
const live = gulp.parallel([watch]);

export const dev = gulp.series([prepare, assets, live]);
