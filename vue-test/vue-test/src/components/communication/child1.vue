<template>
    <div>
        child1_{{$attrs.persion.name}}
        <button @click="handleCick">$parent/$root派发</button>
        <!-- 展开$attrs对象 -->
        <input v-bind="$attrs.persion"/>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        methods: {
            handleCick() {
                // this.$bus.$emit('event-child1', 'child1')
                this.$parent.$emit('event-child1', 'child1')
                // this.$root.$emit('event-child1', 'child1')
            }
        },
    }
</script>

<style lang="scss">

</style>