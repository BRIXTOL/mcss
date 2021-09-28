import m from 'mithril';

var curried = {

  view: () =>  m(".row", [
    m("ul.d-sm-flex.d-sm-inline-flex", [
      m("li", 'some text', 'foo')
    ])
  ])

};

export { curried as default };
