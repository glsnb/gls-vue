<template>
  <div class="k-toast" :class="toastClasses">
    <div class="toast" ref="toast">
      <div class="message">
        <slot v-if="!enableHtml"></slot>
        <div v-else v-html="$slots.default[0]"></div>
      </div>
      <div class="line" ref="line"></div>
      <span class="close" v-if="closeButton" @click="onClickClose">
        {{closeButton.text}}
      </span>
    </div>
  </div>
</template>
<script>

  //构造组件的选项
  export default {
    name: 'kToast',
    props: {
      autoClose: {
        type: [Boolean, Number],
        default: 5,
        validator (value) {
          return value === false || typeof value === 'number';
        }
      },
      closeButton: {
        type: Object,
        default () {
          return {
            text: '关闭', callback: undefined
          }
        }
      },
      enableHtml: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: 'top',
        validator (value) {
          return ['top', 'bottom', 'middle'].indexOf(value) >= 0
        }
      }
    },
    mounted () {
      this.updateStyles()
      this.execAutoClose()
    },
    computed: {
      toastClasses () {
        return {
          [`position-${this.position}`]: true
        }
      }
    },
    methods: {
      updateStyles () {
        this.$nextTick(() => {
          this.$refs.line.style.height =
            `${this.$refs.toast.getBoundingClientRect().height}px`
        })
      },
      execAutoClose () {
        if (this.autoClose) {
          setTimeout(() => {
            this.close()
          }, this.autoClose * 1000)
        }
      },
      close () {
        this.$el.remove()
        this.$emit('close')
        this.$destroy()
      },
      onClickClose () {
        this.close()
        if (this.closeButton && typeof this.closeButton.callback === 'function') {
          this.closeButton.callback(this)//this === toast实例
        }
      }
    }
  }
</script>
<style scoped>
</style>
