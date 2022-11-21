let toastMixins = {
    data(){
        return{
            
        }
    },
    methods: {
        Toast(title,timeout = 1000){
            this.$toast(title,timeout)
        }
    },
    beforeCreate() {
        console.log('我是mixins混入的beforeCreate')
    },
    created(){
        console.log('我是mixins混入的created')
    },
    beforeMount() {
        console.log('我是mixins混入的beforeMount')
    },
    mounted() {
        console.log('我是mixins混入的mounted') 
    },
}

export default toastMixins