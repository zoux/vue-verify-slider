## vue-verify-slider

基于 vue 2.x 的滑动验证组件，原生 js 实现、体积小。

<img src="https://github.com/zoux/vue-verify-slider/blob/master/screenshots/example.gif" />


## Install

```bash
npm i vue-verify-slider -S
```


## Use

```javascript
// 在 main.js 中全量引入
import VerifySlider from 'vue-verify-slider'
Vue.use(VerifySlider)

// 在 main.js 中按需引入
import { VerifySlider } from 'vue-verify-slider'
Vue.use(VerifySlider)

// 在 .vue 文件中按需引入
import { VerifySlider } from 'vue-verify-slider'
components: {
  VerifySlider
}
```


## Feature

#### Attributes

|参数|说明|类型|默认值|
|:-|:-|:-|:-|
|tips|未完成滑动状态下的文案提示|String|请按住滑块，拖动到最后边|
|successTips|完成滑动状态下的文案提示|String|验证通过|


#### Events

|事件名称|说明|回调参数|
|:-|:-|:-|
|success|滑动成功时触发的事件|--|


#### Methods

通过 ref 可以获取到组件实例并调用实例上的方法

|事件名称|说明|回调参数|
|:-|:-|:-|
|init|重置组件状态|--|


## License

MIT
