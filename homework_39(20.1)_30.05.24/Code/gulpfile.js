const {src, dest, watch, series} = require("gulp");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const clean = require("gulp-clean");
const babel = require("gulp-babel");
const minifyHtml = require("gulp-minify-html");
const minifyCss = require("gulp-clean-css");
const ssi = require("gulp-ssi");
const newer = require("gulp-newer");
const imgMin = require("gulp-imagemin");
const browserSync = require('browser-sync').create();

const APP_FOLDER = "./app/";
const BUILD_FOLDER = "./dist/";
const SCRIPTS_FOLDER = `${APP_FOLDER}js/`;
const UTILS_FOLDER = `${SCRIPTS_FOLDER}utils/`;
const STYLES_FOLDER = `${APP_FOLDER}styles/`;
const IMAGES_FOLDER = `${APP_FOLDER}images/`;

function browsSync() {
    browserSync.init({
        server: {
            baseDir: BUILD_FOLDER
        }
    });
}

function cleanDest() {
    return src(`${BUILD_FOLDER}`, {allowEmpty: true})
        .pipe(clean({force: true}));
}

function html() {
    return src(`${APP_FOLDER}*.html`)
        .pipe(ssi())
        .pipe(minifyHtml())
        .pipe(dest(`${BUILD_FOLDER}`));
}

function images() {
    return src(`${IMAGES_FOLDER}**`)
        .pipe(newer(`${BUILD_FOLDER}images`))
        .pipe(imgMin([imgMin.gifsicle({interlaced: true}),
            imgMin.mozjpeg({quality: 75, progressive: true}),
            imgMin.optipng({optimizationLevel: 5}),
            imgMin.svgo({plugins: [{removeViewBox: true}, {cleanupIDs: false}]})]))
        .pipe(dest(`${BUILD_FOLDER}images`));
}

function scripts() {
    return src([`${UTILS_FOLDER}*.js`, `${SCRIPTS_FOLDER}*.js`])
        .pipe(concat("main.js"))
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
            }),
        )
        .pipe(uglify())
        .pipe(rename({extname: ".min.js"}))
        .pipe(dest(`${BUILD_FOLDER}js`));
}

function styles() {
    return src(`${STYLES_FOLDER}*.css`)
        .pipe(minifyCss())
        .pipe(rename({extname: ".min.css"}))
        .pipe(dest(`${BUILD_FOLDER}css`));
}

function reload(done) {
    browserSync.reload();
    done();
}

async function watcher() {
    watch(`${SCRIPTS_FOLDER}*.js`, series(scripts, reload));
    watch(`${STYLES_FOLDER}*.css`, series(styles, reload));
    watch(`${IMAGES_FOLDER}*`, series(images, reload));
    watch(`${APP_FOLDER}*.html`, series(html, reload));
}

exports.build = series(cleanDest, html, styles, scripts, images);
exports.default = series(html, styles, scripts, images, watcher, browsSync);
