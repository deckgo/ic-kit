const esbuild = require('esbuild');
const {readFile, writeFile, mkdir, rm} = require('fs').promises;
const minify = require('html-minifier-terser').minify;
const crypto = require('crypto');

(async () => {
  await rm('./dist', {recursive: true, force: true});
  await mkdir('./dist');

  const {outputFiles} = esbuild.buildSync({
    entryPoints: ['src/deck/index.js'],
    bundle: true,
    minify: true,
    format: 'esm',
    target: ['esnext'],
    write: false,
    define: {
      'process.env.SIGNALING_SERVER': JSON.stringify('https://api.deckdeckgo.com'),
      'process.env.NO_REMOTE': 'false',
      'process.env.KEEP_HISTORY': 'false'
    }
  });

  const script = outputFiles[0].text;

  // prettier-ignore
  const sha256 = `'sha256-${crypto.createHash("sha256").update(script).digest("base64")}'`;

  const src = await readFile('src/deck/index.html', 'utf8');

  const minifyOptions = {
    collapseWhitespace: true,
    keepClosingSlash: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true
  };

  const html = (await minify(src, minifyOptions))
    .replace('{{DECKDECKGO_EXTRA_SHAS}}', sha256)
    .replace('{{DECKDECKGO_HEAD_SCRIPT}}', `<script>${script}</script>`);

  await writeFile('dist/deck.html', html);
})();
