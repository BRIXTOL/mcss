> This is in an alpha-release stage

# mithril-fugazi (alpha-release)

Mithril Fugazi is a build time development extension/plugin that provides class selector completion and obfuscation support for [mithril](https://mithril.js.org) projects bundled with [Rollup](https://rollupjs.org/guide/en/). The plugin provides [fugazi](https://www.youtube.com/watch?v=Oh1HI-ag7HA) methods on the `m` export which provides class name selector completion and obfuscation capabilities to developers who write stylesheets and scripts separate from one another.

> This tool is developed for use with [mithril.js](https://mithril.js.org) and it cannot be appropriated into different frameworks. If you don't use mithril, then you should consider it for your next project.

## Contents

1. [Install](#install)
2. [How it works](#how-it-works)
3. [Plugins](#plugins)
4. [Rollup Config](#rollup-config)
5. [Typings](#typings)
6. [Obfuscation](#obfuscation)
7. [Usage](#usage)
8. [Selector Example](#selector-example)
9. [Unknown Selectors]("#unknown-selectors)
10. [Caveats](#caveats)

## Install

```cli
pnpm add @brixtol/mithril-fugazi -D
```

_Because [pnpm](https://pnpm.js.org/en/cli/install) is dope and does dope shit_

#### Peers

- [rollup](https://rollupjs.org/guide/en/)
- [postcss](https://postcss.org/)
- [@types/mithril](https://github.com/MithrilJS/mithril.d.ts)

## How it works

Mcss leverages Rollup and PostCSS. The module will parse your stylesheets and generate a type declaration file which contains all defined selector (class names) which is does via PostCSS. Using Rollup's plugin API it walks the generated acorn AST, finds all instances of the fugazi `m.css` selector in JavaScript/TypeScript files and replaces it with the valid hyperscript equivalent.

#### HyperScript Fugazi's

If you feel like the `m.css` is to cumbersome you can leverage alternatives.

**Expose as a method atop of `m`**

```js
m(m.css.div('foo', 'bar'));
m(m.css.ul('foo', 'bar'));
```

**Provide on global namespace**

Use global namespace export.

```js
m(fugazi.div('foo', 'bar'));
m(fugazi.ul('foo', 'bar'));
```

**Expose on `m`**

Tag names are exposes on the `m` export.

```js
m(m.div('foo', 'bar'));
m(m.ul('foo', 'bar'));
```

**Curried approach atop of `m`**

Tag names are exposed on the `m` export and selectors are curried.

<!-- prettier-ignore -->
```js
m.div(
  'foo',
  'bar'
)(
  {
    onclick: e => console.log(e),
    onfocus: e => console.log(e)
  },
  m.ul(
    [
      m.li('one'),
      m.li('active')('two'),
    ]
  )
);
```

#### Plugins

Mcss is merely a glorified rollup and postcss plugin. In order for one to leverage it in their project you need to couple it with another rollup plugin which exposes a method that provides support for postcss. It does not matter what plugin it is as long as you can implement postcss, below are the two most common:

- [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss)
- [rollup-plugin-scss](https://github.com/thgh/rollup-plugin-scss)

#### Rollup Config

<!-- prettier-ignore -->
```js
import mcss from '@brixtol/mcss';
import postcss from 'rollup-plugin-postcss'


export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    mcss(),
    postcss({ plugins: [ mcss.postcss() ])
  ]
};

```

## Typings

Mcss will generate a `mcss.d.ts` declaration file populated with your css class selectors that have been defined within stylesheets. The generated declaration will extend mithril's definitely typed [mithril.d.ts](https://github.com/MithrilJS/mithril.d.ts) `Static` interface and implement a fugazi `m.css.*` method on the `m` export. The `mcss.d.ts` file will be automatically be updated when you define or delete selectors within stylesheets.

#### TS/JS Config

Enable `esModuleInterop` or `allowSyntheticDefaultImports` options to import mithril's commonjs export format in your `tsconfig.json` or `jsconfig.json` file. Some projects may need to explicitly _include_ the location of your src files and types directory (types is where `mcss.d.ts` declaration files are generated). The below config should cover all bases:

```jsonc
{
  "include": ["src", "types"], // sometimes required
  "compilerOptions": {
    "module": "ES2020",
    "target": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

> Refer to the [@types/mithril](https://github.com/MithrilJS/mithril.d.ts) for more information.

## Obfuscation

Class names can be obfuscated. Obfuscation can help reduce bundle size because it renames classes to single letter and/or number combinations. This is very helpful when you are working on a large project as it reduces both the production size of your stylesheet and javascript files.

#### Before Obfuscation

Your css:

<!-- prettier-ignore -->
```css
.some-class-name {}
.another-class-name {}
.yet-another-class-name {}
```

Your mithril node:

<!-- prettier-ignore -->
```js
m('.some-class-name.another-class-name.yet-another-class-name');
```

#### After Obfuscation

Your css:

<!-- prettier-ignore -->
```scss
.a {} // .some-class-name
.b {} // .another-class-name
.c {} // .yet-another-class-name
```

Your mithril node:

<!-- prettier-ignore -->
```js
m('.a.b.c');
```

## Usage

Below is an example using [rollup-plugin-scss](https://github.com/thgh/rollup-plugin-scss) which allows us to pass transpiled code to postCSS via its `processor` hook option. If you are not processing SASS/SCSS files then you can use the [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss) plugin and add the `mcss.postcss()` method to its `plugins[]` field. The `mcss()` default export should be placed within rollup `plugins[]` and its the function which you will use to define options. The `mcss.postcss()` does not accept any options, it's just a method.

> The plugin provides detailed JSDoc annotated descriptions of all options.

<!-- prettier-ignore -->
```js
import fugazi from '@brixtol/mithril-fugazi';
import scss from 'rollup-plugin-scss';
import sass from 'node-sass';
import postcss from 'postcss'
import clean from 'postcss-clean'
import autoprefixer from 'node-autoprefixer';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: false,
    plugins: [
      terser()
    ]
  },
  plugins: [
    fugazi({
      // The type of fugazi selector
      selector: 'curried',
      // Files to exclude
      include: [],
      // Files to exclude
      exclude: [],
      // Clear the cache before new builds
      clean: false,
      // Prints warnings about unknown selectors.
      warnUnknown: true,
      // Generate sourcemaps
      sourcemap: true,
      // When true, obfuscation is applied (defaults to false)
      obfuscate: false,
      // Where cached mappings are stored.
      cacheDir: 'node_modules/.cache/mcss',
      // Where the m.css.d.ts selector type declarations are stored
      typesDir: 'types',
      // The alphabet used to generate the new class names
      alphabet: 'abcefghijklmnopqrstuvwxyz0123456789',
      // A list of class names to ignore.
      ignore: []
    }),
    scss({
      sass,
      output: 'dist/style.min.css',
      watch: 'src',
      processor: () => postcss([
        autoprefixer(),
        clean(),
        fugazi.postcss() // Provide this as the last plugin in postcss
      ])
    })
  ]
};
```

#### Selector Example

The plugin allows selectors to be expressed as if they apart of the mithril API via the `m.css` which is available as a method of the `m` default export. The generates type declarations which extend the mithril module will give the impression that mithril provides this method natively (FYI: It doesn't, it's a [fugazi](https://www.youtube.com/watch?v=Oh1HI-ag7HA)).

> It's important to note that the tag name, which can normally be omitted in hyperScript is required when using mcss.

Below is an example using curried fugazi selector type:

<!-- prettier-ignore -->
```js
import m from 'mithril'

m.div(
  'row',
  'jc-center'
)(
  m.div(
    'col',
    'col-sm-6',
    'col-lg-12'
  )(
    m.ul('list')([
      m.li('list-item')('one'),
      m.li('list-item')('two'),
      m.li('list-item')({ class: m.class('foo', 'bar') } , 'three'),
      m.li('list-item')({
        onclick: (e) => e.target.className = 1 > 0 ? m.class(
          'new-list-item-class',
          'another-class-in-your-stylesheet'
        ) : m.class(
          'list-item',
          'foo',
          'bar'
        )
      }, 'four')
    ])
  )
)
```

Rollup will convert all instances of the fugazi `m.*()()` selector when processing the output. Every selector matching such schema when encountered in chunks will be swapped out and replaced with a valid hyperscript equivalent. This a fast process because we apply these transformation directly on the AST. The above example would output the following:

```js
m(
  "div.row.jc-center"
  m(
    "div.col",
    m("ul.list",
      m("li.list-item", "one"),
      m("li.list-item", "two"),
      m("li.list-item", { class: 'foo bar' }, "three"),
      m("li.list-item"), {
        onclick: (e) =>  e.target.className = 1 > 0
          ? "new-list-item-class another-class-in-your-stylesheet"
          : "list-item foo bar"
        )
      }, "four")
    )
  )
);
```

The `m.*()()` selector tag we are using is just sugar and it holds not value outside of the development process. It merely provides us the capabilities of selector completion and a nice way to express selector class names. Because mcss is generating a mapped reference of selectors defined within stylesheets it also provides obfuscation capabilities.

> By default, mcss will not run obfuscation in transforms, you must enable this by setting `obfuscate` to `true` in the options.

When obfuscate is enabled all class names defined in stylesheets and all the selectors of `m.css` will be replaced with a short-name variation that is auto-generated according to the `alphabet` sequence provided.

The above code would output something like this:

```js
m(
 "div.a.b"
  m(
    "div.c.d.e",
    m("ul.f",
      m("li.g", "one"),
      m("li.g", "two"),
      m("li.g", { class: 'h i' }, "three"),
      m("li.g"), {
        onclick: (e) => {
          e.target.className = 1 > 0
            ? "j k"
            : "g h i"
          )
        }
      }, "four")
    )
  )
);
```

#### ClassName Selectors

In the above examples you will notice in `onclick` and `class` that we are using `m.css.class()` to define our selectors. The `m.css.class()` method will transform selectors and separate them with a single whitespace character. All other methods of `m.css.*` which represent valid HTML tag names will be transform using dot `.` separators.

```js
m.css.class('foo', 'bar'); // => 'foo bar'
m.css.div('foo', 'bar'); // 'div.foo.bar' or '.foo.bar'
m.css.ul('foo', 'bar'); // 'ul.foo.bar'
```

## Unknown Selectors

When mcss encounters a selector that is not defined in your stylesheets it will print a warning to the console and also list all the class names missing (unknown) from stylesheets but defined in selectors. You can suppress this warning by setting the `warnUnknown` option to `false` or alternatively you can them to the `ignore[]` option.

> The module assumes that all selectors expressed in the `m.css.*` method are css class names defined in stylesheets.

## Caveats

There are a couple of very minor caveats to this approach. When you are using mcss, you are not required to define every selector with it, so in situations where mcss cannot suffice, use the traditional approach.

#### Maps before bundles in build mode

Mcss will create couple of cache files after reading stylesheets. These files contain JSON references of your class name which are used when generating types declarations and obfuscating selectors. Because mcss is Rollup integrated solution that couples PostCSS via third party plugins the cache files which get generated from the stylesheets are processed as assets and their output is handled separate from chunk generation.

When operating in watch mode this is not an issue as mcss will execute a rebuild upon map generation after PostCSS has processed styles. When operating in build mode (ie: generating production bundles) and if obfuscation is enabled then mcss will need to generate a class name obfuscation mapping. The problem here that that can only be done in the post-build cycle which means in situations where an obfuscation cache mapping does not exists, you will need to execute a rebuild of the project a second time.

#### Do not provide dynamic selectors

Mcss is not intelligent enough to understand dynamic selectors, ie: selectors which are defined as a variable or data reference value. The class names you provide to the `m.css` method need to be string values wrapped in quotation characters, for example:

```js
import m from 'mithril';

const selector = 'my-button';

// DO NOT DO THIS

m(m.css.div('foo', 'bar', selector));

// DO THIS INSTEAD

m(m.css.div('foo', 'bar') + `.${selector}`);
```

#### Do not perform actions within the selector

Similar to mcss not supporting dynamic selectors, you cannot perform actions within the `m.css` selector. This means that conditional expressions will not work, for example:

```js
import m from 'mithril';

// DO NOT DO THIS

m(m.css.div(i > 1 ? 'foo' : 'bar'));

// DO THIS INSTEAD

m(i > 1 ? m.css.div('foo') : m.css.div('bar'));
```

`m.css.div(i > 1 ? 'foo' : 'bar')`

## LICENSE

MIT
