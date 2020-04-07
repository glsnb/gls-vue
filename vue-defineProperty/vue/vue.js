class Vue {
    constructor(options) {
        this.options = options;

        // 数据响应式处理
        this.$data = options.data;
        this.observe(this.$data);
    }

    observe(value) {

        // 希望传进来的是对象
        if (!value || typeof value !== 'object') {
            return;
        }

        // 遍历data属性
        Object.keys(value).forEach(key => {
            this.defineReactive(value, key, value[key])
            // 代理，可以通过vm.xx访问data中的属性
            this.proxyData(key);
        })
    }

    defineReactive(obj, key, val) {
        // 递归
        this.observe(val);

        Object.defineProperty(obj, key, {
            get() {
                
                return val;
            },
            set(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
            }
        })
    }

    proxyData(key) {
        // 给Vue实例指定属性
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key];
            },
            set(newVal) {
                this.$data[key] = newVal;
            }
        })
    }
}