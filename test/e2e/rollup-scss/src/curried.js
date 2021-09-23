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
  ) => m.div(
    'row',
    'jc-center'
  )(
    m.div(
      'col',
      'col-sm-6',
      'col-lg-12',
      'd-sm-inline-flex'
    )(
      m.ul('list')(
        [
          m.li({ class: 'foo' }, 'foo')

          ,

          [
            m.li({ onclick: e => e })
          ],

          m.li('list-item')('one', 'soo'),
          m.li('list-item')('two'),
          m.li('list-item')({ class: m.class('foo', 'bar') }, 'three'),
          m.li('list-item')({
            onclick: (e) => {
              e.target.className = e.target ? m.class(
                'new-list-item-class',
                'another-class-in-your-stylesheet'
              ) : m.class(
                'list-item',
                'foo',
                'bar'
              );
            }
          }, 'four')
        ]
      )
    )
  )
};
