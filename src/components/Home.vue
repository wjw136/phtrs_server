<template>
  <div>
    <h2 align='center'>On-line pothole tracking and repair system</h2>
    <!-- {{dialogFormVisible}} -->


  <!-- 数据操作交互 -->
  <!-- dialog的数据双向绑定 -->
    <el-dialog title='新增工单' :visible.sync="dialogFormVisible" width=40%>
      <el-form :model='citizen_form'>
        <!--v-bind绑定变量 要绑定常量=>"'aa'"-->
        <el-form-item label='街道地址' label-width="120px">
          <el-input v-model="citizen_form.address" auto-complete="off" style="margin-bottom: 22px"></el-input>
        </el-form-item>
        <el-form-item label="大小" :label-width="'120px'" >
            <el-select v-model="citizen_form.size" placeholder="请选择坑洞大小" style="width: 100%;margin-bottom: 22px">
              <el-option v-for="(item, index) in size_options" :key="index" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="部位" :label-width="'120px'" align='left' style="margin-bottom: 22px">
            <el-radio v-model="citizen_form.position" label="center">道路中间</el-radio>
            <el-radio v-model="citizen_form.position" label="side">道路两侧</el-radio>
            <el-radio v-model="citizen_form.position" label="sidewalk">人行道</el-radio>
        </el-form-item>
        <el-form-item label="所在地区" :label-width="'120px'">
            <el-input v-model="citizen_form.district" auto-complete="off" style="margin-bottom: 22px"></el-input>
        </el-form-item>
        <el-form-item label="优先级" :label-width="'120px'">
            <el-select v-model="citizen_form.priority" placeholder="请选择优先级" style="width: 100%">
              <el-option v-for="item in ['Low','Medium-low','Medium','Medium-high','High']" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        </el-form-item>
      </el-form>

    <template v-slot:footer class="dislog-footer">
      <el-button @click="dialogFormVisible=false"> 取 消 </el-button>
      <el-button type="primary" @click="citizen_submit"> 确 定 </el-button>
    </template>
    </el-dialog>


    <el-dialog title="接单" :visible.sync="workerdialogFormVisible" width="40%" align='center'> <!-- <el-scrollbar style="height:100%"> -->
          <el-form :model="citizen_form">
            <el-form-item label="坑洞标识号" :label-width="'120px'">
              <el-input v-model="citizen_form.id" auto-complete="off" style="margin-bottom: 22px" disabled></el-input>
            </el-form-item>
            <el-form-item label="维修人员标识号" :label-width="'120px'" >
              <el-input v-model="citizen_form.worker_name" auto-complete="off" style="margin-bottom: 22px" disabled></el-input>              <!-- <el-button @click='ss'>aaa</el-button> -->
            </el-form-item>
            <!--
            <el-form-item label="分配设备" :label-width="'120px'" >
              <el-select v-model="citizen_form.device" placeholder="请输入设备名及其数量，按回车键添加" multiple filterable allow-create style="width: 100%;margin-bottom: 22px"></el-select>
              <!-- <el-button @click='ss'>aaa</el-button> -->
            </el-form-item>
            <el-form-item label="维修时间(h)" :label-width="'120px'">
              <el-input v-model="citizen_form.duration" placeholder="小时" auto-complete="off" style="margin-bottom: 22px"></el-input>
            </el-form-item>
            <el-form-item label="维修材料" :label-width="'120px'" >
              <el-select v-model="citizen_form.material" placeholder="请输入材料名及其数量，按回车键添加" default-first-option multiple filterable allow-create style="width: 100%;margin-bottom: 22px"></el-select>
              <!-- 手动输入的select框+多选+搜索 -->
              <!-- <el-button @click='ss'>aaa</el-button> -->
            </el-form-item>
             <el-form-item label="维修设备" :label-width="'120px'" >
              <el-select v-model="citizen_form.device" placeholder="请输入设备名及其数量，按回车键添加" default-first-option multiple filterable allow-create style="width: 100%;margin-bottom: 22px"></el-select>
              <!-- 手动输入的select框+多选+搜索 -->
              <!-- <el-button @click='ss'>aaa</el-button> -->
            </el-form-item>
            <el-form-item label="维修成本($)" :label-width="'120px'">
              <el-input v-model="citizen_form.cost" auto-complete="off" placeholder='成本' style="margin-bottom: 22px"></el-input>
            </el-form-item>
          </el-form> <!-- </el-scrollbar> -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="workerdialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="worker_submit">确 定</el-button>
        </div>
      </el-dialog>

  <!-- 数据操作 -->
  <div class="filter-contain">
    <div class="right-items" style="float: right">
        <el-button
          class="filter-item"
          style="margin-right: 10px;"
          type="primary"
          icon="el-icon-refresh"
          @click="refresh"
        >刷新</el-button>

        <el-button
          class="filter-item"
          style="margin: 10px;"
          type="primary"
          icon="el-icon-circle-plus"
          v-if="user_type=='citizen'"
          @click="handleCreate"
        >New Record</el-button>


        <el-button
          class="filter-item"
          style="margin-right: 30px;"
          type="primary"
          icon="el-icon-remove-outline"
          @click="log_out"
        >退出登录</el-button>


    </div>
  </div>

  <!-- 数据视图 -->
  <div v-if="user_type===null"><h3>null</h3></div>
  <div v-if="user_type==='citizen'">
    <el-table
        :data="tableData"
        style="width: 100%"
      >
        <!--id, time, status-->
        <el-table-column prop="id" label="坑洞标识号" sortable width="120px"></el-table-column>
        <el-table-column prop="address" label="街道地址" sortable width="auto"></el-table-column>
        <el-table-column prop="size" label="大小" sortable width="75px"></el-table-column>
        <el-table-column prop="position" label="部位" sortable width="75px"></el-table-column>
        <el-table-column prop="district" label="地区" sortable width="auto"></el-table-column>
        <el-table-column prop="priority" label="维修优先级" sortable width="125px"></el-table-column>
        <el-table-column prop="time" label="创建时间" sortable width="auto"></el-table-column>
        <el-table-column prop="status" label="状态" sortable width="auto"></el-table-column>
      </el-table>
  </div>

  <div v-if="user_type==='worker'">
    <!-- id, address, size, position, district, priority, time, status -->
    <!-- workersId workers_num device duration material cost 操作  -->
  <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="id" label="坑洞标识号" sortable width="120px"></el-table-column>
        <el-table-column prop="address" label="街道地址" sortable width="300"></el-table-column>
        <el-table-column prop="size" label="大小" sortable width="75px"></el-table-column>
        <el-table-column prop="position" label="部位" sortable width="75px"></el-table-column>
        <el-table-column prop="district" label="地区" sortable width="200"></el-table-column>
        <el-table-column prop="priority" label="维修优先级" sortable width="120"></el-table-column>
        <el-table-column prop="time" label="创建时间" sortable width="200"></el-table-column>
        <el-table-column prop="status" label="状态" sortable width="100"></el-table-column>
        <el-table-column prop="worker_name" label="维修人员" width="200" >
          <template slot-scope="scope">
          <el-tag v-if="tableData[scope.$index].worker_name" style="margin:5px">{{tableData[scope.$index].worker_name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="device" label="分配设备" width="200">
          <!-- 自定义表格模板 -->
          <template slot-scope="scope">
            <el-tag v-for="item in tableData[scope.$index].device" :key="item" style="margin:5px">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="维修花费时长(h)" sortable width="200"></el-table-column>
        <el-table-column prop="material" label="所用材料" sortable width="200" >
          <template slot-scope="scope">
            <el-tag v-for="item in tableData[scope.$index].material" :key="item" style="margin:5px">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="维修成本($)" sortable width="200"></el-table-column>
        <el-table-column label="操作" fixed width="200">
          <template slot-scope="scope">
            <div v-if="tableData[scope.$index].status=='已提交'">
              <el-button size="mini" type="primary"
                @click="handleOrderTaking(scope.$index, scope.row)">接单</el-button>
            </div>
            <!-- <div v-if="tableData[scope.$index].status!='已提交' && tableData[scope.$index].status!='待验收'"> -->
            <div v-else>
              <el-button size="mini" type="primary" disabled>已接单</el-button>
            </div>
          </template>
        </el-table-column>
  </el-table>
  </div>



  </div>
</template>

<script>
import {getCurrentTime} from '../js/time'//必须同名 es6结构语法
import $ from 'jquery'

/*
vue的store就是一个组件的option 可以单独抽出来做为state component(state.js)从而实现共享数据

slot-scope或许子组件数据
*/
export default {
    name: "Home",
    data() {
      return {
        tableData: [],
        user_type:null,
        dialogFormVisible:false,
        workerdialogFormVisible:false,
        statusop:['已提交','已接单'],
        device:['device1','device2','device3'],
        material:['material1','material2','material3'],
        size_options:[1,2,3,4,5,6,7,8],
        priority_ops:['Low','Medium-low','Medium','Medium-high','High'],
        citizen_form: {

          id:'',
          citizen_name:'',
          address:"",
          size: '1',
          position: 'center',
          district: '',
          priority: 'Low',
          time: '',

          status: '已提交',
          worker_name: null,
          device: [],
          duration: null,
          material: [],
          cost: null,

        },

        


      };
    },
    methods: {
      handleCreate(){
        this.dialogFormVisible=true;
      },
      handleOrderTaking(index,row){
        this.citizen_form.id=row.id;
        this.citizen_form.worker_name=window.sessionStorage.getItem('user')
        console.log(row.id);
        this.workerdialogFormVisible=true;
      },
      worker_submit(){
        console.log(this.citizen_form.device)

      this.$axios.post('/order/recieve',{
        id: this.citizen_form.id,
        status:'已接单',
        worker_name:this.citizen_form.worker_name,
        device:this.citizen_form.device,
        material:this.citizen_form.material,
        duration:this.citizen_form.duration,
        cost:this.citizen_form.cost,
      }).then(successResponse=>{
        var res=eval(successResponse.data)
        console.log(res);
        if(res.msg==='OK'){
          this.$message({message:'更新成功！',type:'success',center:true,showClose:true})
          this.workerdialogFormVisible = false
          this.refresh();
        }else{
            this.$message({message:'添加失败！'+successResponse.data,type:'error',center:true,showClose:true})
        }}).catch(failResponse=>{
          this.$notify.error({title: '操作异常！',message: failResponse.message});
        })
      }
      ,
      citizen_submit() {
        this.citizen_form.time=getCurrentTime();
        this.citizen_form.citizen_name=window.sessionStorage.getItem('user');
        if(this.citizen_form.address == ''){
        alert('街道地址不能为空！');
        return;
        }
        if(this.citizen_form.district == ''){
          alert('所在地区不能为空！');
          return;
        }

        this.$axios.post('/order/create',{
        citizen_name:this.citizen_form.citizen_name,
        address:this.citizen_form.address,
        size:this.citizen_form.size,
        district:this.citizen_form.district,
        position:this.citizen_form.position,
        priority:this.citizen_form.priority,
        time:this.citizen_form.time,
        status:'已提交',
        worker_name: null,
        device:[],
        duration:null,
        material:[],
        cost:null,
      }).then(successResponse => {
            console.log(successResponse.data)
            var res=eval(successResponse.data)
            if (res.msg === 'OK') {
              this.$message({message:'添加成功！',type:'success',center:true,showClose:true})

              console.log(this.citizen_form)
              //this.tableData.push($.extend(true, {}, this.citizen_form));
              console.log(this.tableData)
              //if(success)
              this.dialogFormVisible = false//自动退出对话框
              this.refresh();//自动刷新
            }
            else
            {
              this.$message({message:'添加失败！'+successResponse.data,type:'error',center:true,showClose:true})
            }
          })
          .catch(failResponse => {
            this.$notify.error({title: '操作异常！',message: failResponse.message});
          })

      },

      refresh(){
        // var a=getCurrentTime1()
        // console.log(a)
        var name=window.sessionStorage.getItem('user');
        var type=window.sessionStorage.getItem('user_type');
        var url='/order/'+(type=='citizen'?'citizen_find':'worker_find')
        this.$axios.post(url,{name:name}).then(successResponse=>{
          // console.log(successResponse.data)
          var d=eval(successResponse.data).data;//同保存的时候一样对最外层解析一次就够了
          // console.log(d)
          this.tableData = $.extend(true, [], d);//深度合并对象
          this.$message({message:'刷新成功！',type:'success',center:true,showClose:true})
        }).catch(failResponse => {
        console.log(failResponse)
        this.$notify.error({title: '获取表单异常！',message: failResponse.message});
        })
      },
      log_out(){
        this.$confirm('确定退出登录吗?','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.sessionStorage.removeItem('user')
          window.sessionStorage.removeItem('user_type')
          this.$message({
            type: 'success',
            message: '登录已退出'
          });
          this.$router.replace({ path: '/login' })
        }).catch(() => {});
        },
    },
    mounted(){

      //刷新 重新create mounted update 但是没有destroy
      //sessionstorage 在会话结束的时候清空 刷新不清空
      this.user_type=window.sessionStorage.getItem('user_type');
      // for(var i=1;i<=10;i++){
      //   this.size_options.push({label:i, value:i})
      // }

      this.refresh();
    },
  }
</script>


<style lang="scss" scoped>
  .filter-contain::after{
    clear: both;
    //clear清除左右浮动的影响 单本身仍然浮动
    height:10px;
    width:10px;
    background:white;
    display: block;
    content: "";
  }
  //对外是正常文档流


</style>
