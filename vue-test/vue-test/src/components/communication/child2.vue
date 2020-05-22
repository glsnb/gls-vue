<template>
    <div>
        child2-{{web}}
        
    </div>
</template>

<script>
    export default {
        inject: ['web'],
        mounted () {
            // this.$bus.$on('event-child1', (msg) => {
            //     console.log(msg + '告诉我了');
            // });
            this.$parent.$on('event-child1', (msg) => {
                console.log(msg + '告诉我了');
            });
            // this.$root.$on('event-child1', (msg) => {
            //     console.log(msg + '告诉我了');
            // });
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>

</style>