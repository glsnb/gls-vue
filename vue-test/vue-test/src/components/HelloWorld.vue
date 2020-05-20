<template>
  <div class="hello">
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
    </p>
    <father></father>
    <pre v-highlightjs="fatherCode"><code class="javascript"></code></pre>
  </div>
</template>

<script>
import father  from '@/components/communication/father'
import fatherCode from '!!raw-loader!@/components/communication/father'

export default {
  name: 'HelloWorld',
  components: {
    father
  },
  data() {
    return {
      fatherCode
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.javascript.hljs{
  text-align: left;
}
</style>
