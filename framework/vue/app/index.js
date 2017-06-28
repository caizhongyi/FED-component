/**
 * Created by Administrator on 2016/1/27.
 */
var Vue = require('vue')
var VueRouter = require('vue-router')

Vue.use(VueRouter)

var router = new VueRouter()

var App = Vue.extend({})
// ����·�ɹ���
// ÿ��·�ɹ���Ӧ��ӳ�䵽һ�����������ġ������������һ��ʹ�� Vue.extend
// ������������캯����Ҳ������һ�����ѡ�����
// �Ժ����ǻὲ��Ƕ��·��
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

// �������ǿ�������Ӧ���ˣ�
// ·�����ᴴ��һ�� App ʵ�������ҹ��ص�ѡ��� #app ƥ���Ԫ���ϡ�
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