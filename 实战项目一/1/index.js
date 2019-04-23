var vm = new Vue({
    el: '#app',
    data() {
        return {
            list: [
                {
                    id: 1,
                    name: 'iPhone 7',
                    price: 6188,
                    count: 1
                },
                {
                    id: 2,
                    name: 'iPad Pro',
                    price: 5888,
                    count: 1
                },
                {
                    id: 3,
                    name: 'MacBook Pro',
                    price: 21488,
                    count: 2
                }
            ]
        }
    },
    computed: {
        // 计算总的价格
        totalPrice:function() {
            var total = 0
            // 循环遍历出list里面的所有商品
            for(var i = 0; i < this.list.length; i++){
                var item = this.list[i]
                total += item.price * item.count
            }
            // 价格每三位用 ',' 隔开
            return total.toString().replace(/\B(?=(\d{3})+$)/g,',')
        }
    },
    methods: {
        handelReduce(index){
            // 判断该商品的数量是否为1，为一就return掉
            if(this.list[index].count === 1) return;
            // 数量减一
            this.list[index].count--;
        },
        handelAdd(index){
            // 数量加1
            this.list[index].count++;
        },
        handelRemove(index){
            // 删除list数组中该下标的元素
            this.list.splice(index, 1)
        }
    }
})