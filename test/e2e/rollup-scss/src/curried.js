import './style.scss';
import m from 'mithril';

export default {

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
  ) =>  m.ul('list')([
        m.li({ class: 'foo' }, 'foo'),
        m.li('.intercepts.another', 'ddddddddddsomething')
    ])

};
