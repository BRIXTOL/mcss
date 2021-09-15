## @brixtol/mcss 🎭

A SCSS/CSS [mithril](https://mithril.js.org) class selector completion and obfuscation utility for Rollup. MCSS is a build time development extension that creates a fugazi method on the `m` export which provides class name intellisense and obfuscation capabilities.

### Pre-Requisites

This tool is developed for use with [mithril.js](https://mithril.js.org), it cannot be appropriated into different frameworks.

1. Ensure you are using the `m` export, eg: `import m from 'mithril'`
2. Ensure your editor supports IntelliSense capabilities, ie: vscode.
3. Ensure you are using [Rollup](https://rollupjs.org/guide/en/) for bundling your code.

> If you are using a third party tool which uses Rollup under the hood, as long as you can pass both input and output plugins you are fine to use it.

### Instal

```cli
pnpm add @brixtol/mcss -D
```

_Because [pnpm](https://pnpm.js.org/en/cli/install) is dope and does dope shit_

### Usage

Mcss leverages the plugin API of both Rollup and PostCSS. Plugins for each are provided as methods on the default export. The Rollup plugin is available via the `mcss.rollup()` method and is an output plugin type which parses generated code at the post-build cycle available in `output.plugins[]`. We hook into the stylesheet transpilation process via PostCSS plugins using the `mcss.postcss()` method. This plugin allows us to construct class name mappings from styles.

> Because styles and scripts are composed separate from one another the postCSS plugin needs to execute before the rollup plugin, this is why we run the rollup plugin and an output and not an input.

Below is an example using [rollup-plugin-scss](#) which allows us to pass transpiled code to postCSS via its `processor` field. If you are not processing SASS/SCSS files then you can use the [rollup-plugin-postcss](#) plugin and add the `mcss.postcss()` method to the `plugins[]` field.

<!-- prettier-ignore -->
```js
import mcss from '@brixtol/mcss';
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
      mcss.rollup(
        {

         // Files to include (optional)
          include: [],

          // Files to exclude (optional)
          exclude:[],

          // Generate sourcemaps (optional)
          sourcemap: true,

          // When true, obfuscation is applied (defaults to false)
          obfuscate: env.prod === 'true'
        }
      ),
      terser()
    ]
  },
  plugins: [
    scss({
      sass,
      output: 'dist/style.min.css',
      watch: 'src',
      processor: () => postcss([
        autoprefixer(),
        clean(),
        mcss.postcss(
          {

            // When true, obfuscation is applied (defaults to false)
            obfuscate: env.prod === 'true',

            // options for obfuscation
            options: {

              // obfuscate classes with this alphabet
              alphabet: 'abcefghijklmnopqrstuvwxyz0123456789_-',

              // classes with this prefix will be omitted from obfuscation
              ignorePrefix: 'ignore-',

              // Whether or not the ignore prefix should be removed.
              trimIgnorePrefix: true,

            },

            // paths for generated files
            paths: {

              // The location where class name maps are stored
              mappings: 'node_modules/.cache/mcss/.cssmap',

              // The location where class name typings are stored.
              typings: 'node_modules/@brixtol/mcss/classes.d.ts',

            }
          }
        )
      ])
    })
  ]
};
```

### Typings

The module works by generating a type declaration of class names. By default, it writes the generated typing to the `node_modules/@brixtol/mcss` directory. This might _feel_ wrong but the types are constantly being re-generated, it does not really matter that it overwrites that default declaration because it is an empty type (eg: `Array<string>`). It's only after class names have been mapped that the type is populated.

> If you find that new selectors are not showing in completions then you may need to restart the typescript language server.

### Obfuscation

Class names can be obfuscated. Obfuscation can help reduce bundle size because it renames classes to single letter and/or number combinations. This is very helpful when you are working on a large project as it reduces both the production size of your stylesheet and javascript files.

##### Before Obfuscation

Your css:

```css
.some-class-name {
}
.another-class-name {
}
```

Your mithril node:

```js
m('.some-class-name.another-class-name');
```

##### After Obfuscation

Your css:

```css
.a {
}
.b {
}
```

Your mithril node:

```js
m('.a.b');
```

### Development Mode

In development mcss does not apply and code transformations to your javascript, instead it will inject a helper function so `m.css` selector tags can successfully render. You disable this and instead pass all chunks through the replacement wherein all `m.css` selectors are swapped out valid equivalents.

### Example

The plugin allows selectors to be expressed as if they apart of Mithril API available as a method of the `m` default export. MCSS will generates type declarations that extends the Static interface of the mithril module giving the impression that mithril provides the capability (FYI: it doesn't). It's important to note that the tag name, which one can normally omit in hyperScript is required when using mcss.

Below is an example of how you express mcss selectors:

<!-- prettier-ignore -->
```js
m(
  m.css.div(
    'row',
    'jc-center'
  )
  , m(
    m.css.div(
      'col',
      'col-sm-6',
      'col-lg-12'
    )
  , m(
      m.css.ul('list')
      , m(m.css.li('list-item'), 'one')
      , m(m.css.li('list-item'), 'two')
      , m(m.css.li('list-item')
      , {
          // m.css.class() will split classes by space character
          class: m.css.class('foo', 'bar')
        }
        , 'three'
      )
    )
  )
);
```

Rollup will replace all instances of the selector upon when building the output. Each mcss selector that is encountered is swapped out with its valid equivalent:

```js
m(
  "div.row.jc-center"
  m(
    "div.col",
    m("ul.list",
      m("li.list-item", "one"),
      m("li.list-item", "two"),
      m("li.list-item", { class: 'foo bar' }, "three")
    )
  )
);
```

Essentially, the selector tag we are using is just sugar. It hold not value outside of the development process. If we are obfuscating those generated selectors will output in a short-name variation, as an example, the above code would output something like this:

```js
m(
  "div.a.b"
  m(
    "div.c.d.e",
    m("ul.f",
      m("li.g", "one"),
      m("li.g", "two"),
      m("li.g", { class: 'h i' }, "three")
    )
  )
);
```

> When you only need to express the class name itself, use `m.css.class('name')`

#### Caveats

There are a couple of very minor caveats to this approach, they are listed below:

1. You cannot pass variables and must express classes as value wrapped in quotation characters
2. You cannot perform actions on supplied selectors, eg: `m.css.div(i > 1 ? 'foo' : 'bar')`

> Please note that the mcss selector tag is parsed with a basic regular expression. It would be rather extraneous to construct an AST and walk each chunk looking for occurrences of an `m.css` selector, although this might be something worth doing in the future.
