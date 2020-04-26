<template>
    <div v-if="isShow">
        <h6>{{title}}</h6>
        <p>{{msg}}</p>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '发工资了'
        },
        msg: {
            type: String,
            default() {
                return '去班花歹饭喽'
            }
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        onShow() {
            this.isShow = true;
            setTimeout(this.onHide, 1000)
        },
        onHide() {
            
            this.isShow = false;
        }
    }
}
</script>