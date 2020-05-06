<template>
    <div>
        <child2 />
        <child1
            :persion="persion"
        />
        <slot></slot>
    </div>
</template>

<script>
import child1 from './child1'
import child2 from './child2'

    export default {
        components: {
            child1,
            // child2: () => import('./child2')
            child2
        },
        provide() { // 可以隔代传参
            return {
                web: '全栈Web'
            }
        },
        mounted () {
            // 同步按dom顺序走。存在异步组件的时候，异步组件追加在后面
            // console.log(this.$children);
        },
        data() {
            return {
                persion: {
                    name: 'gls',
                    placeholder: '20'
                }
            }
        },
        methods: {
        },
    }
</script>

<style lang="scss" scoped>

</style>