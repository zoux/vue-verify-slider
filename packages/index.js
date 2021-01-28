import VerifySlider from './VerifySlider'

const components = [
  VerifySlider
]

function install (app) {
  if (install.installed) return
  install.installed = true

  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default {
  install
}

export {
  VerifySlider
}
