// 数据响应式

function observe (obj) {
    if (typeof obj !== 'object' || obj === null) {
        return;
    }
    // Object.keys(obj).forEach(key => defineActive(obj, key, obj[key]))

    // 响应式
    new Observer(obj)
}

function defineActive (obj, key, value) {
    observe(value) // 递归

    // 创建Dep实例，他和key一对一对应关系
    const dep = new Dep()

    Object.defineProperty(obj, key, {
        get: function() {
            // console.log('get', key);

            // Dep.target实际上就是watcher
            Dep.target && dep.addDep(Dep.target)
            return value
        },
        set: function(newValue) {
            if (value !== newValue) {
                // console.log('set', key);
                observe(newValue)
                value = newValue

                // 通知更新
                dep.notify()
            }
        }
    })
}

// Observer: 辨别当前对象类型是纯对象还是数组，从而做不同响应式操作

class Observer {
    constructor(value) {
        if (Array.isArray(value)) {
            // 数组的响应式
        } else {
           this.walk(value)
        }
    }
    walk(obj) {
        Object.keys(obj).forEach(key => defineActive(obj, key, obj[key]))
    }
}

// kVue实例

class kVue {
    constructor(options) {
        this.$options = options;
        this.$data = options.data;

        observe(this.$data)
        // 代理this.$data到实例上
        this.proxy()
        
        // 执行编译
        new Compile(options.el, this)
    }
    // 代理
    proxy() {
        Object.keys(this.$data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return this.$data[key]
                },
                set(newValue) {
                    if (this.$data[key] !== newValue) {
                        this.$data[key] = newValue
                    }

                }
            })
            this[key] = this.$data[key]
        })
    }
}

// Compile更新函数
class Compile {
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = document.querySelector(el)

        // 执行编译
        this.compile(this.$el)
    }

    // 遍历该根节点
    compile(el) {
        el.childNodes.forEach(node => {
            // 判断类型
            // 元素节点,判断特殊属性
            if (node.nodeType === 1) {
                // console.log('元素节点', node.nodeName);
                // 编译元素
                this.compileElement(node)
            }
            else if (this.isText(node)) {
                // console.log('差值文本', node.textContent);
                this.compileText(node)
            }
            // 递归子节点
            if (node.childNodes) {
                this.compile(node)
            }
        })
        
    }

    // 差值文本节点
    isText(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    // 差值文本编译
    compileText(node) {
        this.update(node, RegExp.$1, 'text')
    }

    update(node, exp, dir) {
        const fn = this[dir + 'Updater']
        // 初始化
        fn && fn(node, this.$vm[exp])

        // 创建watcher
        new Watcher(this.$vm, exp, val => {
            fn && fn(node, val)
        })
    }

    // dom更新方法
    textUpdater(node, value) {
        node.textContent = value
    }
    htmlUpdater(node, value) {
        node.innerHTML = value
    }
    modelUpdater(node, value) {
        // input元素双绑
        node.value = value
    }

    // 编译元素
    compileElement(node) {
        // 判断属性
        const attr = node.attributes

        Array.from(attr).forEach(key => {
            // attr {name: 'k-text', value: 'counter'}
            const {name, value} = key
            // 判断是不是指令
            if (name.indexOf('k-') === 0) {
                const dir = name.substring(2)
                this[dir] && this[dir](node, value)
            }
        })
    }

    // k-text文本更新
    text(node, value) {
        this.update(node, value, 'text')
    }

    // k-html
    html(node, value) {
        this.update(node, value, 'html')
    }

    // k-model => 语法糖，value和事件
    model(node, value) {
        // update方法只完成赋值和更新
        this.update(node, value, 'model')
        // 事件监听
        node.addEventListener('input', e => {
            this.$vm[value] = e.target.value
        })
    }
}

// watcher 管理依赖，执行更新
class Watcher {
    // vm是KVue实例
    // key是data中对应的key名称
    // fn是更新函数，他知道怎么更新dom
    constructor(vm, key, fn) {
        this.vm = vm;
        this.key = key;
        this.fn = fn;

        // 建立dep和watcher之间的关系
        Dep.target = this
        this.vm[this.key] // 触发getter函数
        Dep.target = null
    }

    // update 函数，Dep调用
    update() { // 更新函数调用，设置上下文访问KVue实例，传参是当前最新值
        this.fn.call(this.vm, this.vm[this.key])
    }
}

// Dep 管理多个watcher，key发生变化，通知他们更新
class Dep {
    constructor() {
        this.deps = []
    }
    addDep(watcher) {
        this.deps.push(watcher)
    }
    // 通知更新
    notify() {
        this.deps.forEach(watcher => watcher.update())
    }
}