<template>
  <div id="noName">
      <slot></slot>
      <slot name="content"></slot>
      <slot name="footer" foo="foo"></slot>
  </div>
</template>

<script>

export default {
    name: 'noName',
    components: {
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style>
</style>
