<template>
  <div class="app-container">
    <div  v-if="isMedicareClose===true">
      <div>
        <div style="color: #7acfa6;">
          医保报名已关闭,无法在报名!
        </div>
      </div>
    </div>
    <div v-else>
      <table class="content">
        <tr>
          <td colspan="6" style="font-size: 26px;font-weight: bold;color: #304156 ">医保信息报名 </td>
        </tr>
        <tr>
          <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">请仔细核对个人信息！选择缴费方式,若选择弃保请选择已缴保地区，点击“提交”即可，弃保请提交后下载弃保声明。如信息有误请联系学院修改!</td>
        </tr>
        <tr>
          <td colspan="1">学号</td>
          <td colspan="2">{{ form.perNum }}</td>
          <td colspan="1">姓名</td>
          <td colspan="2">
            {{ form.perName }}
          </td>
        </tr>
        <tr>
          <td colspan="1" width="200">身份证号</td>
          <td colspan="2">{{ form.perIdCard }}</td>
          <td colspan="1">*性别</td>
          <td colspan="2">
            <el-select style="width: 80px" v-model="form.genderCode" :value="form.genderCode" size="mini" class="elinput" @change="bindPickerGenderChange">
              <el-option
                v-for="item in genders"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
        </tr>
        <tr>
          <td colspan="1">*出生日期</td>
          <td colspan="2">
            <el-date-picker
              v-model="form.perBirth"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间"
              size="small"
              style="width: 150px"
            />
          </td>
          <td colspan="1">*联系方式</td>
          <td colspan="2">
            <el-input style="width: 150px;" v-model="form.mobilePhone" placeholder="请输入联系方式"></el-input>
          </td>
        </tr>
        <tr>
          <td colspan="1">所在学院</td>
          <td colspan="2">{{ form.collegeName }}</td>
          <td colspan="1">所学专业</td>
          <td colspan="2">
            {{ form.majorName }}
          </td>
        </tr>
        <tr>
          <td colspan="1">所在年级</td>
          <td colspan="2">{{ form.grade }}</td>
          <td colspan="1">所在班级</td>
          <td colspan="2">
            {{ form.perClass }}
          </td>
        </tr>
        <tr>
          <td colspan="1">缴费状态</td>
          <td colspan="2">{{ form.payStatus }}</td>
          <td colspan="1" >*缴费方式</td>
            <td colspan="2" v-if="form.isFree===true">{{form.modelPayName}}</td>
            <td colspan="2" v-else>
              <el-select style="width: 100px" v-model="form.modelPay" :value="form.modelPay" size="mini" class="elinput" @change="bindPickerModelPayChange">
                <el-option
                  v-for="item in payModels"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </td>
        </tr>
        <tr v-if="form.modelPay==='2'">
          <td colspan="1">请选择缴保地</td>

          <td colspan="5" style="width: 200px">
            <v-distpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
          </td>
        </tr>
      </table>
      <div align="center">
        <el-button type="primary" @click="doSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { studentMedicareApplySubmit,studentMedicareApply  } from '@/api/medicare'
import VDistpicker from 'v-distpicker'
export default {
  name: 'StudentMedicareApply',
  data() {
    const currentDate = this.getDate({
      format: true
    })
    return {
      txt1:'',
      date: currentDate,
      start: currentDate,
      end: currentDate,
      index0: 0,
      form: {
        perNum: '',
        perName: '',
        perIdCard: '',
        genderCode: '',
        perBirth:'',
        mobilePhone:'',
        collegeName:'',
        majorName:'',
        grade:'',
        perClass:'',
        payStatus:'',
        modelPayName:'',
        modelPay:0,
        isFree: '',
        province: '',
        city: '',
        town: '',
      },
      marryStates: [{
        value: '0',
        label: '未婚'
      }, {
        value: '1',
        label: '已婚'
      }],
      genders: [{
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '女'
      }],
      payModels: [
        {value:'0',label:'未选择'},
        {value:'1',label:'个人缴费'},
        {value:'2',label: '弃保'}],
      year: '',
      isCollege: '0'

    }
  },
  computed: {
    startDate() {
      return this.getDate('start')
    },
    endDate() {
      return this.getDate('end')
    }
  },
  components: { VDistpicker },
  created() {
    this.isCollege = this.$route.query.isCollege
    this.fetchData()
  },
  methods: {
    onChangeProvince(a){
      this.form.province = a.value
    },onChangeCity(a){
      this.form.city = a.value
    },
    onChangeArea(a){
      this.form.town = a.value
    },
    fetchData() {
      studentMedicareApply({
        perNum: this.$route.query.perNum
      }).then(res => {
        if (res.re === 1) {
          this.form = res.data.form
          this.form.perNum  = res.data.form.perNum
          this.isMedicareClose = res.data.isMedicareClose
          this.year = res.data.year
        } else {
          console.log(res)
        }
      })
    },
    bindPickerGenderChange() {
      console.log(this.form.genderCode)
    },
    bindTimeChangePerBirth(e) {
      this.form.perBirth = e.target.value
    },
    bindPickerModelPayChange(e){
      this.form.modelPay = e.target.value
    },

    doSubmit() {
      if (this.form.mobilePhone === undefined || this.form.mobilePhone === '') {
        this.$message({
          message: '联系方式不能为空！',
          showCancel: false
        })
      } else if (this.form.perIdCard === undefined || this.form.perIdCard === '') {
        this.$message({
          message: '身份证号不能为空',
          showCancel: false
        })
      } else if ((this.form.majorName === undefined ||this.form.majorName === '') && (this.form.perClass === undefined || this.form.perClass === '')) {
        this.$message({
          message: '专业和班级不能同时为空',
          showCancel: false
        })
      }else if (this.form.perBirth === undefined || this.form.perBirth === '') {
        this.$message({
          message: '出生日期不能为空',
          showCancel: false
        })
      }else if (this.form.modelPay === '0') {
        this.$message({
          message: '请选择缴费方式',
          showCancel: false
        })
      } else {
        studentMedicareApplySubmit({
          form: this.form
        }).then(res => {
          if (res.re === 1) {
            var flag = this
            this.$message({
              message: '保存成功',
              showCancel: false
            })
            if (flag.isCollege === '1') {
              this.$router.push({ path: 'CollegeMedicareApplyQuery' })
            } else {
              this.$router.push({ path: 'StudentMedicareApplyView' })
            }
          } else {
            this.$message({
              message: '保存失败',
              type: 'sucess'
            })
          }
        })
      }
    },
    getDate(type) {
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()

      if (type === 'start') {
        year = year - 100
      } else if (type === 'end') {
        year = year + 2
      }
      month = month > 9 ? month : '0' + month
      day = day > 9 ? day : '0' + day
      return `${year}-${month}-${day}`
    }
  }
}
</script>
