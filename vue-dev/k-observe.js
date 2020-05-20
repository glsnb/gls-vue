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
    // 对象的情况，需要遍历
    Object.keys(obj).forEach(key => defineActive(obj, key, obj[key]))

}

function $set(obj, key, val) {
    defineActive(obj, key, val)
}
