const { src, dest, watch, series } = require("gulp");
const htmlMin = require("gulp-htmlmin");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default;
const notify = require("gulp-notify");

const resourcesBuild = () => {
  return src('src/assest/**')
      .pipe(dest('dist/assest'))
};

const stylesBuild = () => {
  return src(["src/css/main.min.css", "src/css/normalize.css"])
    .pipe(concat("main.min.css"))
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(dest("dist/css"));
};

const htmlMinify = () => {
  return src("src/**/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dist"));
};

const scriptsBuild = () => {
  return src(["src/js/**/*.js"])
    .pipe(concat("main.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify({ toplevel: true }).on("error", notify.onError()))
    .pipe(dest("dist/js"));
};

watch("src/**/*.html", htmlMinify);
watch("src/css/main.min.css", stylesBuild);
watch("src/js/**/*.js", scriptsBuild);
watch("src/assest/**", resourcesBuild);

exports.stylesBuild = stylesBuild;
exports.scriptsBuild = scriptsBuild;
exports.resourcesBuild = resourcesBuild;

exports.default = series(resourcesBuild, htmlMinify, stylesBuild, scriptsBuild);
