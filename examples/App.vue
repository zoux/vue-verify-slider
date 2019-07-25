<template>
  <div id="app">
    <VerifySlider @success="successHandler" />
    <p>{{ successMsg }}</p>
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
    }
  }
}
</script>
