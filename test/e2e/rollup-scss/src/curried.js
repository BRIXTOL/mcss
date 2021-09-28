import './style.scss';

import m from 'mithril';

export default {

  view: () =>  m.div('row')([
    m.ul('d-sm-flex', 'd-sm-inline-flex')([
      m.li('some text', 'foo')
    ])
  ])

};
