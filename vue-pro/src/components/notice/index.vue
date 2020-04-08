
<template>
    <div>
        <button @click="toast">弹tost</button>
    </div>
</template>

<script>
import Notice from './notice';
import create from './create';

export default {
    data() {
        return {
        };
    },
    methods: {
        toast() {
            const notice = create(Notice, {
                title: '12',
                message: '34'
            })
            notice.on();
            setTimeout(() => {
                notice.hide();
            }, 2000)
        }
    }
};

</script>

<style>
</style>
