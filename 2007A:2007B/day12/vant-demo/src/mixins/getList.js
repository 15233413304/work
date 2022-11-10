import axios from '@/axios/axios'
export default {
    methods: {
        getList(path){
            axios.get('/api/list',{params:{url: path}}).then(res=>{
                // console.log(res)
                this.list = res.data
            })
        },
        getDetail(id,tab){
            axios.get('/api/detail',{params:{ id, tab }}).then(res=>{
                // console.log(res.data)
                this.detailData = res.data
            })
        }
    },
    
}