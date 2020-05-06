<template>
    <div>
        <input :value="value" :type="type" @input="keyDown" v-bind="$attrs" />
    </div>
</template>

<script>
    export default {
        inheritAttrs: false, // 去掉div上非prop特性
        props: {
            value: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            }
        },
        methods: {
            keyDown(e) {
                this.$emit('input', e.target.value)
                // 值发生变化需要做效验，用$parent派发如果父组件不是item就会有问题
                // this.$parent.$emit('validate')

                // 找到对应的父亲，派发事件
                this.dispatch('kItem', 'validate');

            },
            // 查询该组件的父组件，派发事件
            dispatch(componentName, eventName, params) {
                var parent = this.$parent || this.$root;
                var name = parent.$options.componentName;
                
                while (parent && (!name || name !== componentName)) {
                    parent = parent.$parent;
            
                    if (parent) {
                        name = parent.$options.componentName;
                    }
                }
                if (parent) {
                    parent.$emit.apply(parent, [eventName].concat(params));
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>