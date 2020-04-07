<template>
  <div>
      <label>{{label}}</label>
      <slot></slot>
      <!-- 校验信息 -->
      <p v-if="errMsg">{{errMsg}}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'

export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String,
            default: ''
        }
    },
    inject: ['form'],
    data() {
        return {
            errMsg: ''
        }
    },
    mounted() {
        // 做单项效验
        this.$on('validate', () => {
            this.validate()
        })
    },
    methods: {
        validate() {
            // 1.获取值和校验规则
            const rules = this.form.rules[this.prop];
            const value = this.form.model[this.prop];
            // 2.创建Schema实例 {username: rules}
            const schema = new Schema({[this.prop]: rules})
            // 3.执行校验，校验对象,回调函数
            // validate返回校验结果Promise
            return schema.validate({[this.prop]: value}, (errors) => {
                if (errors) {
                    // 显示错误
                    this.errMsg = errors[0].message;
                } else {
                    this.errMsg = '' 
                }
            })
        }
    }
}
</script>

<style>
</style>
