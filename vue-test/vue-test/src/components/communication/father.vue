<template>
    <div>
        <div>{{msg}}</div>
        <hr />
        <son v-on="$listeners"></son>
    </div>

</template>
<script>
export default {
    data() {
        return {
            msg: 'my is father'
        }
    },
    components: {
        son: () => import('./son')
    },
}
</script>