<template>
  <div id="father">
      father
      <son ref='son' :name="sonName" @setSonName="setSonName" />
      <son ref='son' :name="sonName" @setSonName="setSonName" />
  </div>
</template>

<script>
import son from './son';

export default {
  name: 'father',
  components: {
      son
  },
  data() {
      return {
          sonName: '王小二'
      }
  },
  mounted() {
    // 获取子组件的数据
    //   const son = this.$refs.son.name;
    //   const son = this.$children[0].name;
    //   console.log('我是'+ son + '的巴巴');

    // 事件总线
    // this.$bus.$on('say', () => {
    //     console.log('你好');
    // });

    //   this.$on('say', () => {
    //       console.log('你好');
    //   })
        
        // this.$parent.$on('say', () => {
        //     console.log('你好');
        // });
  },
  methods: {
      setSonName() {
          this.sonName = '王小三';
      }
  }
}
</script>

<style>
</style>
