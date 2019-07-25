import VerifySlider from './VerifySlider'

const components = [
  VerifySlider
]

function install (Vue) {
  if (install.installed) return
  install.installed = true

  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

//  全局引用可自动安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}

export {
  VerifySlider
}
