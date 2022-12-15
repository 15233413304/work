export default {
     data(){
        return{

        }
     },
     beforeCreate() {
        console.log('minxin-beforeCreate')
     },
     created(){
        console.log('minxin-created')
     },
     beforeMount() {
        console.log('minxin-beforeMount')
     },
     mounted() {
        console.log('minxin-mounted')
     },
     methods: {
        Timer(time){
            return `${new Date(time).getFullYear()}-${new Date(time).getMonth()+1}-${new Date(time).getDate()}`
        }
    },
}