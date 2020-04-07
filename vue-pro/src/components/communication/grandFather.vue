<template>
  <div id="grandFather">
      grandFather
      <father />
  </div>
</template>

<script>
import father from './father';

export default {
  name: 'grandFather',
  components: {
      father
  },
  provide() {
      return {
          grandson: '小王八'
      }
  }
}
</script>

<style>
</style>
