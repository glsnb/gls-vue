<template>
  <div id="son">
      {{name}}-爷爷叫我-{{grandson}}
      <button @click="send"> 改我名字 </button>
      <button @click="brother"> 兄弟你好 </button>
  </div>
</template>

<script>

export default {
    name: 'son',
    props: ['name'], // 父组件给子组件传数据，子组件通过props接受
    inject: ['grandson'],
    mounted() {
        this.$parent.$on('sendBrother', () => {
            console.log('你好');
        });
    },
    methods: {
        brother() {
            // 事件总线
            // this.$bus.$emit('say');

            this.$parent.$emit('sendBrother');
        },
        send() {
            this.$emit('setSonName');
        }
    }
}
</script>

<style>
</style>
