<template>
  <div id="app">
    <VerifySlider ref="VerifySlider" @success="successHandler" />
    <p>{{ successMsg }}</p>
    <button @click="init">重置状态</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      successMsg: ''
    }
  },
  methods: {
    successHandler () {
      this.successMsg = '验证成功回调'
    },
    init () {
      this.$refs.VerifySlider.init()
    }
  }
}
</script>
