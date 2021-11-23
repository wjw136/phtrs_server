<template>
<!--
    1. vue的slot 子组件使用slot引用父组件的template 并可以传参到父组件的template
    2. vue的v-bind.sync=dict 将对象的每一个prop传到子组件中并添加update响应 实现双向绑定
    -->
    <div id='poster'>
        <h1 class='header'>PHTRS system</h1>
        <div class="center">
        <el-form class='login-container' label-position='left'>


            <el-tabs v-model='activeTab' @tab-click='handleTabsClick'>

                <el-tab-pane label='登录' name='sign_in'>
                    <h3 class='login_title'>登录</h3>

                    <el-form :model='loginForm' :rules='login_rules' ref='loginForm' label-width='100px'>
                    <el-form-item label='账号' prop='username'>
                        <el-input type='text' v-model="loginForm.username"
                                    auto-complete='off' aria-placeholder="账号" class='username_style'/>
                    </el-form-item>
                    <el-form-item label='密码' prop='password'>
                        <el-input type='password' v-model='loginForm.password'
                        aria-autocomplete="off" aria-placeholder="密码" class="username_style"></el-input>
                    </el-form-item>

                    </el-form>

                    <el-button type="primary" class="login_button_style" @click='login'>登录</el-button>
                </el-tab-pane>



                <el-tab-pane label='注册' name='log_in'>
                    <h3 class='login_title'>注册</h3>

                    <el-form :model='basicSignUpForm' :rules='basic_info_rules' ref='basicSignUpForm' label-width='100px'>
                    <el-form-item prop='type' label='用户类型'>
                        <el-select v-model="basicSignUpForm.type" placeholder="请选择用户类型">
                        <!-- select=>option的value -->
                        <el-option
                            v-for="item in type_user"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop='username' label='账号'>
                        <el-input type='text' v-model='basicSignUpForm.username' placeholder='输入账号' class='username_style'></el-input>
                    </el-form-item>

                    <el-form-item prop='password' label='新密码'>
                        <el-input type='password' v-model='basicSignUpForm.password' placeholder='输入密码' class='username_style'></el-input>
                    </el-form-item>

                    <el-form-item prop='confirm_password' label='确认密码'>
                        <el-input type='password' v-model='basicSignUpForm.confirm_password' placeholder='确认密码' class='username_style'></el-input>
                    </el-form-item>

                    <el-form-item label='密码强度'><!---->
                    <password-strength v-model="basicSignUpForm.password" style="padding-top: 10px;"></password-strength>
                    </el-form-item>

                    </el-form>
                    <el-button type='primary' @click='signup' class="login_button_style" >注册</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-form>
        </div>
    </div>

</template>

