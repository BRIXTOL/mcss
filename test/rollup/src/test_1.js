import './styles/test_1.css';

import m from 'mithril';

const variable = 'foo'

export default {

  view: () =>  m.div('row')(
    [
      // => m('#id.some-class-in-test-3', 'with an id')
      m('#id.some-class-in-test-3', 'with an id'),

      // This is known class, it will render as:
      // => m('.some-other-class-in-test-3')
      m.div('some-other-class-in-test-3'),

      // This is known class, expressed as standard selector it will render as:
      // => m('span.some-class-in-test-3')
      m.span('.some-class-in-test-3'),

      // This is is a text value entry
      // => m('p', 'unknown')
      m.p('text only'),

      // => m('div', 'variable')
      m.div(variable),

      // => m('button', { onclick: e => e })
      m.button({ onclick: e => e }),

      // => m('button.some-class-in-test-3', { onclick: e => e })
      m.button('.some-class-in-test-3', { onclick: e => e }),

      // This will render children vnodes
      // => m('ul', [ m('li', 'inner text'), m('li', variable) ])
      m.ul([
        m.li('inner text'),
        m.li(variable)
      ]),


      // => m('ul.list', [])
      m.ul('list')(
        [
          // => m('li.'.some-class-in-test-3', 'standard selector')
          m('li.some-class-in-test-3', 'standard selector'),

          // => m('li.'.some-class-in-test-3', 'standard selector')
          m('li.will-not-obfucate.some-class-in-test-3', 'standard selector'),

          // => m('li.foo', 'hello world')
          m.li('foo')('hello world'),

          // => m('li', 'text only')
          m.li('text only'),

          // => m('li.d-block', { id: 'some-id', onclick: (e) => console.log(e) })
          m.li('.d-block', { id: 'some-id', onclick: (e) => console.log(e) }),

        ]
      )
    ]
  )

};
