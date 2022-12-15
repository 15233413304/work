let timeMinxins = {
    beforeCreate() {
        console.log('minxins-beforeCreate')
        
    },
    created(){
        console.log('minxins-create')
    },
    beforeMount() {
        console.log('minxins-beforeMount')
        
    },
    mounted() {
        console.log('minxins-mounted')
        
    },
    methods: {
        Timer(time){
            return `${new Date(time).getFullYear()}
            /${new Date(time).getMonth()+1}
            /${new Date(time).getDate()}
            ${new Date(time).getHours()}:
            ${new Date(time).getMinutes()}:
            ${new Date(time).getSeconds()}`
        }
    },
}
export default timeMinxins