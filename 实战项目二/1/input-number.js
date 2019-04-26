function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$) | (^-?[1-9][0-9]*$) | (^-?0{1}$)/).test(value)
}
Vue.component('input-number', {
    template: '<div class="input-number">\
    <input \
    type="text" \
    :value="currenValue" \
    @change="handleChange" >\
    <button \
    @click="handelDown" \
    :disabled="currenValue <= min">-</button>\
    <button \
    @click="handelUp" \
    :disabled="currenValue >= max">+</button>\
    </div>',
    // 独立组件，所以应该对每个 prop 进行校验
    props: {
        // 默认值是正无限大和负无限大
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        } 
    },
    data() {
        return {
            currenValue: this.value
        }
    },
    watch: {
        currenValue:function(val) {
            this.$emit('input',val)
            this.$emit('on-change',val)
        },
        value: function(val) {
            this.updateValue(val)
        }
    },
    methods: {
        updateValue: function(val) {
            if(val > this.max) val = this.max
            if(val < this.min) val = this.min
        },
        handelDown: function() {
            if(this.currenValue <= this.min) return
            this.currenValue -= 1
        },
        handelUp: function() {
            if(this.currenValue >= this.max) return
            this.currenValue += 1
        },
        handleChange: function(event) {
            var val = event.target.value.trim();
            var max = this.max
            var min = this.min
            if(isValueNumber(val)){
                val = Number(val)
                this.currenValue = val
                if(val > max) {
                    this.currenValue = max
                }else if(val < min) {
                    this.currenValue = min
                }
            }else{
                event.target.value = this.currenValue
            }
        }
    },
    computed:function() {
        this.updateValue(this.value)  
    }
})