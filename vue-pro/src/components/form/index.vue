<template>
    <div>
        <Form :rules="rules" :model="model" ref="form">
            <!-- prop目的是找到当前的效验规则 -->
            <Item label="用户名" prop="username">
                <Input v-model="model.username" placeholder="请输入用户名" />
            </Item>
            <Item label="密码" prop="password">
                <Input v-model="model.password" placeholder="请输入密码" type="password"/>
            </Item>
            <Item>
                <button @click="onLogin">登录</button>
            </Item>
        </Form>
    </div>
</template>

<script>
import Input from './input';
import Item from './item';
import Form from './form';
import store from '@/store/store.js';

export default {
    components: {
        Input,
        Item,
        Form
    },
    data() {
        return {
            username: 'admin',
            model: {username: '', password: ''},
            rules: {
                username: [{required: true, message: "用户名必填"}],
                password: [{required: true, message: "密码格式不正确"}]
            }
        }
    },
    mounted() {
    },
    methods: {
        onLogin() {
            this.$refs.form.validate((isValid) => {
                console.log(isValid ? 'yes': 'no');
            })
            // 未登录，去登录
            // if (!store.state.user.token) {
            //     this.$store.dispatch('user/login', {username: this.username})
            //     .then(() => {
            //         this.$router.push({
            //             path: this.$route.query.redirect || '/'
            //         })
            //         console.log(this.$router);
            //     })
            // }
        }
    }
}
</script>

<style>
</style>
