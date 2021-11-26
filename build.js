#!/usr/bin/env node

const esbuild = require('esbuild');
const {readFile, writeFile, mkdir, rm} = require('fs').promises;
const minify = require('html-minifier-terser').minify;
const crypto = require('crypto');

const buildScript = () => {
  const {metafile} = esbuild.buildSync({
    entryPoints: ['src/deck/index.js'],
    entryNames: '[dir]/[name]-[hash]',
    bundle: true,
    minify: true,
    format: 'esm',
    target: ['esnext'],
    outdir: 'dist/build/deck',
    metafile: true,
    define: {
      'process.env.SIGNALING_SERVER': JSON.stringify('https://api.deckdeckgo.com'),
      'process.env.NO_REMOTE': 'false',
      'process.env.KEEP_HISTORY': 'false'
    }
  });

  const {outputs} = metafile;
  return Object.keys(outputs)[0];
};

const scriptSha256 = async (scriptPath) => {
  const script = await readFile(scriptPath, 'utf8');

  // prettier-ignore
  return `'sha256-${crypto.createHash("sha256").update(script).digest("base64")}'`;
};

const buildCSS = () => {
  const {metafile} = esbuild.buildSync({
    entryPoints: ['src/index.css', 'src/deck/index.css'],
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

(async () => {
  await rm('./dist', {recursive: true, force: true});
  await mkdir('./dist/p', {recursive: true});

  const scriptPath = buildScript();

  const sha256 = await scriptSha256(scriptPath);

  const cssPaths = buildCSS();

  const src = await readFile('src/deck/index.html', 'utf8');

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
    .replace('{{DECKDECKGO_EXTRA_SHAS}}', sha256)
    .replace('<!-- DECKDECKGO_HEAD_SCRIPT -->', `<script type="module" src="${scriptPath.replace('dist', '')}"></script>`)
    .replace('<!-- DECKDECKGO_HEAD_CSS -->', cssPaths.map(cssPath => `<link href="${cssPath.replace('dist', '')}" rel="stylesheet">`).join(''));

  await writeFile('dist/p/deck.html', html);
})();
