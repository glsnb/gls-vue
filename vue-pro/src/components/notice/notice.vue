
<template>
    <div class="notice" v-if="show">
        <h2>{{title}}</h2>
        <p>{{message}}</p>
    </div>
</template>

<script>

export default {
    props: {
        title: {
            type: String,
            default: '11'
        },
        message: {
            type: String,
            default: '22'
        }
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        on() {
            this.show = true;
        },
        hide() {
            this.show = false;
            this.remove();
        }
    }
};

</script>

<style>
.notice {
  position: fixed;
  width: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  background-color: #fff;
  border: blue 3px solid;
  box-sizing: border-box;
}
</style>
