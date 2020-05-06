<template>
    <div>
        <!-- label -->
        <label v-if="label">{{label}}</label>
        <!-- 插槽 -->
        <slot></slot>
        <!-- 错误提示 -->
        <p class="k-item-error" v-if="message">{{message}}</p>
        <!-- {{form.rules[prop]}} -->
    </div>
</template>

<script>
    import Schema from 'async-validator'
    import emitter from './emitter'

    export default {
        name: 'kItem',
        componentName: 'kItem',
        inject: ['form'],
        mixins: [emitter],
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: { // 锁定当前的效验规则
                type: String,
                default: ''
            }
        },
        data() {
            return {
                message: ''
            }
        },
        mounted () {
            this.$on('validate', () => {this.validate()});

            // 派发事件，通知k-form，新增一个k-item实例，之后在k-form中遍历所有实例的效验
            if (this.prop) {
                this.dispatch('kForm', 'form.addItem', [this])
            }
        },
        methods: {
            validate() {
                // 执行效验
                // 获取值和效验规则
                const rules = this.form.rules[this.prop]
                const value = this.form.model[this.prop]

                // 创建描述对象
                const descriptor = {[this.prop]: rules}
                // 创建检验器
                const validator = new Schema(descriptor)

                return validator.validate({[this.prop]:value}, error => {
                    if (error) {
                        this.message = error[0].message
                    } else {
                        this.message = ''
                    }
                })
            }
        },
    }
</script>

<style lang="scss">
.k-item-error {
    color: red
}
</style>