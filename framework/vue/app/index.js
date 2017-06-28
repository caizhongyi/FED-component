/**
 * Created by Administrator on 2016/1/27.
 */
var Vue = require('vue')
var VueRouter = require('vue-router')

Vue.use(VueRouter)

var router = new VueRouter()

var App = Vue.extend({})
// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map({
    '/foo/:param': {
        name : 'foo',
        component: Vue.extend({ template : './app/foo/index.html' })
    },
    '/bar': {
        name : 'bar',
        component:  require('./app/bar/bar.vue')
    }
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, 'body');

console.log(Vue)


new Vue({
    el : 'body',
    data : {

    }
})

module.exports = {
    demo : 'demo'
}