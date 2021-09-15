import m from 'mithril';
import Fields from 'components/fields';
import meta from 'utils/meta';
import form from 'utils/form';
import { i18n } from 'data';

var index = {

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
  ) => m('.row',

    /* CONTACT FORM ------------------------------- */

    m(
      ".v.a4.bx.en.as-center.j-.rh"
      , m(
        ".w-90.w-sm-80.l0"
        , m(
          "h3.jk.jh.pm.text-uppercase"
          , i18n.contactFormTitle.en
        )
        , m('p', i18n.contactFormDescription.en)

        /* FORM SUCCESS ------------------------------- */

        , state.success ? m(
          ".he.ko.text-center"
          , m(
            "h2.heading.jh"
            , `${i18n.thanks.en}, ${state.response}`
          )
          , m(
            "h4.heading"
            , m.trust(components.response.success)
          )

        ) : [

          /* FORM FIELDS -------------------------------- */

          m(
            "form.jk"
            , {
              name: 's7-contact'
              , novalidate: true
              , method: 'POST'
              , onsubmit: form(state)
              , 'data-netlify': true
              , 'data-netlify-recaptcha': true
            }

            /* NETLIFY HIDDEN ----------------------------- */

            , m('input', { type: 'hidden', name: 'form-name', value: 's7-contact' })

            /* FIELDS ------------------------------------- */

            , components.form.map(attributes => m(Fields, attributes))

            /* SEND BUTTON -------------------------------- */

            , m(
              "button.btn-lg.btn-line.btn-radius.btn-shadow.w-50"
              , {
                type: 'submit'
                , disabled: state.disabled
                , onupdate: () => {
                  state.disabled = !components.form.every((
                    {
                      state: {
                        valid
                      }
                    }
                  ) => valid);
                }
              }
              , i18n.sendEmail.en
            )

            /* FORM ERROR --------------------------------- */

            , state.response === 'error' ? m(
              "strong.text-center.text-uppercase.ki"
              , components.response.failed
            ) : null
          )
        ]
      )
    )

    /* AGENTS ------------------------------------- */

    , m(
      ".v.ap.a4.vh-xl-100.ke.kp.x-.bg-gray.bg-logo"
      , m(
        ".h.jc-center.ac-center.text-center.text-lg-left.text-xl-center.kp"
        , m(
          "small.he.w-100.km.text-center.text-uppercase"
          , 'SALE AGENTS'
        )
        , m(
          "h3.w-60.jh.km.text-uppercase.text-center.bd-bottom"
          , i18n.contactAgent.en
        )
        , components.agents.map(
          (
            {
              fullName,
              officeLocation,
              phoneNumber,
              emailAddress,
              jobTitle
            }
          ) => (
            m(
              ".v.ab.a5.bh.jo.kj"
              , m(
                ".w-100"
                , m(
                  "h6.i4.strong.text-uppercase"
                  , fullName
                )
                , m(
                  "p.jc.j9.ix", jobTitle
                )
                , m(
                  "small.text-uppercase"
                  , officeLocation
                )
                , m(
                  "p.jc.j9.ix", phoneNumber
                )
                , m(
                  'a'
                  , { href: `mailto:${emailAddress}` }
                  , emailAddress
                )
              )
            )
          )
        )
      )
    ))
};

export { index as default };
