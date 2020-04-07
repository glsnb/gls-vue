<template>
  <div>
      <input :type="type" :value="value" @input="change" v-bind="$attrs" />
  </div>
</template>

<script>

export default {
    components: {
    },
    // props: ['value', 'type'],
    props: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default() {
                return 'text';
            }
        }
    },
    data() {
        return {
            // 1.双绑
            // 2.通知校验
            inheritAttrs: false,
        }
    },
    mounted() {
        // console.log(this.$attrs);
    },
    methods: {
        change(e) {
            this.$emit('input', e.target.value);
            // 通知校验
            this.$parent.$emit('validate')
        },
    }
}
</script>

<style>
</style>
