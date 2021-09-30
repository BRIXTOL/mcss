import m from 'mithril';

var test_3 = {

  view: () =>  m(".j", 
    [
      m("ul.sw.sx", 
        [

          // => m('li.foo', 'hello world')
          m("li.ap6", 'hello world'),

          // => m('li', 'text only')
          m("li", 'text only'),

          // => m('li.d-block', { id: 'some-id', onclick: (e) => console.log(e) })
          m("li.d-block", { id: 'some-id', onclick: (e) => console.log(e) }),

        ]
      )
    ]
  )

};

export { test_3 as default };
