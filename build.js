#!/usr/bin/env node

const esbuild = require('esbuild');
const {readFile, writeFile, mkdir, rm} = require('fs').promises;
const minify = require('html-minifier-terser').minify;
const crypto = require('crypto');

const buildScript = async () => {
  const {metafile} = esbuild.buildSync({
    entryPoints: ['src/index.js', 'src/deck/index.js'],
    entryNames: '[dir]/[name]-[hash]',
    bundle: true,
    minify: true,
    format: 'esm',
    target: ['esnext'],
    outdir: 'dist/build',
    metafile: true,
    define: {
      'process.env.SIGNALING_SERVER': JSON.stringify('https://api.deckdeckgo.com'),
      'process.env.NO_REMOTE': 'false',
      'process.env.KEEP_HISTORY': 'false'
    }
  });

  const {outputs} = metafile;

  const prepare = async (scriptPath) => ({
    scriptPath: scriptPath.replace('dist', ''),
    sha256: await scriptSha256(scriptPath)
  });

  const promises = Object.keys(outputs).map((scriptPath) => prepare(scriptPath));

  return Promise.all(promises);
};

const scriptSha256 = async (scriptPath) => {
  const script = await readFile(scriptPath, 'utf8');

  // prettier-ignore
  return `'sha256-${crypto.createHash("sha256").update(script).digest("base64")}'`;
};

const buildCSS = () => {
  const {metafile} = esbuild.buildSync({
    entryPoints: ['src/index.css', 'src/deck/index.css', 'src/doc/index.css'],
    bundle: true,
    minify: true,
    format: 'esm',
    target: ['esnext'],
    outdir: 'dist/build',
    metafile: true
  });

  const {outputs} = metafile;
  return Object.keys(outputs);
};

const buildHTML = async ({srcPath, destPath, scripts, cssPaths}) => {
  const src = await readFile(srcPath, 'utf8');

  const minifyOptions = {
    collapseWhitespace: true,
    keepClosingSlash: true,
    removeComments: false,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true
  };

  const html = (await minify(src, minifyOptions))
    .replace('{{DECKDECKGO_EXTRA_SHAS}}', scripts.map(({sha256}) => sha256).join(' '))
    .replace(
      '<!-- DECKDECKGO_HEAD_SCRIPT -->',
      scripts.map(({scriptPath}) => `<script type="module" src="${scriptPath}"></script>`).join('')
    )
    .replace(
      '<!-- DECKDECKGO_HEAD_CSS -->',
      cssPaths.map((cssPath) => `<link href="${cssPath.replace('dist', '')}" rel="stylesheet">`).join('')
    );

  await writeFile(destPath, html);
};

(async () => {
  await rm('./dist', {recursive: true, force: true});
  await mkdir('./dist/p', {recursive: true});
  await mkdir('./dist/d', {recursive: true});

  const scripts = await buildScript();

  const cssPaths = buildCSS();

  await buildHTML({
    srcPath: 'src/deck/index.html',
    destPath: 'dist/p/index.html',
    scripts,
    cssPaths: cssPaths.filter((cssPath) => cssPath.indexOf('/doc/') === -1)
  });

  await buildHTML({
    srcPath: 'src/doc/index.html',
    destPath: 'dist/d/index.html',
    scripts: scripts.filter(({scriptPath}) => scriptPath.indexOf('/deck/') === -1),
    cssPaths: cssPaths.filter((cssPath) => cssPath.indexOf('/deck/') === -1)
  });

  await buildHTML({
    srcPath: 'src/index.html',
    destPath: 'dist/index.html',
    scripts: scripts.filter(({scriptPath}) => scriptPath.indexOf('/deck/') === -1 && scriptPath.indexOf('/doc/') === -1),
    cssPaths: cssPaths.filter((cssPath) => cssPath.indexOf('/deck/') === -1 && cssPath.indexOf('/doc/') === -1)
  });
})();
