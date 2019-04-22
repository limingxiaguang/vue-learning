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
        totalPrice:function() {
            var total = 0
            for(var i = 0; i < this.list.length; i++){
                var item = this.list[i]
                total += item.price * item.count
            }
            return total.toString().replace(/\B(?=(\d{3})+$)/g,',')
        }
    },
    methods: {
        handelReduce(index){
            if(this.list[index].count === 1) return;
            this.list[index].count--;
        },
        handelAdd(index){
            this.list[index].count++;
        },
        handelRemove(index){
            this.list.splice(index, 1)
        }
    }
})