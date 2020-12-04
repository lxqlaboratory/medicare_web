<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 26px;font-weight: bold;color: #304156 ">体检报名 </td>
      </tr>
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">个人基本信息</td>
      </tr>
      <tr>
        <td colspan="1">工号</td>
        <td colspan="2">{{ form.perNum }}</td>
        <td colspan="1">姓名</td>
        <td colspan="2">
          {{ form.perName }}
        </td>
      </tr>
      <tr>
        <td colspan="1">单位</td>
        <td colspan="2">
          {{ form.collegeName }}
        </td>
        <td colspan="1" width="200">身份证号</td>
        <td colspan="2">{{ form.perIdCard }}</td>
      </tr>
      <tr>
        <td colspan="1">性别</td>
        <td colspan="2">
          <el-select v-model="form.genderCode" size="mini" class="elinput" >
            <el-option
              v-for="item in gender"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td colspan="1">出生日期</td>
        <td colspan="2">
          <el-date-picker
            v-model="form.perBirth"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
        </td>
      </tr>
      <tr>
        <td colspan="1">婚姻状态</td>
        <td colspan="2">
          <el-select v-model="form.marryStates" size="mini" class="elinput" >
          </el-select>
        </td>
        <td colspan="1">联系方式</td>
        <td colspan="2">
          {{ form.mobilePhone }}
        </td>

      </tr>
      <tr>
        <td colspan="1">体检券</td>
        <td colspan="2">
          {{ form.checkDes }}
        </td>
        <td colspan="1">*查体单位</td>
        <td colspan="2">
          <el-select v-model="form.checkUnitList" size="mini" class="elinput" >
          </el-select>
        </td>
      </tr>

      <tr>
        <td colspan="1">*查体套餐</td>
        <td colspan="2">
          <el-select v-model="form.projectList" size="mini" class="elinput" >
          </el-select>
        </td>
        <td colspan="3">
          <el-button >展开查体项</el-button>
        </td>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary" :disabled="isDisable" @click="doSubmit">立即报名</el-button>
    </div>
  </div>
</template>

<script>
import { physicalexaminationApplySubmit } from '@/api/medicare'
export default {
  name: 'medicareApply',
  data() {
    return {
      showBank:false,
      form: {
        secondPerType: '',
        personId: null,
        perNum: '',
        genderCode:'',
        perName: '',
        perBirthday: '',
        collegeName: '',
        mobilePhone: '',
        bankNo: '',
        zzmm:'',
        mzmc:'',
        zc:'',
        bankName: ''
      },
      gender:[
        {
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }
      ],
      secondPerTypeList: [],
      isDisable: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    doSubmit() {
      if(this.form.mobilePhone===undefined || this.form.mobilePhone==='') {
        this.isLoading = false
        this.$message({
          message: '手机号不能为空',
          type: 'success',
          offset: '10'
        })
      }else if(this.form.checkUnit==='0000' || this.form.projectId==='0') {
        this.isLoading = false
        this.$message({
          message: '没有选择查体单位和查体套餐，不能提交',
          type: 'success',
          offset: '10'
        })
      }else {
        physicalexaminationApplySubmit({
          form: this.form,
        }).then(res => {
          console.log(res)
          if(res.re===1){
            this.$message({
              message: '保存成功',
              type: 'success',
              offset: '10'
            })
                if (res.confirm) {
                  if(flag.isCollege==='1') {
                    this.$router.push({name:'medicareReportView'})
                  }else {
                    this.$router.push({name:'medicareApplyView'})
                  }
                }
          } else{
            this.$message({type: 'error', message: res.data})
          }

        }).catch(err => {})
      }
    },
    fetchData() {
      personBaseInfoMaintainInit({ 'session': document.cookie, 'personId': this.$route.query.personId }).then(res => {
        console.log(res.data)
        this.form = res.data
        if(this.form.secondPerType === '12' ||this.form.secondPerType === undefined || this.form.secondPerType === '13'||this.form.secondPerType === '14'||this.form.secondPerType === '21'||this.form.secondPerType === '31'){
          this.showBank = true
        }
        this.secondPerTypeList = res.data.secondPerTypeList
      })
    },
    bandChange(e){
      this.form.secondPerType = e
      if(this.form.secondPerType === '12' ||this.form.secondPerType === undefined || this.form.secondPerType === '13'||this.form.secondPerType === '14'||this.form.secondPerType === '21'||this.form.secondPerType === '31'){
        this.showBank = true
      }else {
        this.showBank = false
      }
    },

  }
}
</script>
