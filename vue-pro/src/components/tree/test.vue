
<template>
    <li class="tree">
        {{model.title}}
        <ul v-if="model.children && model.children.length">
            <item v-for="model in model.children" :model="model" :key="model.title"></item>
        </ul>
    </li>
</template>

<script>

export default {
    name: 'Item',
    props: {
        model: {
            type: Object,
            default() {
                return {
                    title: '全栈',
                    children: [
                        {
                            title: 'vue',
                            children: [
                                {
                                    title: 'vnode'
                                },
                                {
                                    title: '响应式'
                                }
                            ]
                        },
                        {
                            title: 'node'
                        }
                    ]
                }
            }
        }
    }
};

</script>

<style scoped>
</style>
