
<template>
    <div class="tree">
        <ul>
            <item :model="treeData"/>
        </ul>
        <pre v-highlightjs="tree"><code class="javascript"></code></pre>
    </div>
</template>

<script>
import tree from '!!raw-loader!@/components/tree/test.vue'

import item from './item';

export default {
    components: { item },
    data() {
        return {
            tree,
            treeData: {
                title: "Web全栈架构师",
                children: [
                {
                    title: "Java架构师"
                },
                {
                    title: "JS高级",
                    children: [
                    {
                        title: "ES6"
                    }
                    ]
                },
                {
                    title: "Web全栈",
                    children: [
                    {
                        title: "Vue训练营",
                        expand: true,
                        children: [
                        {
                            title: "组件化"
                        },
                        {
                            title: "源码",
                            children: [
                                {
                                    title: 'vux',
                                    children: [
                                        {
                                            title: 'state'
                                        },
                                        {
                                            title: 'mutation'
                                        }
                                        
                                    ]
                                },
                                {
                                    title: 'vue-router'
                                }
                                
                            ]
                        },
                        {
                            title: "docker部署"
                        }
                        ]
                    }
                    ]
                }
                ]
            }
        };
    }
};

</script>

<style>
li {
    list-style: none;
}
.javascript.hljs{
    text-align: left;
}
</style>
