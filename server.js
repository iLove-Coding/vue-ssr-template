/**
 * node 启动文件
 */
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const KoaRoute = require('koa-router');
const serve = require('koa-static')
const LRU = require('lru-cache');
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file);
const isProd = process.env.NODE_ENV === 'production'

const app = new Koa();
const router = new KoaRoute();

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

const templatePath = resolve('./index.template.html');
let readyPromise;
let renderer;

if (isProd) {
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

function render(ctx, next) {
  ctx.set("Content-Type", "text/html")

  return new Promise((resolve, reject) => {
    const context = {
      url: ctx.url
    };

    renderer.renderToString(context).then(html => {
      ctx.body = html;
      resolve();
    }).catch(err => {
      console.log('err', err);
      ctx.body = '500 Error';
      reject();
    });
  });
}

// 静态资源管理
app.use(serve('.'))

router.get('*', render);

app.use(router.routes()).use(router.allowedMethods())

app.listen(9090, err => {
  console.log('server listen on 9090');
});