<template>
  <div id="slots">
      <noName>
        <template>匿名插槽</template>
        <template v-slot:content>具名插槽</template>
        <template v-slot:footer="slotProps">作用域插槽-{{slotProps.foo}}</template>
      </noName>
  </div>
</template>

<script>
import noName from './noName';

export default {
    name: 'slots',
    components: {
        noName
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style>
</style>
