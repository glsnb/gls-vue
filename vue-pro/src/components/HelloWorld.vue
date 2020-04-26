
<template>
    <div class="hello">
        <h1>{{ msg }}-{{ count }}</h1>
        <p>已投炸弹数-{{ rest }}</p>
        <button @click="throwBomb">开始扔了</button>
        <button @click="$toast('点击弹出提示')">弹窗toast</button>
        <button @click="$glsToast('1', '2')">工资日</button>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import plugin from '@/components/toast/plugin';
import Vue from 'vue'

import testPlugin from '@/components/toast/testPlugin'
Vue.use(testPlugin);

Vue.use(plugin);

export default {
    data() {
        return {
            msg: '一共有多少个炸弹💣'
        };
    },
    computed: {
        count() {
            return this.$store.state.count;
        },
        rest() {
            return this.$store.getters.rest;
        }
        // ...mapState(['count']),
        // 直接用getters名字
        // ...mapGetters(['rest'])

        // 起别名
        // ...mapGetters({
        //     rest: 'rest'
        // })
    },
    mounted() {
        // let request = ajax('GET', '/act/api/fucai/getMyToplistWx');
        // setTimeout(() => {
        //     console.log(request);
        // }, 1000);

        // promise();

        // new Promise(test).then(function (resolve) {
        //     console.log('success' + resolve);
        // }).catch(function (reject) {
        //     console.log('error' + reject);
        // });
        // this.add();
        // console.log('虽然我在后面，但我先执行了');
        const persion = this.simpleDog('gg', '18')
        console.log(persion.name);
        const per = this.simpleDog('ww', '18')
        console.log(per === persion);
        
        
    },
    methods: {
        simpleDog(name, age) {
            const me = {
                name,
                age
            }
            return me;
        },
        async add() {
            let resolute = await this.timer();
            let resolute2 = await this.timer2();
            console.log(resolute, resolute2);
            
        },
        timer() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('1000');
                    resolve(1000)
                }, 1000)
            })
            
        },
        timer2() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('800');
                    resolve(800)
                }, 800)
            })
        },
        throwBomb() {
            // this.$store.commit('reduce');
            this.$store.dispatch('boomReduce');
        }
    }
};
function ajax(methods, url) {
    let xml;
    if (window.XMLHttpRequest) {
        xml = new XMLHttpRequest;
    } else {
        xml = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xml.onreadystatechange = function () {
        if (xml.readyState === 4) {
            if (xml.status === 200) {
                console.log('请求成功了！！！');
                return xml.responseText;
            } else {
                return xml.status;
            }
        } else {
            console.log('请求还在继续');
        }
    };
    xml.open(methods, url);
    xml.send();
}
function test(a, b) {
    let month = Math.random() * 10;
    setTimeout(function () {
        if (month > 9) {
            a('优秀');
        } else {
            b('继续加油');
        }
    }, 1000);

}
function promise() {
    let pro = new Promise(test);
    let pro2 = pro.then(function (resolve) {
        console.log('成功' + resolve);
    });
    let pro3 = pro2.catch(function (reject) {
        console.log('失败' + reject);
    });
}
</script>

<style>
</style>
