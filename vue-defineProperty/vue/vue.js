class Vue {
    constructor(options) {
        // 保存options
        this.options = options;

        // 数据响应式处理
        this.$data = options.data;
        this.observe(this.$data);

        // 测试:没有编译器
        // new Watcher(this, 'test')
        // this.test = '12'

        // 创建编译器
        new Compile(options.el, this);
        // created声明周期钩子
        if (options.created) {
            options.created.call(this);
        }
    }

    // 遍历数据
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

    // 数据劫持
    defineReactive(obj, key, val) {
        // 递归
        this.observe(val);

        const dep = new Dep();

        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addDep(Dep.target)
                return val;
            },
            set(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // console.log(`${val}更新了`);
                // 触发依赖收集
                dep.notify();
            }
        })
    }

    // 代理使通过vm.xx访问
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

// 管理若干watcher实例，和data中的数据是一对一的关系
class Dep {
    constructor() {
        this.watchers = []
    }
    
    // 向deps增加watcher实例
    addDep(watcher) {
        this.watchers.push(watcher);
    }

    // 通知变更
    notify() {
        this.watchers.forEach(watcher => watcher.update());
    }
}

// 监听器，watcher和数据是一对一的关系
class Watcher {
    // vm是vue实例
    // key是data中的一个属性
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        Dep.target = this;
        this.vm[this.key];
        Dep.target = null;
    }

    update() {
        // console.log(this.key+'更新了');
        this.cb.call(this.vm, this.vm[this.key])
    }
}