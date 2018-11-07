## vue-verify-slider

基于 vue 2.x 的滑动验证组件，原生 js 实现、体积小。

<img src="https://github.com/zoux/vue-verify-slider/blob/master/screenshots/example.gif" />


## Use

```
npm i vue-verify-slider -S

import VueVerifySlider from 'vue-verify-slider'
components: {
  VueVerifySlider
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


## License

MIT
