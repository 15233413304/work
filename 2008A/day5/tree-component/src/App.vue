<template>
  <div id="app">
    <!-- 父组件接收子组件通知的事件 通过v-on来接受 -->
    <TreeComponent :treeData="treeData" @clickTreeItem="handleTree" />
    <a href="https://www.baidu.com" @click.prevent="handleA">点击</a>
    {{list}}
  </div>
</template>

<script>
export default {
  data(){
    return{
      treeData:[{
        id:'1',
        title:'a',
        children:[
          {
            id:'1-1',
            title:'a-1',
            children:[
              {
                id:'1-1-1',
                title:'a-1-1',
                children:[
                  {
                    id:'1-1-1-1',
                    title:'a-1-1-1',
                    children:[
                      {
                        id:'1-1-1-1-1',
                        title:'a-1-1-1-1',
                        children:[
                          {
                             id:'1-1-1-1-1-1',
                             title:'a-1-1-1-1-1',
                          }
                        ]
                      },
                      {
                        id:'1-1-1-1-2',
                        title:'a-1-1-1-2',
                      },
                      {
                        id:'1-1-1-1-3',
                        title:'a-1-1-1-3',
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id:'1-2',
            title:'a-2'
          },
          {
            id:'1-3',
            title:'a-3'
          }
        ]
      }],
      list:[]
    }
  },
  methods:{
    handleA(){
      console.log(1111)
    },
    handleTree(id){
      console.log(1111)
      this.list.push(id)
    }
  }
}
</script>

<style>
ul,ol,li{
  list-style: none;
}
</style>