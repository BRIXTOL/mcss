import m from 'mithril';

var test_2 = {

  view: () =>  m.div('row')(
    [
      m.ul(
        'd-sm-flex',
        'd-sm-inline-flex'
      )(
        [

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

export { test_2 as default };
