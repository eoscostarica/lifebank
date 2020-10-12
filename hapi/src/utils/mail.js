const nodemailer = require('nodemailer')

const { mailConfig } = require('../config')

const sendVerificationCode = async (to, verficationCode) => {
  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    secure: false,
    port: mailConfig.port,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass
    },
    tls: { rejectUnauthorized: false }
  })

  const from = 'Lifebank <webmaster@lifebank.io>'

  await transporter.sendMail({
    from,
    to,
    subject: 'Lifebank Verfication Code',
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>Email verification</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
            /**
             * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
             */
          @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 400;
                src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
              }
              @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 700;
                src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
              }
            }
            /**
             * Avoid browser level font resizing.
             * 1. Windows Mobile
             * 2. iOS / OSX
             */
            body,
            table,
            td,
            a {
              -ms-text-size-adjust: 100%; /* 1 */
              -webkit-text-size-adjust: 100%; /* 2 */
            }
            /**
             * Remove extra space added to tables and cells in Outlook.
             */
            table,
            td {
              mso-table-rspace: 0pt;
              mso-table-lspace: 0pt;
            }
            /**
             * Better fluid images in Internet Explorer.
             */
            img {
              -ms-interpolation-mode: bicubic;
            }
            /**
             * Remove blue links for iOS devices.
             */
            a[x-apple-data-detectors] {
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              color: inherit !important;
              text-decoration: none !important;
            }
            /**
             * Fix centering issues in Android 4.4.
             */
            div[style*="margin: 16px 0;"] {
              margin: 0 !important;
            }
            body {
              width: 100% !important;
              height: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            /**
             * Collapse table borders to avoid space between cells.
             */
            table {
              border-collapse: collapse !important;
            }
            a {
              color: #738EFF;
            }
            img {
              height: auto;
              line-height: 100%;
              text-decoration: none;
              border: 0;
              outline: none;
            }
            </style>
          </head>
          <body style="background-color: #f6f6f6;">
            <!-- start preheader -->
            <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
              Lifebank email verification.
            </div>
            <!-- end preheader -->
            <!-- start body -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">​
              <!-- start logo -->
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                      <td align="center" valign="top" style="padding: 36px 24px;">
                        <a href="" target="_blank" style="display: inline-block;">
                          <img src="https://raw.githubusercontent.com/eoscostarica/lifebank/45cfa8ab1cbe36557aeb26275b127dc155411e42/docs/logos/2-OverWhite-lifebank-logo-v1-may25-2020-01.svg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6">
              
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #f6f6f6;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: bold; line-height: 48px; color: #BA0D0D;">Email verification</h1>
                      </td>
                    </tr>
                    <tr>
                  </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                        <p style="margin: 0;">Thank you for wanting to be part of the lifebank community, click on the button to verify to validate your account.</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" bgcolor="#ffffff" 
                        style="padding: 24px; font-family: 'Source Sans Pro', 
                        Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                        <a href="https://www.lifebank.io/verification/${verficationCode}" target="_blank"
                          style="padding: 8px 12px; 
                          border: 1px solid #ED2939;border-radius: 5px;
                          font-family: Helvetica, Arial, sans-serif;font-size: 14px; 
                          color: #BA0D0D; text-decoration: none;
                          font-weight:bold;display: inline-block;">
                          Verify
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify; border-bottom: 3px solid #BA0D0D">
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6" style="padding: 24px;">                
                </td>
              </tr>
            </table>
          </body>
    `
  })
}

const sendCredentialsRecovery = async (to, { username, secret }) => {
  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    secure: false,
    port: mailConfig.port,
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
  sendCredentialsRecovery,
  sendVerificationCode
}
