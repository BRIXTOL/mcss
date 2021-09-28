import m from 'mithril';

var curried = {

  oninit: (
    {
      attrs: {
        data
      }
    }
  ) => meta(data)

  , view: (
    {
      attrs: {
        state,
        data: {
          components
        }
      }
    }
  ) =>  m("ul.list", [
        m("li", { class: 'foo' }, 'foo'),
        m("li.intercepts.another", 'ddddddddddsomething')
    ])

};

export { curried as default };
