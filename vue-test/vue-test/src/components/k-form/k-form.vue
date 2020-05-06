<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>

    export default {
        name: 'kForm',
        componentName: 'kForm',
        provide() {
            return {
                form: this
            }
        },
        props: {
            model: {
                type: Object,
                required: true,
                default() {
                    return {}
                }
            },
            rules: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        created () {
            this.items = []
            this.$on('form.addItem', item => this.items.push(item));
        },
        methods: {
            validate(cb) {
                // const tasks = this.$children
                //     .filter(item => item.prop)
                //     .map(item => item.validate())
                const tasks = this.items.map(item => item.validate())
                // 统一判断
                Promise.all(tasks)
                    .then(() => cb(true))
                    .catch(() => cb(false))
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>