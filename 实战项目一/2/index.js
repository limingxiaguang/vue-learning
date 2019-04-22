var vm = new Vue({
    el: '#app',
    data() {
        return {
            checkedAll: false,
            list: [
                {
                    id: 1,
                    name: 'iPhone 7',
                    price: 6188,
                    count: 1,
                    checked: true
                },
                {
                    id: 2,
                    name: 'iPad Pro',
                    price: 5888,
                    count: 1,
                    checked: false
                },
                {
                    id: 3,
                    name: 'MacBook Pro',
                    price: 21488,
                    count: 2,
                    checked: true
                }
            ]
        }
    },
    computed: {
        totalPrice:function() {
            var total = 0
            checkedNum = 0
            for(var i = 0; i < this.list.length; i++){
                var item = this.list[i]
                if(item.checked) {
                    total += item.price * item.count
                    checkedNum++
                }
            }
            if(this.list.length === checkedNum) {
                this.checkedAll = true
            }else{
                this.checkedAll = false
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
        },
        checkedAllBox(){
           
                for(var i = 0; i < this.list.length; i++){
                    var item = this.list[i]
                    if(!this.checkedAll){
                    item.checked = true
                    }else{
                        item.checked = false
                    }
                }
            }
        }
    
    
})