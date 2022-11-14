    <template>
  <div>
    <van-form>
        <van-field
            v-model="phone"
            name="validator"
            label="手机号"
            placeholder="手机号"
            :rules="[{ validator, required: true, message: '请填写手机号' }]"
        />
        <van-field
            v-model="formCode"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
            >
            <template #button>
                <van-button size="small" type="primary" @click="handleSendCode" :disabled="!!codeTime">{{codeText}}</van-button>
            </template>
        </van-field>
        <div style="margin: 16px;">
            <van-button round block type="info" 
            :loading="loading"
            loading-text="登陆中..."
            @click="onSubmit" 
            >登陆/注册</van-button>
        </div>
        <van-progress :percentage="progress" />
    </van-form>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapMutations,mapState } from 'vuex';


export default {
    data(){
        return{
            // 手机号
            phone: '',
            // 验证码 
            formCode:'',
            // 倒计时
            codeTime:0,
            // 登陆按钮的加载状态
            loading:false,
        }
    },
    computed:{
        ...mapState(['code']),
        codeText(){
            if(this.codeTime){
                return `倒计时${this.codeTime}`
            }
            return '发送验证码'
        }
    },
    methods:{
        // mapMutations辅助函数可以映射 mutations里的函数
        ...mapMutations(['sendCode','setUser']),
        validator(val){
            return /^1[3-9]\d{9}$/.test(val);
        },
        // 发送验证码
        handleSendCode(){
            // this.$store.commit('sendCode')
            if(this.phone){
                this.sendCode()
                this.codeTime = 60
                let Timer = setInterval(() => {
                    this.codeTime --
                    if(this.codeTime == 0){
                        clearTimeout(Timer)
                    }
                }, 1000);
            }
        },
        // 登陆
        onSubmit(){
            // this.$store.commit('setUser',this.phone)
            this.setUser(this.phone)
            if( this.code.length < 6){
                return Toast.error('验证码位数不足')
            }
            if( this.code == this.formCode ){
                this.loading = true
                localStorage.setItem('token',this.phone)
                // 获取到之前被拦截的页面path
                let path = localStorage.getItem('abc')
                setTimeout(() => {
                    if(path){
                        this.$router.push(`${path}`)
                    }else{
                       this.$router.push('/user')
                    }
                    this.loading = false
                }, 1000);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.title{
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>