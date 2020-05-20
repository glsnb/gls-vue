<template>
    <div>
        <i-code slot="code" lang="html">{{ code }}</i-code>
    </div>
</template>
<script>
import iCode from './index';

export default {
    components: {
        iCode
    },
    data() {
        return {
            code: `<div>
                <i-code slot="code" lang="html">{{ code }}</i-code>
            </div>`
        }
    }
}
</script>