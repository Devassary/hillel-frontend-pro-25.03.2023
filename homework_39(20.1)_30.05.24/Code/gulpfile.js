
const { src, dest, watch, series } = require("gulp");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const clean = require("gulp-clean");
const babel = require("gulp-babel");
const minifyHtml = require("gulp-minify-html");
const minifyCss = require("gulp-clean-css");
const ssi = require("gulp-ssi");
const browserSync = require('browser-sync').create();

const APP_FOLDER = "./app/";
const BUILD_FOLDER = "./dest/";
const SCRIPTS_FOLDER = `${APP_FOLDER}js/`;
const UTILS_FOLDER = `${SCRIPTS_FOLDER}utils/`;
const STYLES_FOLDER = `${APP_FOLDER}styles/`;

function browsSync() {
    browserSync.init({
        server: {
            baseDir: BUILD_FOLDER
        }
    });
}
async function cleanDist() {
    return clean(`${BUILD_FOLDER}**/*`, { force: true });
}

function html() {
    return src(`${APP_FOLDER}*.html`)
        .pipe(ssi())
        .pipe(minifyHtml())
        .pipe(dest(`${BUILD_FOLDER}`));
}

function scripts() {
    return src([`${UTILS_FOLDER}*.js`, `${SCRIPTS_FOLDER}*.js`])
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
                plugins: ["@babel/plugin-transform-modules-commonjs"],
            }),
        )
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(dest(`${BUILD_FOLDER}js`));
}

function styles() {
    return src(`${STYLES_FOLDER}*.css`)
        .pipe(minifyCss())
        .pipe(rename({ extname: ".min.css" }))
        .pipe(dest(`${BUILD_FOLDER}css`));
}

async function watcher() {
    watch(`${SCRIPTS_FOLDER}*.js`, scripts);
    watch(`${STYLES_FOLDER}*.css`, styles);
    watch(`${APP_FOLDER}*.html`, html);
    watch(`${STYLES_FOLDER}*.css`, browserSync.reload);
}

exports.build = series(cleanDist, html, styles, scripts);
exports.default = series(html, styles, scripts,  watcher, browsSync);
