<template>
  <div ref="dragDiv" class="drag">
    <div class="drag_bg"></div>
    <div class="drag_text">{{ successStatus ? successTips : tips }}</div>
    <div ref="moveDiv" class="handler handler_bg" :class="{ 'handler_ok_bg': successStatus }"
         @touchstart="slideStart" @mousedown="slideStart"></div>
  </div>
</template>

<script>
export default {
  name: 'VerifySlider',
  props: {
    tips: {
      type: String,
      default: '请按住滑块，拖动到最后边'
    },
    successTips: {
      type: String,
      default: '验证通过'
    }
  },
  data () {
    return {
      config: {
        clientType: null,
        startEvent: null,
        moveEvent: null,
        endEvent: null,
        getClientX: null
      },
      successStatus: false,
      beginClientX: 0, /* 距离屏幕左端距离 */
      mouseMoveStatus: false, /* 触发拖动状态  判断 */
      maxWidth: '' /* 拖动最大宽度，依据滑块宽度算出来的 */
    }
  },
  created () {
    this.initConfig()
  },
  mounted () {
    this.maxWidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth
    this.init()
  },
  destroyed () {
    this.removeEvent()
  },
  methods: {
    slideStart (e) {
      if (this.successStatus) return
      e.preventDefault && e.preventDefault() // 阻止文字选中等 浏览器默认事件
      this.mouseMoveStatus = true
      this.beginClientX = this.config.getClientX(e)
    },
    slideMove (e) {
      if (!this.mouseMoveStatus) return
      const width = this.config.getClientX(e) - this.beginClientX
      if (width < 0) return
      if (width <= this.maxWidth) {
        this.$el.getElementsByClassName('handler')[0].style.left = width + 'px'
        this.$el.getElementsByClassName('drag_bg')[0].style.width = width + 'px'
      } else if (width > this.maxWidth) {
        this.successFunction()
      }
    },
    slideEnd (e) {
      this.mouseMoveStatus = false
      const width = this.config.getClientX(e) - this.beginClientX
      if (width < 0) return
      if (width < this.maxWidth) {
        this.$el.getElementsByClassName('handler')[0].style.left = 0 + 'px'
        this.$el.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px'
      }
    },
    successFunction () {
      this.successStatus = true
      this.$emit('success')
      this.removeEvent()
      document.getElementsByClassName('drag_text')[0].style.color = '#606266'
      document.getElementsByClassName('handler')[0].style.left = this.maxWidth + 'px'
      document.getElementsByClassName('drag_bg')[0].style.width = this.maxWidth + 'px'
    },
    getClientX (e) {
      if (this.config.clientType === 'mobile') {
        return e.changedTouches[0].clientX
      } else {
        return e.clientX
      }
    },
    initConfig () {
      this.config.clientType = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? 'mobile' : 'pc'
      if (this.config.clientType === 'mobile') {
        this.config.startEvent = 'touchstart'
        this.config.moveEvent = 'touchmove'
        this.config.endEvent = 'touchend'
        this.config.getClientX = e => e.changedTouches[0].clientX
      } else {
        this.config.startEvent = 'mousedown'
        this.config.moveEvent = 'mousemove'
        this.config.endEvent = 'mouseup'
        this.config.getClientX = e => e.clientX
      }
    },
    init () {
      this.removeEvent()
      document.getElementsByTagName('html')[0].addEventListener(this.config.moveEvent, this.slideMove)
      document.getElementsByTagName('html')[0].addEventListener(this.config.endEvent, this.slideEnd)
      this.successStatus = false
      this.beginClientX = 0
      this.mouseMoveStatus = false
      document.getElementsByClassName('drag_text')[0].style.color = ''
      document.getElementsByClassName('handler')[0].style.left = ''
      document.getElementsByClassName('drag_bg')[0].style.width = ''
    },
    removeEvent () {
      document.getElementsByTagName('html')[0].removeEventListener(this.config.moveEvent, this.slideMove)
      document.getElementsByTagName('html')[0].removeEventListener(this.config.endEvent, this.slideEnd)
    }
  }
}
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  .drag {
    position: relative;
    background-color: rgb(250, 250, 250);
    width: 290px;
    height: 40px;
    line-height: 38px;
    text-align: center;
    border-radius: 4px;
  }

  .handler {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    cursor: move;
  }

  .handler_bg {
    background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;
  }

  .handler_ok_bg {
    background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
  }

  .drag_bg {
    background-color: #E2F3D9;
    border: 1px solid #D4EDC6;
    border-right: 0;
    height: 40px;
    width: 0;
  }

  .drag_text {
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    position: absolute;
    top: 0;
    width: 100%;
    font-size: 14px;
    text-align: center;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
  }
</style>
