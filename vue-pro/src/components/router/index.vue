<template>
    <div>
       router
       <router-link to="/router/home">首页</router-link>
       <router-link to="/router/detial">详情页</router-link>
       <router-view></router-view>
    </div>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style>
</style>
