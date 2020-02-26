# nppack

no-paste-pack

## motivation

when we develop server rendering project, we could use Bootstrap, it needs to paste more and more template html, so the project is very hard to development.

nppack is a way to help your use *Component* to development(if you follow some rules), at last the dist html is like to paste more and more template html, of course it is a work for nppack

## quick-start

### install
```bash
yarn add nppack
```

### project-dir

```plain
│  config.json
│
└─src
    ├─admin
    │  ├─department
    │  │      Content.html
    │  │      Footer.html
    │  │      Header.html
    │  │      index.css
    │  │      index.html
    │  │
    │  └─user
    ├─css
    │      bootstrap.min.css
    │
    ├─image
    └─js
            bootstrap.min.js
            jquery.min.js
```

### Config.json

```json
{
  "src": "./src",
  "srcPublicJs": "./src/js",
  "srcPublicCss": "./src/css",
  "srcPublicImage": "./src/image",

  "dist": "./public",
  "distPublicJs": "./public/js",
  "distPublicCss": "./public/css",
  "distPublicImage": "./public/image",

  "port": 5500,
  "host": "0.0.0.0"
}
```

### how to use

```html
...
<div>
  <Header />
  <h1>nppack</h1>
</div>
...
```

index.html


```html
...
<div>
  <h1>Header</h1>
</div>
...
```

Header.html

### build

in the project root

```bash
# it will build
nppack build

# it will watch file and start devServer
nppack dev
```

in your `config.json - dist: 'xxx'` your `xxx` folder is result html

## Rules

1. in `src` folder the `xxx/xxx/index.html` will be used as a template 

2. in `index.html`, your component name must start with uppercase and in same path your Component.html's file name is same as Component name

```html
<div>
  <Header>
  <h1>foo</h1>
</div>
```

```plain
|-- index.html
|-- Header.html
```

3. public js, css, image's path is setting in `config.json`

4. you could use js, css... they could copy to dist folder

```plain
|-- index.html
|-- Header.html
|-- index.css
|-- index.js
```

```html
<link href="./index.css" rel="stylesheet">
...
<div>
  <Header>
  <h1>foo</h1>
</div>
...
<script src="./index.js"></script>
```
