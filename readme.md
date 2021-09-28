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
pnpm add mithril-fugazi -D
```

_Because [pnpm](https://pnpm.js.org/en/cli/install) is dope and does dope shit_

#### Peers

- [rollup](https://rollupjs.org/guide/en/)
- [postcss](https://postcss.org/)
- [@types/mithril](https://github.com/MithrilJS/mithril.d.ts)

## How it works

Fugazi leverages Rollup and PostCSS. The module will parse your stylesheets and generate a type declaration file containing all defined selector (class names). Using Rollup's plugin API it walks the generated acorn AST, intercepting fugazi instance methods in JavaScript/TypeScript files replacing them with valid hyperscript equivalents.

#### Methods

**Selector Fugazi**

Supplies a `css` method atop of an `m` export. The transformed value will be a dot `.` separated hyperscript selector.

```js
m(m.css.div('foo', 'bar'));
m(m.css.ul('foo', 'bar'));
```

**Curried Fugazi`**

HTML Tag names are exposed atop of the `m` export. Selectors (class names) can be provided with curried expression. This is however optional, you can omit selectors and pass mithril attrs, vnodes (children), text value or combination of all 3.

<!-- prettier-ignore -->
```js

// Text value
m.div('hello world') // => m('div', 'hello world')

// Attributes with vnodes
m.p({ id: '1' }, [ m.span('bar', 'hello') ]) // => m('p', { id: '1' }, [ m('span.bar', 'hello') ])

// Curried with selectors
m.div(
  'foo',
  'bar',
  'baz'
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

Mithril Fugazi is a glorified rollup and postcss plugin combination. In order for one to leverage it in their project you need to couple it with a rollup plugin that exposes a method for postcss. It does not matter what plugin it is as long as you can implement postcss, below are the two most common:

- [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss)
- [rollup-plugin-scss](https://github.com/thgh/rollup-plugin-scss)

#### Rollup Config

<!-- prettier-ignore -->
```js
import fugazi from 'mithril-fugazi';
import postcss from 'rollup-plugin-postcss'


export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    fugazi(),
    postcss({ plugins: [ fugazi.postcss() ])
  ]
};

```

## Typings

The plugin will generate a `fugazi.d.ts` declaration file populated with your css class selectors that have been defined within stylesheets. The generated declaration will extend mithril's definitely typed [mithril.d.ts](https://github.com/MithrilJS/mithril.d.ts) `Static` interface and implement a fugazi methods on the `m` export. The `fugazi.d.ts` file will be automatically be updated when you define or delete selectors within stylesheets.

#### TS/JS Config

Enable `esModuleInterop` or `allowSyntheticDefaultImports` options to import mithril's commonjs export format in your `tsconfig.json` or `jsconfig.json` file. Some projects may need to explicitly _include_ the location of your src files (_types_ is where the `fugazi.d.ts` declaration file is generated). You can customize the location where the declaration is written. The below config should cover all bases:

```jsonc
{
  "include": ["src", "types"],
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

Class names can be obfuscated. Obfuscation can help reduce bundle size because it renames classes to single letter and/or number combinations. This is very helpful when you are working on a large project as it reduces both the production size of your stylesheet and javascript files. By default, obfuscation is disabled, you will need to pass a boolean `true` value to enable, do this when bundling for production.

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

Below is an example using [rollup-plugin-scss](https://github.com/thgh/rollup-plugin-scss) which allows us to pass transpiled code to postCSS via its `processor` hook option. If you are not processing SASS/SCSS files then you can use the [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss) plugin and add the `mcss.postcss()` method to its `plugins[]` field. The `fugazi()` default export should be placed within rollup `plugins[]` and its the function which you will use to define options. The `fugazi.postcss()` does not accept any options, it's just a method.

> The plugin provides detailed JSDoc annotated descriptions of all options.

<!-- prettier-ignore -->
```js
import fugazi from 'mithril-fugazi';
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
      // Where the generated a declaration file is written.
      declaration: 'types/fugazi.d.ts',
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

> It's important to note that the tag name, which can normally be omitted in hyperScript is required when using fugazi.

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

The `m.*()()` selector tag we are using is just sugar and it holds not value outside of the development process. It provides us the capabilities of selector completion and a nice way to express selector class names. When obfuscate is enabled all class names defined in stylesheets and all the selectors of `m.*` will be replaced with a short-name variation that is auto-generated according to the `alphabet` sequence provided.

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

In the above examples you will notice in `onclick` and `class` that we are using `m.css.class()` to define our selectors. The `m.css.class()` method will transform selectors and separate them with a single whitespace character. All other methods of `m.css` will be transform using dot `.` separators.

```js
m.class('foo', 'bar'); // => 'foo bar'
m.css('foo', 'bar'); // => '.foo.bar'
```

## Unknown Selectors

When an unknown selector is encountered that has no be defined in your stylesheets a warning will be printed to the console along with a list all the selector class name missing. This indicated thr selector being used in is undefined in your stylesheet. You can suppress this warning by setting the `warnUnknown` option to `false` or alternatively you can add those selectors to the `ignore[]` option.

> The module assumes that all selectors expressed on the `m.*` method are css class names defined in stylesheets.

## Caveats

There are a couple of very minor caveats to this approach. When you are writing hyperscript selectors using the fugazi approach.

#### Maps before bundles in build mode

The module will create couple of cache files after reading stylesheets. These files contain JSON references of your class name which are used when generating types declarations and obfuscating selectors. Because the plugin is a Rollup integrated solution coupling PostCSS via third parties the cache files which get generated are processed as assets and their output is handled separate from chunk generation.

When operating in watch mode this is not an issue as fugazi will execute a rebuild upon map generation after PostCSS has processed styles. When operating in build mode (ie: generating production bundles) and if obfuscation is enabled then you will need to generate a class name obfuscation mapping. The problem here that that can only be done in the post-build cycle. In situations where an obfuscation cache mapping does not exists, you will need to execute a rebuild of the project a second time. This can easily be avoided by using fugazi in dev mode before bundling for production.

Don't be hero, no one likes hero's.

#### Do not provide dynamic selectors

The module is not intelligent enough to understand dynamic selectors, ie: selectors which are defined as a variable or data reference value. The class names you provide to the `m.*()` method need to be string values wrapped in quotation characters, for example:

```js
import m from 'mithril';

const selector = 'my-button';

// DO NOT DO THIS

m.div('foo', 'bar', selector)();
```

#### Do not perform actions within the selector

Similar not supporting dynamic selectors, you cannot perform actions within the `m.*()` selector. This means that conditional expressions will not work, for example:

```js
import m from 'mithril';

// DO NOT DO THIS

m.div(i > 1 ? 'foo' : 'bar'));

```

## LICENSE

MIT
