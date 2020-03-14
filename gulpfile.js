
const { series, src, dest, watch } = require('gulp');
const bs = require('browser-sync').create();
const argv = require('yargs').argv;

const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

/**
 * Compiles sass to css and autoprefixes needed vendor stuff
 */
function css() {
  return src('src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'));
}

function buildCss() {
  return src('src/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(dest('dist'));
}

/**
 * Proxies AO3 on localhost and either replaces their stylesheets with ours
 * or appends our stylesheet after theirs.
 * 
 * @param {object}  [options]
 * @param {boolean} [options.replace] - If true, replaces their stylesheet with ours. Otherwise appends.
 */
function browserSync(options) {
  const defaults = {
    replace : false
  };

  const config = {
    ...defaults,
    ...options
  };

  // Default rewrite rules for appending styles
  let rewriteRules = [
    {
      match : /<\/head>/,
      fn    : (req, res, match) => {
        const injectStyles = `
        <link rel="stylesheet" type="text/css" media="screen" href="/dist/desktop.css" />
        <link rel="stylesheet" type="text/css" media="screen and (max-width: 42em), handheld" href="/dist/mobile.css" />
        `;
        return injectStyles + match;
      }
    }
  ];

  // Rewrite rules for replacing styles
  if(config.replace) {
    rewriteRules = [
      {
        match   : /href="\/stylesheets\/skins\/skin_873_archive_2_0\/(.*?)1_site_screen_\.css(\.pagespeed\.cf\.(.*?)\.css)*?"/g,
        replace : 'href="/dist/desktop.css"'
      },
      {
        match   : /href="\/stylesheets\/skins\/skin_873_archive_2_0\/(.*?)5_site_narrow.handheld_\.css(\.pagespeed\.cf\.(.*?)\.css)*?"/g,
        replace : 'href="/dist/mobile.css"'
      }
    ];
  }

  return bs.init({
    ghostMode : {
      clicks : false,
      scroll : false,
      forms  : false
    },
    proxy : {
      target  : 'https://archiveofourown.org',
      cookies : {stripDomain: false}
    },
    serveStatic : [{
      route : '/dist',
      dir   : 'dist'
    }],
    files : ['dist/**'],
    rewriteRules
  });
}

function changes(cb) {
  browserSync({replace: argv.replace});
  watch('src/**/*.scss', { events: 'all' }, css);
  cb();
}

exports.build = buildCss;
exports.default = series(css, changes);
