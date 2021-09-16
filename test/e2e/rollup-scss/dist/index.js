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
      ".col-12.col-lg-6.order-last.order-md-first.as-center.p-2.p-md-4"
      , m(
        ".w-90.w-sm-80.m-auto"
        , m(
          "h3.mt-4.mb-3.mt-md-0.text-uppercase"
          , i18n.contactFormTitle.en
        )
        , m('p', i18n.contactFormDescription.en)

        /* FORM SUCCESS ------------------------------- */

        , state.success ? m(
          ".d-block.p-4.text-center"
          , m(
            "h2.heading.mb-3"
            , `${i18n.thanks.en}, ${state.response}`
          )
          , m(
            "h4.heading"
            , m.trust(components.response.success)
          )

        ) : [

          /* FORM FIELDS -------------------------------- */

          m(
            "form.mt-4"
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
              "strong.text-center.text-uppercase.pt-3"
              , components.response.failed
            ) : null
          )
        ]
      )
    )

    /* AGENTS ------------------------------------- */

    , m(
      ".col-12.col-md-5.col-lg-6.vh-xl-100.px-2.pt-4.p-xl-4.bg-gray.bg-logo"
      , m(
        ".row.jc-center.ac-center.text-center.text-lg-left.text-xl-center.pt-4"
        , m(
          "small.d-block.w-100.pb-3.text-center.text-uppercase"
          , 'SALE AGENTS'
        )
        , m(
          "h3.w-60.mb-3.pb-3.text-uppercase.text-center.bd-bottom"
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
              ".col-12.col-sm-6.col-lg-7.col-xl-6.mb-4.py-3"
              , m(
                ".w-100"
                , m(
                  "h6.mb-1.strong.text-uppercase"
                  , fullName
                )
                , m(
                  "p.mt-3.pb-1.mb-0", jobTitle
                )
                , m(
                  "small.text-uppercase"
                  , officeLocation
                )
                , m(
                  "p.mt-3.pb-1.mb-0", phoneNumber
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
