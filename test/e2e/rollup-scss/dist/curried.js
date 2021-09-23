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
  ) => m(".row", 
    m(".col.col-sm-6.col-lg-12.d-sm-inline-flex", 
      m("ul.list", 
        [
          m("li",{ class: 'foo' }, 'foo')

          ,

          [
            m("li",{ onclick: e => e })
          ],

          m("li.list-item", 'one', 'soo'),
          m("li.list-item", 'two'),
          m("li.list-item", { class: "foo bar "}, 'three'),
          m("li.list-item", {
            onclick: (e) => {
              e.target.className = e.target ? "new-list-item-class another-class-in-your-stylesheet ": "list-item foo bar "
            }
          }, 'four')
        ]
      )
    )
  )
};

export { curried as default };