<script>
import PasswordStrength from "./common/PasswordStrengthCheck";
export default {
    name:'login',
    components: { PasswordStrength, },
    data() {
        return {
            loginForm: {
                username:'',
                password:'',
            },
            basicSignUpForm:{
                username:'',
                password:'',
                confirm_password:'',
                type:''
            },
            basic_info_rules:{
                username:[{required: true,message: '请输入用户名', trigger: 'blur'}],
                password:[{required:true, message:'创建密码', trigger:'blur'},{min:6,max:20,message: '密码长度须介于6与20之间！', trigger: 'blur' }],
                confirm_password:[{required:true,message:'确认密码',trigger:'blur'},
                { validator:(rule,value,callback)=>{
                if(value==='') { callback(new Error('请再次输入密码')) }
                else if(value!==this.basicSignUpForm.password){ callback(new Error('两次输入密码不一致')) }
                else{ callback() }}, trigger:'blur'
                }
                ],
                type: [{required: true,message: '请选择用户类型', trigger: 'blur'}],
            },
            login_rules:{
                username:[{required: true,message: '请输入用户名', trigger: 'blur'}],
                password:[{required:true, message:'创建密码', trigger:'blur'},{min:6,max:20,message: '密码长度须介于6与20之间！', trigger: 'blur' }],

            },
            type_user:[
                {value:'citizen',label:'Citizen'},
                {value:'worker',label:'Maintenance worker'},
            ],
            activeTab:'sign_in'// v-model双向绑定tabs的视图 (:a=b 单向绑定)
        };
    },
    methods:{
        handleTabsClick (tab, event){
            // console.log(event.target)
        },
        login(){
            //前端存储=> cookie(位于document 参与服务端交互) sessionstorage localstorage
            // console.log('aaaaa')
            //promise的resolve和reject
            console.log(this.loginForm)
            if(this.submitFormCheck('loginForm')){
                // this.$axios.post('/login/').then(successResponse=>{console.log(successResponse)})                .catch(failResponse => {
                // this.$notify.error({title: '登陆异常！',message: failResponse.message});
                // })
                this.$axios.post('/login/login',{
                    username: this.loginForm.username,
                    password: this.loginForm.password
                })
                .then(successResponse=>{
                    console.log(successResponse.data)
                    if(successResponse.data.user){
                        this.$message({message:'登录成功',type:'success',center:true,showClose:true})
                        window.sessionStorage.setItem('user',this.loginForm.username);
                        window.sessionStorage.setItem('user_type',successResponse.data.user.user_type);
                        window.sessionStorage.setItem('user_token',successResponse.data.token);
                        this.$router.replace({path: '/index'})}
                    else{
                        this.$message({message:'登录失败！请检查账号或密码是否正确',type:'error',center:true,showClose:true})
                    }
                })
                .catch(failResponse => {
                    //failResponse.response取到后端返回的响应==successResponse   failresponse外面套了一层的error类型
                // console.log(failResponse)
                // console.log(failResponse.response)
                //后端有message 就打印  or null
                this.$notify.error({title: '登陆异常！',message: failResponse.response.data.message});
                })
            }
        },
        signup(){
            if(this.submitFormCheck('basicSignUpForm')){
                this.$axios.post('/login/register',{
                    username: this.basicSignUpForm.username,
                    password: this.basicSignUpForm.password,
                    user_type:this.basicSignUpForm.type,
                }).then(successResponse=>{
                    // console.log(successResponse.data.username)
                    if(successResponse.data.username){
                         this.$message({message:'注册成功！请返回登录页面登录！',type:'success',center:true,showClose:true})
                    }else{
                         this.$notify.error({title:'注册失败！',message: successResponse.data.message})
                    }
                }).catch(failResponse=>{
                    this.$notify.error({title: '注册异常！',message: failResponse.response.data.message});
                })
            }
        },
        submitFormCheck(formName){
            //拦截违法submit(basicSignUpForm/loginForm)
            var result;
            this.$refs[formName].validate((valid)=>{
                if(valid){ 
                    console.log(formName+' submit successfully!!!')
                    result=true;
                }else{
                    console.log(formName+' error submit!!!');
                    result=false;
                }
            })
            return result;
        },
    }
}
</script>

<style lang="scss" scoped>
    #poster{
        // background:url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602591084969&di=4d48c247ed1f1b1a8ea4cb72979e2df4&imgtype=0&src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F646%2F311%2F178%2Fe2a0d127977b4e5b9c4094cbeb80c253.jpg") no-repeat; 
        background-position: center;
        height: 100%;
        width:100%;
        background-size: cover;
        // position: fix;
        .login-container{

            background: #ffffff;
            border: 1px solid #eaeaea;

            border-radius: 30px;
            margin: 100px auto;
            width: 450px;
            padding: 15px 35px 30px 35px;

            box-shadow: 0 0 25px #cac6c6;

            .login_title {
                margin: 0px auto 50px auto;
                text-align: center;
                color: #0780fa;
                font-size: 20pt;
            }
        }
    }
    h1{
        display: block;
        // margin-bottom: 10px;
    }
    .center{
        width:100%;
        height:100%;
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: flex-start;     /* 垂直居中 */
        flex-wrap: wrap
    }
    .header{
        width: 100%;
        font-size: 30pt;
        color: rgb(60, 177, 245);
    }
    .login_button_style{
    margin: 0 auto;
    margin-top: 30px;
    background: #313538;
    width: 60%;
    border: none;
    }
    
</style>
