// 1. 数据响应式

function defineActive(obj, key, value) {
    observe(value)
    Object.defineProperty(obj, key, {
        get: function() {
            console.log('get', value);
            return value
        },
        set: function(newVal) {
            if(newVal !== value) {
                observe(newVal)
                value = newVal;
                console.log('set', newVal);
                // 更新函数，操作dom
                updata()
            }
            
        }
    })
}

function observe(obj) {
    

    if(typeof obj !== 'object' || obj === null) {
        return 
    }
    
    if (Array.isArray(obj)) {
        // 覆盖原型，替换7个变更方法
        obj.__proto__ = arrayProto
        // 对数组内部元素执行响应式
        for (let index = 0; index < obj.length; index++) {
            observe(obj[index])
        }
    }
    else {
        // 对象的情况，需要遍历
        Object.keys(obj).forEach(key => defineActive(obj, key, obj[key]))
    }
    
}

function $set(obj, key, val) {
    defineActive(obj, key, val)
}

const orginalProto = Array.prototype;
const arrayProto = Object.create(orginalProto);
['push', 'pop', 'shift', 'unshift'].forEach(method => {
    arrayProto[method] = function() {
        orginalProto[method].apply(this, arguments)

        console.log('数组执行' + method + '操作' + arguments);
        
    }
})