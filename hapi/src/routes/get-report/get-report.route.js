const getReportHandler = require('./get-report.handler')

module.exports = {
  method: 'POST',
  path: '/api/get-report',
  handler: getReportHandler
}
