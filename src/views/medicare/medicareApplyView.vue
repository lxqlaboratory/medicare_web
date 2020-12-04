<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 26px;font-weight: bold;color: #304156 ">您已成功报名 </td>
      </tr>
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">个人基本信息</td>
      </tr>
      <tr>
        <td colspan="1">您的姓名</td>
        <td colspan="2">
          {{ perName }}
        </td>
        <td colspan="1">体检地点</td>
        <td colspan="2">
          {{ checkPlace }}
        </td>
      </tr>
      <tr>
        <td colspan="1" width="200">查体单位</td>
        <td colspan="2">{{ checkName }}</td>
        <td colspan="1">套餐类型</td>
        <td colspan="2">
          {{ projectName }}
        </td>

      </tr>
      <tr>
        <td colspan="1" width="200">{{filterKey}}</td>
        <td colspan="5" style="height: 50px">{{ projectSet }}</td>

      </tr>
    </table>
    <table class="content2">

      <td style="font-size: 18px;font-weight: bold;color: #304156 ">友情提示: </td>
      <tr v-for="(items,index) in promptList"  :key="index">
        <td colspan="6" >{{ items }} </td>
      </tr>
    </table>
    <table class="content2">
      <td style="font-size: 18px;font-weight: bold;color: #304156 ">注意事项: </td>
      <tr v-for="(items,index) in noticeList" :key="index">
        <td colspan="6" >{{ items }} </td>
      </tr>
    </table>
    <table class="content2">
      <td style="font-size: 18px;font-weight: bold;color: #304156 ">查体项目: </td>
      <tr v-for="(items,index) in itemList" :key="index">
        <td colspan="6" >{{ items }} </td>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary">联系电话：{{this.checkTelephone}}</el-button>
    </div>

  </div>
</template>

<script>
import { physicalexaminationApplyView } from '@/api/medicare'
export default {
  name: 'MedicareApplyView',
  data() {
    return {
      perName: '',
      checkName: '',
      projectName: '',
      checkPlace: '',
      checkTelephone: '',
      promptList: [],
      projectList: [],
      projectSet: '',
      filterKey: '',
      noticeList: [],
      itemList: [],
      year: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      physicalexaminationApplyView().then(res => {
        if (res.re === 1) {
          this.perName = res.data.perName
          this.checkName = res.data.checkName
          this.checkPlace = res.data.checkPlace
          this.checkTelephone = res.data.checkTelephone
          this.projectName = res.data.projectName
          this.promptList = res.data.promptList
          this.noticeList = res.data.noticeList
          this.itemList = res.data.itemList
          this.projectList =  res.data.projectOptionList[1]
          this.filterKey = this.projectList[0].label
          this.projectSet = this.projectList[0].enLabel
          this.isLoading = false
        } else {
          console.log(res)
          this.isLoading = false
        }
      })
    }
  }
}
</script>
