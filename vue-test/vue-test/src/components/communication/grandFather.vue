<template>
  <div>grandFather
    {{count}}-<button @click="$store.commit('addCount')">增长</button>-
    <button @click="$store.dispatch('addCount')">异步增长</button>
    购车预算-{{carMoney}}
    <router-link to="/communication/son">大儿子</router-link>
  </div>
</template>

<script>

export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
    carMoney() {
      return this.$store.getters.carMoney;
    }
  },
  components: {
  }
}
</script>

<style>
</style>
