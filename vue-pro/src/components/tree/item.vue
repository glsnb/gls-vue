
<template>
    <li class="tree">
        tree-li
        <div @click="toggle">
            {{model.title}}
            <span v-if="isFolder" class="extend">{{open ? '-' : '+'}}</span>
        </div>
        <!-- 递归子Item -->
        <ul v-if="isFolder" v-show="open">
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
            default: {}
        }
    },
    data() {
        return {
            open: false
        };
    },
    computed: {
        isFolder() {
            return this.model.children &&  this.model.children.length;
        }
    },
    methods: {
        toggle() {
            if (this.isFolder) {
                this.open = !this.open;
            }
        }
    }
};

</script>

<style scoped>
.extend {
    display: inline-block;
    width: 50px;
    background: #ccc;
}
</style>
