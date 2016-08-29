const phantom = require('phantom')

let phInstance
phantom.create().then(ph => { phInstance = ph })

function renderPage (content, format = 'PNG', quality = -1) {
  let page

  return new Promise((resolve, reject) => {
    phInstance.createPage().then(p => {
      page = p
      page.on('onLoadFinished', success => {
        page.renderBase64(format, quality).then(image => {
          page.close()
          let imageBuffer = new Buffer(image, 'base64')
          resolve(imageBuffer)
        }).catch(err => reject(err))
      })
      page.setContent(content, 'localhost')
    }).catch(err => reject(err))
  })
}

process.on('SIGINT', () => phInstance.kill())

module.exports = renderPage
