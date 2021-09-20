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
      `${".v.a5.b0.eu.as-center.kt.sf.sa"}`
      , m(
        ".w-90.w-sm-80.mm"
        , m(
          "h3.j1.jy.qg.text-uppercase"
          , i18n.contactFormTitle.en
        )
        , m('p', i18n.contactFormDescription.en)

        /* FORM SUCCESS ------------------------------- */

        , state.success ? m(
          ".hr.k7.text-center"
          , m(
            "h2.heading.jy"
            , `${i18n.thanks.en}, ${state.response}`
          )
          , m(
            "h4.heading"
            , m.trust(components.response.success)
          )

        ) : [

          /* FORM FIELDS -------------------------------- */

          m(
            "form.j1"
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
              "button.w-50"
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
              "strong.text-center.text-uppercase.k1"
              , components.response.failed
            ) : null
          )
        ]
      )
    )

    /* AGENTS ------------------------------------- */

    , m(
      ".v.aq.a5.vh-xl-100.kx.k8.zm.bg-gray.bg-logo"
      , m(
        ".h.ac-center.text-center.text-lg-left.text-xl-center.k8"
        , m(
          "small.hr.w-100.k5.text-center.text-uppercase"
          , 'SALE AGENTS'
        )
        , m(
          "h3.w-60.jy.k5.text-uppercase.text-center.bd-bottom"
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
              ".v.ac.a6.bk.j5.k2"
              , m(
                ".w-100"
                , m(
                  "h6.jk.strong.text-uppercase"
                  , fullName
                )
                , m(
                  "p.ju.kr.jc", jobTitle
                )
                , m(
                  "small.text-uppercase"
                  , officeLocation
                )
                , m(
                  "p.ju.kr.jc", phoneNumber
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
