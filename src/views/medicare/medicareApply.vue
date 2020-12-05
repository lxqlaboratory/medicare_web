<template>
  <div class="app-container">
    <div v-if="isPhysicalClose===1">
      <div>
        <div style="color: #7acfa6;">
          查体报名时间已关闭，不能再报名！
        </div>
      </div>
    </div>
    <div v-else>
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
          <td colspan="1">*性别</td>
          <td colspan="2">
            <el-select v-model="form.genderCode" :value="form.genderCode" size="mini" class="elinput" @change="bindPickerGenderChange">
              <el-option
                v-for="item in genders"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td colspan="1">*出生日期</td>
          <td colspan="2">
            <el-date-picker
              v-model="form.perBirth"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间"
            />
          </td>
        </tr>
        <tr>
          <td colspan="1">*婚姻状态</td>
          <td colspan="2">
            <el-select v-model="form.marryState" :value="form.marryState" size="mini" class="elinput" @change="bindPickerMarryChange">
              <el-option
                v-for="item in marryStates"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td colspan="1">*联系方式</td>
          <td colspan="2">
            <el-input v-model="form.mobilePhone" placeholder="请输入联系方式"></el-input>
          </td>

        </tr>
        <tr>
          <td colspan="1">体检券</td>
          <td colspan="2">
            {{ form.checkDes }}
          </td>
          <td colspan="1">*查体单位</td>
          <td colspan="2">
            <el-select v-model="form.checkUnit"  size="mini" class="elinput" @change="bindchangeCheckUnit" placeholder="请选择查体单位">
              <el-option
                v-for="item in checkUnitList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
        </tr>

        <tr>
          <td colspan="1">*查体套餐</td>
          <td colspan="2">
            <el-select v-model="form.projectId"  size="mini" class="elinput" @change="bindchangeProject" placeholder="请选择查体套餐">
              <el-option
                v-for="item in projectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td colspan="3">
            <el-button @click="show">展开查体项</el-button>
          </td>
        </tr>
      </table>

      <table class="content2">
        <tr v-for="(items,index) in itemList" v-show="showDetail" :key="index" >
          <td colspan="6" style="font-size: 18px;font-weight: bold;color: #304156; ">{{ items }} </td>
        </tr>
      </table>

      <div align="center">
        <el-button type="primary" @click="doSubmit">立即报名</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { physicalexaminationApply, physicalexaminationApplyProjectList, physicalexaminationApplyProjectItemList, physicalexaminationApplySubmit } from '@/api/medicare'
export default {
  name: 'MedicareApply',
  data() {
    const currentDate = this.getDate({
      format: true
    })
    return {
      date: currentDate,
      start: currentDate,
      end: currentDate,
      showProject: false,
      showDetail: false,
      index0: 0,
      form: {
        perNum: '',
        perName: '',
        perIdCard: '',
        genderCode: '',
        collegeName: '',
        perBirth: '',
        marryState: '',
        mobilePhone: '',
        cardNum: '',
        checkUnit: '',
        checkDes: '',
        baseCheck: '',
        addedCheck: '',
        projectId: ''
      },
      marryIndex: 0,
      genderIndex: 0,
      checkUnitIndex: -1,
      projectIndex: -1,
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
      checkUnitList: [],
      projectList: [],
      itemList: [],
      isPhysicalClose: 0,
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
  created() {
    this.isCollege = this.$route.query.isCollege
    console.log(this.isCollege)
    this.fetchData()
  },
  methods: {
    switchChange(e) {
      if (e.value === true) {
        this.showProject = true
      } else if (e.value === false) {
        this.showProject = false
      }
    },
    show() {
      this.showDetail = !this.showDetail
    },
    fetchData() {
      physicalexaminationApply({
        perNum: this.$route.query.perNum
      }).then(res => {
        this.showProject = false
        if (res.re === 1) {
          this.isPhysicalClose = res.data.isPhysicalClose
          console.log(this.isPhysicalClose)
          this.form = res.data.form
          this.checkUnitIndex = res.data.checkUnitIndex
          this.checkUnitList = res.data.checkUnitList
          this.projectIndex = res.data.projectIndex
          this.projectList = res.data.projectList
          this.itemList = res.data.itemList
          console.log(this.itemList)
          this.isLoading = false
        } else {
          console.log(res)
          this.isLoading = false
        }
      })
    },
    bindPickerGenderChange() {
      console.log(this.form.genderCode)
    },
    bindPickerMarryChange() {
      console.log(this.form.marryState)
    },
    bindTimeChangePerBirth(e) {
      this.form.perBirth = e.target.value
    },
    bindchangeCheckUnit(e) {
      // this.checkUnitIndex = e.target.value
      // this.form.checkUnit = this.checkUnitList[this.checkUnitIndex].value
      this.form.projectId = ''

      physicalexaminationApplyProjectList({
        checkUnit: this.form.checkUnit,
        baseCheck: this.form.baseCheck,
        genderCode: this.form.genderCode,
        marryState: this.form.marryState,
        perBirth: this.form.perBirth

      }).then(res => {
        this.projectIndex = res.data.projectIndex
        this.projectList = res.data.projectList
        this.itemList = res.data.itemList
      })
    },
    bindchangeProject() {
      physicalexaminationApplyProjectItemList({
        projectId: this.form.projectId
      }).then(res => {
        this.itemList = res.data
      })
    },
    doSubmit() {
      if (this.form.mobilePhone === undefined || this.form.mobilePhone === '') {
        this.isLoading = false
        this.$message({
          message: '手机号不能为空！',
          showCancel: false
        })
      } else if (this.form.checkUnit === '0000' || this.form.projectId === '0') {
        this.isLoading = false
        this.$message({
          message: '没有选择查体单位和查体套餐，不能提交！',
          showCancel: false
        })
      } else {
        physicalexaminationApplySubmit({
          form: this.form
        }).then(res => {
          if (res.re === 1) {
            var flag = this
            this.$message({
              message: '保存成功',
              showCancel: false
            })
            if (flag.isCollege === '1') {
              this.$router.push({ path: 'medicareExaminationQuery' })
            } else {
              this.$router.push({ path: 'medicareApplyView' })
            }
          } else {
            this.isLoading = false
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
