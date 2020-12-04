<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 26px;font-weight: bold;color: #304156 ">请务必确认【聘任类型】正确，否则将影响后期监考费用发放！ </td>
      </tr>
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">个人基本信息</td>
      </tr>
      <tr>
        <td colspan="1" width="200">工号或学号</td>
        <td colspan="5">{{ form.perNum }}</td>
      </tr>
      <tr>
        <td colspan="1">姓名</td>
        <td colspan="5">{{ form.perName }}</td>
      </tr>
      <tr>
        <td colspan="1">单位</td>
        <td colspan="5">
          {{ form.collegeName }}
        </td>
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
            v-model="form.perBirthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
        </td>

      </tr>
      <tr>
        <td colspan="1">聘任类型</td>
        <td colspan="5">
          <el-select v-model="form.secondPerType" placeholder="请选择人员类型" style="width: 100%" @change="bandChange">
            <el-option
              v-for="item in secondPerTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>

      <tr>
        <td colspan="1">手机号</td>
        <td colspan="5">
          <el-input v-model="form.mobilePhone" placeholder="请输入手机号" />
        </td>

      </tr>
      <tr v-if="showBank">
        <td colspan="1">开户银行</td>
        <td colspan="5">
          <el-input v-model="form.bankName" placeholder="请输入开户银行" />
        </td>
      </tr>
      <tr v-if="showBank">
        <td colspan="1">银行卡号</td>
        <td colspan="5">
          <el-input v-model="form.bankNo" placeholder="请输入银行账号" />
        </td>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary" :disabled="isDisable" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { personBaseInfoMaintainInit } from '@/api/enroll'
import { personBaseInfoMaintain } from '@/api/enroll'
export default {
  name: 'PersonInfomation',
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
    submit() {
      this.isDisable = true
      if (this.form.mobilePhone === '' || this.form.mobilePhone === undefined ) {
        this.$message({
          message: '手机号不能为空',
          type: 'success',
          offset: '10'
        })
        setTimeout(() => {
          this.isDisable = false
        }, 1000)
      }else if(this.form.secondPerType === '12' ||this.form.secondPerType === undefined || this.form.secondPerType === '13'||this.form.secondPerType === '14'||this.form.secondPerType === '21'||this.form.secondPerType === '31'){
        if(this.form.bankNo === ''|| this.form.bankNo ===undefined){
          this.$message({
            message: '银行卡号不能为空',
            type: 'success',
            offset: '10'
          })
          setTimeout(() => {
            this.isDisable = false
          }, 1000)
        }
        else  if(this.form.bankName === ''||this.form.bankName === undefined){
          this.$message({
            message: '银行名称不能为空',
            type: 'success',
            offset: '10'
          })
          setTimeout(() => {
            this.isDisable = false
          }, 1000)
        }else{
          personBaseInfoMaintain(this.form
          ).then(res => {
            if (res.re === 1) {
              this.$message({
                message: '提交成功',
                type: 'success',
                offset: '10'
              })
            }
            setTimeout(() => {
              this.isDisable = false
            }, 1000)
          })

        }

      }
      else {
        personBaseInfoMaintain(this.form
        ).then(res => {
          if (res.re === 1) {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            })
          }
          setTimeout(() => {
            this.isDisable = false
          }, 1000)
        })
      }
    }
  }
}
</script>
