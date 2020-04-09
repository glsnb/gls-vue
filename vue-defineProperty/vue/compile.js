class Compile {
    // el是宿主元素选择器
    // vm是vue实例
    constructor(el, vm) {
        this.$vm = vm;

        this.$el = document.querySelector(el);

        // 先把模板移动到fragment标签中，更新文成后在追加回来。
        this.$fragment = this.nodeFragment(this.$el);
        // 执行编译
        this.compile(this.$fragment);

        // 追加
        this.$el.appendChild(this.$fragment);
    }

    nodeFragment(el) {
        let fragment = document.createDocumentFragment();
        let child;
        while(child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;

    }

    compile(el) {
        const childNodes = el.childNodes;
        
        Array.from(childNodes).forEach(node => {
            
            // 判断元素类型，文本节点，元素节点
            if (node.nodeType == 1) { // 元素节点
                // console.log('元素节点：'+node.nodeName);
                this.compileElement(node);

            } else if (this.isInter(node)) { // 差值表达式
                
                // console.log('插值文本：'+node.textContent);
                this.compileText(node);
            }

            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node);
            }
        })

    }

    // 文本节点且是差值表达式{{xxx}}
    isInter(node) {
        // console.log(node)
        return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }

    compileText(node) {
        const exp = RegExp.$1;
        this.update(node, exp, 'text');
    }

    update(node, exp, type) {
        // 获取指定类型的更新函数
        let updator = this[type + 'Updator']

        updator && updator(node, this.$vm[exp]);

        new Watcher(this.$vm, exp, function(value) {
            updator && updator(node, value);
        })
    }

    textUpdator(node, value) {
        node.textContent = value;
    }

    // 编译元素节点
    compileElement(node) {
        // 遍历所有属性
        const nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(attr => {
            // 规定：指令以k-xxx="yyy"命名
            const attrName = attr.name; // 属性名称 k-xxx
            const exp = attr.value; // 属性值 yyy

            if (attrName.indexOf('k-') == 0) {
                const dir = attrName.substring(2); // xxx
                this[dir] && this[dir](node, exp);
            }
        })
    }

    // k-text
    text(node, exp) {
        this.update(node, exp, 'text')
    }
    
    // k-html
    html(node, exp) {
        this.update(node, exp, 'html')
    }

    htmlUpdator(node, value) {
        node.innerHTML = value;
    }

    model(node, exp) {
        this.update(node, exp, 'model');

        node.addEventListener('input', e => {
            this.$vm[exp] = e.target.value;
        })
    }

    modelUpdator(node, value) {
        node.value = value;
    }
}