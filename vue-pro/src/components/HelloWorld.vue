
<template>
    <div class="hello">
        <h1>{{ msg }}-{{ count }}</h1>
        <p>已投炸弹数-{{ rest }}</p>
        <button @click="throwBomb">开始扔了</button>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

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
    },
    methods: {
        calculation() { // 加减乘除依次计算
            new Promise(function resolve(success, error) {
                setTimeout(function () {
                    success(10 + 10);
                    error('还在继续加');
                }, 500);
            }).then(function (resolve) {
                console.log(resolve, '加法');
                new Promise(function (success, error) {
                    setTimeout(function () {
                        success(resolve - resolve / 2);
                        error('还在继续减');
                    }, 500);
                }).then(function (resolve) {
                    console.log(resolve, '减法');
                    new Promise(function (success, error) {
                        setTimeout(function () {
                            success(resolve * resolve);
                            error('还在继续乘');
                        }, 500);
                    }).then(function (resolve) {
                            console.log(resolve);
                            new Promise(function (success, error) {
                                setTimeout(function () {
                                    success(resolve / resolve / 2);
                                    error('还在继续除');
                                }, 500);
                            }).then(function (resolve) {
                                console.log(resolve);
                            });
                    });
                });
            });
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

<style scoped>
</style>
