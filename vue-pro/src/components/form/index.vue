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

export default {
    components: {
        Input,
        Item,
        Form
    },
    data() {
        return {
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
        }
    }
}
</script>

<style>
</style>
