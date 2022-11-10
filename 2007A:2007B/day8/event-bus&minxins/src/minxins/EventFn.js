var Event = {
    created(){
        console.log('我是minxins的created')
    },
    mounted() {
        console.log('我是minxins的mounted')
    },
    methods:{
        sendName(){
            // 使用全局通信函数里提供的 $emit方法来派发事件
            this.$eventBus.$emit('Name',this.name)
            console.log('minxins')
        },
        sendMoney(){
            // 给孙子来点零花钱
            this.$eventBus.$emit('Money',5000)
            this.Money -= 5000
            console.log('minxins')

        }
    }
}

export default Event