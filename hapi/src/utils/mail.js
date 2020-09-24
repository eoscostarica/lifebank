const nodemailer = require('nodemailer')

const { mailConfig } = require('../config')

const sendCredentialsRecovery = async (to, { username, secret }) => {
  let transporter = nodemailer.createTransport({
    host: mailConfig.host,
    secure: false,
    host: mailConfig.port,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass
    },
    tls: { rejectUnauthorized: false }
  })

  await transporter.sendMail({
    from: 'webmaster@lifebank.io',
    to,
    subject: 'Lifebank Credentials Recovery',
    html: `<table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="" valign="top" width="100%">
    <tbody>
      <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top;" valign="top">
          <div style="background-color: transparent;">
            <div style="
                color: #2f7d81;
                font-family: Open Sans, Helvetica Neue, Helvetica, Arial,
                  sans-serif;
                line-height: 1.2;
                padding-top: 10px;
                padding-right: 10px;
                padding-bottom: 10px;
                padding-left: 10px;
              ">
              <p style="
                  font-size: 34px;
                  line-height: 1.2;
                  word-break: break-word;
                  text-align: center;
                  mso-line-height-alt: 41px;
                  margin: 0;
                ">
                <span style="font-size: 34px;">
                  <strong>Credentials recovery</strong>
                </span>
              </p>
            </div>
          </div>
          <div style="background-color: transparent;">
            <div class="block-grid three-up" style="
                margin: 0 auto;
                min-width: 320px;
                max-width: 640px;
                overflow-wrap: break-word;
                word-wrap: break-word;
                word-break: break-word;
                background-color: transparent;
              ">
              <div style="
                  border-collapse: collapse;
                  display: table;
                  width: 100%;
                  background-color: transparent;
                ">
                <div class="col num4" style="
                    max-width: 320px;
                    min-width: 213px;
                    display: table-cell;
                    vertical-align: top;
                    width: 213px;
                  ">
                  <div style="width: 100% !important;">
                    <div style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #232132;
                        font-family: Open Sans, Helvetica Neue, Helvetica, Arial,
                          sans-serif;
                        mso-line-height-alt: 14px;
                      ">
                      <p style="
                          font-size: 16px;
                          line-height: 1.2;
                          word-break: break-word;
                          text-align: center;
                          mso-line-height-alt: 19px;
                          margin: 0;
                        ">
                        <span style="font-size: 16px;">
                          <strong>Username</strong>
                        </span>
                      </p>
                    </div>
                    <div style="">
                      <div style="
                          line-height: 1.5;
                          font-size: 12px;
                          color: #808080;
                          font-family: Open Sans, Helvetica Neue, Helvetica, Arial,
                            sans-serif;
                          mso-line-height-alt: 18px;
                        ">
                        <p style="
                            font-size: 12px;
                            line-height: 1.5;
                            word-break: break-word;
                            text-align: center;
                            mso-line-height-alt: 18px;
                            margin: 0;
                          ">
                          <span style="font-size: 12px;">${username}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="
                  border-collapse: collapse;
                  display: table;
                  width: 100%;
                  background-color: transparent;
                ">
                <div class="col num4" style="
                    max-width: 320px;
                    min-width: 213px;
                    display: table-cell;
                    vertical-align: top;
                    width: 213px;
                  ">
                  <div style="width: 100% !important;">
                    <div style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #232132;
                        font-family: Open Sans, Helvetica Neue, Helvetica, Arial,
                          sans-serif;
                        mso-line-height-alt: 14px;
                      ">
                      <p style="
                          font-size: 16px;
                          line-height: 1.2;
                          word-break: break-word;
                          text-align: center;
                          mso-line-height-alt: 19px;
                          margin: 0;
                        ">
                        <span style="font-size: 16px;">
                          <strong>Secret</strong>
                        </span>
                      </p>
                    </div>
                    <div style="">
                      <div style="
                          line-height: 1.5;
                          font-size: 12px;
                          color: #808080;
                          font-family: Open Sans, Helvetica Neue, Helvetica, Arial,
                            sans-serif;
                          mso-line-height-alt: 18px;
                        ">
                        <p style="
                            font-size: 12px;
                            line-height: 1.5;
                            word-break: break-word;
                            text-align: center;
                            mso-line-height-alt: 18px;
                            margin: 0;
                          ">
                          <span style="font-size: 12px;">${secret}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>`
  })
}

module.exports = {
  sendCredentialsRecovery
}
