<template>
  <div id="app">
    <VueVerifySlider @success="successHandler" />
    <p>{{ successMsg }}</p>
  </div>
</template>

<script>
import VueVerifySlider from './VueVerifySlider'
export default {
  components: {
    VueVerifySlider
  },
  data () {
    return {
      successMsg: ''
    }
  },
  methods: {
    successHandler () {
      this.successMsg = '验证成功回调'
    }
  }
}
</script>
