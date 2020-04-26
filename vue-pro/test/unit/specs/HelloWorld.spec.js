import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

// 测试套件
describe('HelloWorld.vue', () => {
  // 测试用例多个it 
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
    
  })
})
