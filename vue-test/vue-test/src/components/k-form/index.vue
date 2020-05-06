<template>
    <div>
        <kForm :model="model" :rules="rules" ref="form">
            <kItem label="用户名" prop="username">
                <!-- kInput放在slot中 -->
                <kInput placeholder="请输入用户名" v-model="model.username"></kInput>
            </kItem>
            <kItem label="密码" prop="userpasspord">
                <kInput placeholder="请输入密码" v-model="model.userpasspord" type="password"></kInput>
            </kItem>
            <kItem>
                <button @click="onLogin">Login</button>
            </kItem>
        </kForm>
    </div>
</template>

<script>
    import kForm from './k-form'
    import kItem from './k-item'
    import kInput from './k-input'

    export default {
        components: {
            kForm,
            kItem,
            kInput
        },
        data() {
            return {
                model: {
                    username: '',
                    userpasspord: ''
                },
                rules: {
                    username: [
                        {
                            required: true,
                            message: '用户名为必填项'
                        }
                    ],
                    userpasspord: [
                        {
                            required: true,
                            message: '密码为必填项'
                        }
                    ]
                }
            }
        },
        methods: {
            onLogin() {
                this.$refs.form.validate((valid) => {
                    // if(valid) {
                    //     alert('校验成功，登录！')
                    // } else {
                    //     alert('校验失败，请重试！')
                    // }
                    this.$notice({
                        title: '村长喊你来搬砖',
                        message: valid ? '校验成功，登录！' : '校验失败，请重试！'
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>