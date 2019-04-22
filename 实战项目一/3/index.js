var vm = new Vue({
  el: "#app",
  data() {
    return {
      checkedAll: false,
      list: [
        [
          {
            id: 101,
            name: "iPhone 7",
            price: 6188,
            count: 1,
            checked: true
          },
          {
            id: 102,
            name: "iPad Pro",
            price: 5888,
            count: 1,
            checked: false
          },
          {
            id: 103,
            name: "MacBook Pro",
            price: 21488,
            count: 2,
            checked: true
          }
        ],
        [
          {
            id: 201,
            name: "苹果",
            price: 5,
            count: 1,
            checked: true
          },
          {
            id: 202,
            name: "梨子",
            price: 4,
            count: 1,
            checked: false
          },
          {
            id: 203,
            name: "青菜",
            price: 6,
            count: 2,
            checked: true
          }
        ]
      ]
    };
  },
  computed: {
    // totalPrice:function() {
    //     var total = 0
    //     checkedNum = 0
    //     for(var i = 0; i < this.list.length; i++){
    //         var item = this.list[i]
    //         if(item.checked) {
    //             total += item.price * item.count
    //             checkedNum++
    //         }
    //     }
    //     if(this.list.length === checkedNum) {
    //         this.checkedAll = true
    //     }else{
    //         this.checkedAll = false
    //     }
    //     return total.toString().replace(/\B(?=(\d{3})+$)/g,',')
    // }
    totalPrice: function() {
      var total = 0
      var totalNum = 0
      var checkedNum = 0
      for (var i = 0; i < this.list.length; i++) {
        var items = this.list[i];
        for (var j = 0; j < items.length; j++) {
        var item = items[j];
        if (item.checked) {
          total += item.price * item.count;
          checkedNum++;
        }
        totalNum++
      }
    }
    console.log(totalNum,checkedNum)
      if (totalNum === checkedNum) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ",");
    }
  },
  methods: {
    handelReduce(item) {
      if (item.count === 1) return;
      item.count--;
    },
    handelAdd(item) {
      item.count++;
    },
    handelRemove(items, index) {
      items.splice(index, 1);
      if (items.length === 0) {
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i] == items) {
            this.list.splice(i, 1);
          }
          console.log(this.list);
        }
      }
    },
    checkedAllBox() {
      for (var i = 0; i < this.list.length; i++) {
        var items = this.list[i];
        for (var j = 0; j < items; j++) {
          if (!this.checkedAll) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        }
      }
    }
  }
});
