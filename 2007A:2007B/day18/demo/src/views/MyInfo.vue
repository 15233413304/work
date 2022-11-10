<template>
  <div>
    <vue-qr :logoSrc="img" backgroundColor="#ccc" colorLight="hotpink" :text="url"/>
  </div>
</template>

<script>
import img from '@/assets/logo.jpg'
import VueQr from 'vue-qr'
export default {
  components:{
    VueQr
  },
  data(){
    return {
      img,
      url:''
    }
  },
  created(){
    this.url='https://ssl.ptlogin2.qq.com/jump?ptlang=2052&keyindex=19&clientuin=1723791569&clientkey=A87A964C7543AF2217EA3579507BC2AFA75BE83B6A7A255788178E3970364354E19FA47449D259CCE62AFDAD26846DB13CB52978A450203FBCB482A13E591E83&u1=https%3A%2F%2Fwork.weixin.qq.com%2Fu%2Fvc6d9ea19fb88c0f7f%3Fv=4.0.19.104415'
  }
}
</script>

<style>

</style>