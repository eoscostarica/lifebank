const i18n = require('i18next')
const nodemailer = require('nodemailer')

const { mailConfig } = require('../config')

const sendVerificationCode = async (
  to,
  verficationCode,
  subject,
  title,
  message,
  buttonText
) => {
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
    subject,
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>${title}</title>
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
              ${subject}
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
                          <img src="https://raw.githubusercontent.com/eoscostarica/lifebank/master/webapp/src/assets/OverWhite-lifebank-logo.jpg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
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
                        <h1 style="margin: 0; font-size: 32px; font-weight: bold; line-height: 48px; color: #BA0D0D;">${title}</h1>
                      </td>
                    </tr>
                    <tr>
                  </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                        <p style="margin: 0;">${message}</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" bgcolor="#ffffff" 
                        style="padding: 24px; font-family: 'Source Sans Pro', 
                        Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                        <a href="https://lifebank.io/verification/${verficationCode}" target="_blank"
                          style="padding: 8px 12px; 
                          border: 1px solid #ED2939;border-radius: 5px;
                          font-family: Helvetica, Arial, sans-serif;font-size: 14px; 
                          color: #BA0D0D; text-decoration: none;
                          font-weight:bold;display: inline-block;">
                          ${buttonText}
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

const sendRegistrationRequest = async (to, lifebankData) => {
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
    subject: 'Lifebank Registration Request',
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>Registration Request</title>
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
              Lifebank registration request.
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
                          <img src="https://raw.githubusercontent.com/eoscostarica/lifebank/master/webapp/src/assets/OverWhite-lifebank-logo.jpg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600 px;">
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #f6f6f6;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: bold; line-height: 48px; color: #BA0D0D;">Registration Request</h1>
                      </td>
                    </tr>
                    <tr>
                  </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                      <h4>Name</h4>
                      <p style="margin: 0;">${lifebankData.name}</p>
                      <h4>Email</h4>
                      <p style="margin: 0;">${lifebankData.email}</p>
                      <h4>Address</h4>
                      <p style="margin: 0;">${lifebankData.address}</p>
                      <h4>Description</h4>
                      <p style="margin: 0;">${lifebankData.description}</p>
                      <h4>Location</h4>
                      <a 
                        href= "https://maps.google.com/maps?q=${lifebankData.coordinates.latitude},${lifebankData.coordinates.longitude}" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        >
                        Go to
                      </a>
                      <h4>Phone</h4>
                      <p style="margin: 0;">${lifebankData.phone}</p>
                      <h4>Schedule</h4>
                      <p style="margin: 0;">${lifebankData.schedule}</p>
                      <h4>Urgency level</h4>
                      <p style="margin: 0;">${lifebankData.urgency_level}</p>
                      <h4>Immunity test</h4>
                      <p style="margin: 0;">${lifebankData.immunity_test}</p>
                      <h4>Invitation code</h4>
                      <p style="margin: 0;">${lifebankData.invitation_code}</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" bgcolor="#ffffff" 
                        style="padding: 24px; font-family: 'Source Sans Pro', 
                        Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                        <a href="https://www.lifebank.io/register-lifebank/${lifebankData.verification_code}" target="_blank"
                          style="padding: 8px 12px; 
                          border: 1px solid #ED2939;border-radius: 5px;
                          font-family: Helvetica, Arial, sans-serif;font-size: 14px; 
                          color: #BA0D0D; text-decoration: none;
                          font-weight:bold;display: inline-block;">
                          Approve
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

const sendCredentialsRecovery = async (
  to,
  account,
  tempSecret,
  subject,
  title,
  message,
  accountText,
  password
) => {
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
    subject,
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title${title}</title>
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
              ${subject}
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
                          <img src="https://raw.githubusercontent.com/eoscostarica/lifebank/master/webapp/src/assets/OverWhite-lifebank-logo.jpg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600 px;">
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #f6f6f6;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: bold; line-height: 48px; color: #BA0D0D;"${title}</h1>
                      </td>
                    </tr>
                    <tr>
                  </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                      <p style="margin: 0;">${message}</p>
                      <h4>${accountText}</h4>
                      <p style="margin: 0;">${account}</p>
                      <h4>${password}</h4>
                      <p style="margin: 0;">${tempSecret}</p>
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

const sendConfirmMessage = async (to, subject, title, message) => {
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
    subject: subject,
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>${title}</title>
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
              ${subject}
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
                          <img src="https://raw.githubusercontent.com/eoscostarica/lifebank/master/webapp/src/assets/OverWhite-lifebank-logo.jpg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600 px;">
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #f6f6f6;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: bold; line-height: 48px; color: #BA0D0D;"> ${title}</h1>
                      </td>
                    </tr>
                    <tr>
                  </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                      <p style="margin: 0;">${message}</p>
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

const sendTransactionReport = async (
  to,
  language,
  role,
  sentHtmlContent,
  receivedHtmlContent
) => {
  let textTag = 'donorTransactionReport'
  if (role === 'sponsor') textTag = 'sponsorTransactionReport'
  else textTag = 'lifebankTransactionReport'

  i18n.changeLanguage(language)
  const subject = i18n.t(textTag + '.subject')

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
    subject: subject,
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
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
              ${subject}
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
                          <img src="https://raw.githubusercontent.com/eoscostarica/lifebank/master/webapp/src/assets/OverWhite-lifebank-logo.jpg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600 px;">
                    <tr>
                    </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                      <p style="margin: 0;">
                        ${i18n.t(textTag + '.paragraph')}
                        <br><br>
                        ${i18n.t(textTag + '.paragraph2')}
                        <br><br>
                        ${i18n.t(textTag + '.paragraph3')}
                        <table>
                          <tr>
                            <th>${i18n.t('mailTransactionReport.to')}</th>
                            <th>${i18n.t('mailTransactionReport.tokens')}</th>
                            <th>${i18n.t('mailTransactionReport.date')}</th>
                          </tr>
                          ${sentHtmlContent}
                        </table>
                        <br><br>
                        ${i18n.t(textTag + '.paragraph4')}
                        <table>
                          <tr>
                          <th>${i18n.t('mailTransactionReport.from')}</th>
                          <th>${i18n.t('mailTransactionReport.tokens')}</th>
                          <th>${i18n.t('mailTransactionReport.date')}</th>
                          </tr>
                          ${receivedHtmlContent}
                        </table>
                        <br><br>
                        ${i18n.t(textTag + '.paragraph5')}
                        <br><br>
                        ${i18n
                          .t('mailUnsubscribe.content')
                          .concat(to, i18n.t('mailUnsubscribe.content2'))}
                      </p>
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

const sendNewSponsorAndOfferReport = async (
  to,
  language,
  role,
  sponsorHtmlContent,
  offerHtmlContent
) => {
  const textTag =
    role === 'sponsor'
      ? 'sponsorAndOfferReportToDonors'
      : 'sponsorAndOfferReportToLifebanks'

  i18n.changeLanguage(language)
  const subject = i18n.t(textTag + '.subject')

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
    subject: subject,
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
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
              ${subject}
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
                          <img src="https://raw.githubusercontent.com/eoscostarica/lifebank/master/webapp/src/assets/OverWhite-lifebank-logo.jpg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600 px;">
                    <tr>
                    </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                      <p style="margin: 0;">
                        ${i18n.t(textTag + '.paragraph')}
                        <br><br>
                        ${i18n.t(textTag + '.paragraph2')}
                        <br><br>
                        ${i18n.t(textTag + '.paragraph3')}
                        ${sponsorHtmlContent}
                        <br><br>
                        ${i18n.t(textTag + '.paragraph4')}
                        ${offerHtmlContent}
                        <br><br>
                        ${i18n.t(textTag + '.paragraph5')}
                        <br><br>
                        ${i18n
                          .t('mailUnsubscribe.content')
                          .concat(to, i18n.t('mailUnsubscribe.content2'))}
                      </p>
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

const sendCongratulationsOnDonation = async (to, subject, content) => {
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
    subject: subject,
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
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
              ${subject}
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
                          <img src="https://raw.githubusercontent.com/eoscostarica/lifebank/master/webapp/src/assets/OverWhite-lifebank-logo.jpg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600 px;">
                    <tr>
                    </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                      <p style="margin: 0;">${content}</p>
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

const sendNewLifebankRegistered = async (to, subject, content) => {
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
    subject: subject,
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
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
              ${subject}
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
                          <img src="https://raw.githubusercontent.com/eoscostarica/lifebank/master/webapp/src/assets/OverWhite-lifebank-logo.jpg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600 px;">
                    <tr>
                    </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                      <p style="margin: 0;">${content}</p>
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

const sendLifebankOnboarding = async (to, language, role) => {
  let textTag = 'donorOnboarding'
  if (role === 'sponsor') textTag = 'sponsorOnboarding'
  else textTag = 'lifebankOnboarding'

  i18n.changeLanguage(language)
  const subject = i18n.t(textTag + '.subject')

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
    subject: subject,
    html: `
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
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
              ${subject}
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
                          <img src="https://raw.githubusercontent.com/eoscostarica/lifebank/master/webapp/src/assets/OverWhite-lifebank-logo.jpg" alt="Logo" border="0" width="70%" style="display: block; width: 70% ">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f6f6f6">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600 px;">
                    <tr>
                    </tr>
                    <tr>
                      <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                      <p style="margin: 0;">
                        ${i18n.t(textTag + '.paragraph')}
                        <br><br>
                        ${i18n.t(textTag + '.paragraph2')}
                        <br><br>
                        ${i18n.t(textTag + '.paragraph3')}
                        <br><br>
                        ${i18n.t(textTag + '.paragraph4')}
                        <ol>
                          <li>${i18n.t(textTag + '.item')}</li>
                          <li>${i18n.t(textTag + '.item2')}</li>
                          <li>${i18n.t(textTag + '.item3')}</li>
                        </ol>
                        <br><br>
                        ${i18n.t(textTag + '.paragraph5')}
                        <br><br>
                        ${i18n.t(textTag + '.paragraph6')}
                      </p>
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

module.exports = {
  sendCredentialsRecovery,
  sendVerificationCode,
  sendRegistrationRequest,
  sendConfirmMessage,
  sendTransactionReport,
  sendNewSponsorAndOfferReport,
  sendCongratulationsOnDonation,
  sendNewLifebankRegistered,
  sendLifebankOnboarding
}
