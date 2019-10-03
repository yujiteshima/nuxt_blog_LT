# blog_nuxt_bulma

## create project

```bash
create-nuxt-app v2.11.1
✨  Generating Nuxt.js project in blog_nuxt_gcp
? Project name blog_nuxt_gcp
? Project description My cat's meow Nuxt.js project
? Author name Yuji Teshima
? Choose the package manager Yarn
? Choose UI framework Bootstrap Vue
? Choose custom server framework None (Recommended)
? Choose Nuxt.js modules Axios, Progressive Web App (PWA) Support
? Choose linting tools ESLint, Prettier
? Choose test framework Jest
? Choose rendering mode Universal (SSR)
? Choose development tools jsconfig.json (Recommended for VS Code)
yarn run v1.19.0
$ eslint --ext .js,.vue --ignore-path .gitignore . --fix
✨  Done in 2.65s
```

source map
```js
extend(config, ctx) {}
->
extend(config, ctx){
if (ctx.isDev && ctx.isClient) {
        config.devtool = 'eval-source-map'
      }
}
```

analyze
```js
// build
analyze: true,
```

- title 可変部分追加

- nuxt-link prefech on


sass 導入

```
$ yarn add node-sass sass-loader style-loader
```

- fontawesome導入（使うものだけ）
```
$ yarn add @fortawesome/fontawesome-svg-core

$ yarn add @fortawesome/free-solid-svg-icons
$ yarn add @fortawesome/vue-fontawesome
```
```
//plugin
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalendarAlt, faTags } from '@fortawesome/free-solid-svg-icons'

library.add(faCalendarAlt, faTags)

Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false
```
- markdownit導入
```bash
$ yarn add @nuxtjs/markdownit
```

```js
// nuxt.config.js
modules: [
    '@nuxtjs/markdownit'
  ],
markdownit: {
    preset: 'default'
    injected: true, 
    breaks: true, 
    html: true, 
    linkify: true,
    typography: true, 
    xhtmlOut: true,
    langPrefix: 'language-',
    quotes: '“”‘’',
    highlight: function (/*str, lang*/) { return ''; },
  },
```
- prism導入
```bahs
$ yarn add prismjs
```
```js
// plugin
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
export default Prism
```

- vue-scrollto導入

```bash
yarn add vue-scrollto
```




