<template>
  <div>
    <p v-for="item in tabs" 
     :key="item.key" 
     :class="{active: item.key == curTab}"
     @click="curTab = item.key"
    >{{item.values}}</p>
    <!-- <TabA v-if="!curTab"/>
    <TabB v-else/> -->

    <!-- <TabA v-show="!curTab"/>
    <TabB v-show="curTab"/> -->
    <keep-alive>
      <TabA v-if="!curTab"/>
      <TabB v-else/>
    </keep-alive>
   

  </div>
</template>

<script>
import { TabA, TabB } from '@/components'
export default {
    components:{
        TabA,
        TabB
    },
    data(){
        return {
            tabs:[
                {
                    key: 0,
                    values:'A'
                },
                {
                    key: 1,
                    values:'B'
                }
            ],
            curTab: 0
        }
    }
}
</script>

<style>
p{
    display: inline-block;
    margin: 10px;
    padding: 5px;
    background: #ccc;
}
.active{
    background: red;
}
</style>