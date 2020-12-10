<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 26px;font-weight: bold;color: #304156 ">研究生医保报名查询 </td>
      </tr>
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">年级
          <el-select v-model="grade" size="mini" @change="changeGrade">

            <el-option v-for="item in gradeList"
                       :key="item"
                       :label="item"
                       :value="item"> </el-option>
          </el-select>
        </td>
      </tr>
      <tr v-for="(item,index) in statisticsList" :key="index">
        <td colspan="1">缴费模式</td>
        <td colspan="1">{{ item.modelPayName }}</td>
        <td colspan="1">已缴费人数</td>
        <td colspan="1">{{ item.count1 }}<el-button style="margin-left: 30px;" @click="doDetail1(item)">查看</el-button></td>
        <td colspan="1">未缴费人数</td>
        <td colspan="1">{{ item.count0 }}<el-button style="margin-left: 30px;" @click="doDetail0(item)">查看</el-button></td>
      </tr>

    </table>
    <el-table
      v-show="disabled"
      v-loading="onLoading"
      :data="personList"
      border
      fit
      highlight-current-row
      stripe
      style="margin-top: 15px;"
    >
      <el-table-column align="center" label="学号" min-width="8">
        <template slot-scope="scope">
          {{ scope.row.perNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" min-width="8">
        <template slot-scope="scope">
          {{ scope.row.perName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级" min-width="8">
        <template slot-scope="scope">
          {{ scope.row.perClass }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系电话" min-width="8">
        <template slot-scope="scope">
          {{ scope.row.mobilePhone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="8">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push({ path: 'StudentMedicareApply', query: { 'perNum': scope.row.perNum ,'isCollege': '1' }} )
            "
          >报名</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { collegeMedicareApplyQuery,collegeMedicareApplyInfoList,collegeMedicareApplyStatisticsList } from '@/api/medicare'
export default {
  name: 'MasterMedicareApplyQuery',
  data() {
    return {
      gradeList:[],
      statisticsList: [],
      personList: [],
      collegeNum:'',
      grade:'',
      year:'',
      perTypeCode:'2',
      payStatus:'',
      modelPay:'',
      disabled: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {

    fetchData() {
      collegeMedicareApplyQuery({perTypeCode:this.perTypeCode}).then(res => {
        if (res.re === 1) {
          this.gradeList = res.data.gradeList
          this.statisticsList = res.data.statisticsList
          this.collegeNum = res.data.collegeNum
          this.grade = res.data.grade
          this.year= res.data.year
        } else {
          console.log(res)
        }
      })
    },
    changeGrade(item){
      this.disabled = false
      this.grade = item
      collegeMedicareApplyStatisticsList({
        perTypeCode:this.perTypeCode,
        grade:this.grade,
        year:this.year,
        collegeNum:this.collegeNum,
      }).then(res => {
        if (res.re === 1) {
          this.statisticsList = res.data.statisticsList
        } else {
          console.log(res)
        }
      })
    },
    doDetail0(item){
      collegeMedicareApplyInfoList({
        perTypeCode:this.perTypeCode,
        grade:this.grade,
        year:this.year,
        collegeNum:this.collegeNum,
        payStatus:'0',
        modelPay:item.modelPay
      }).then(res => {
        if (res.re === 1) {
          this.disabled = true
          this.personList = res.data
        } else {
          console.log(res)
        }
      })
    },
    doDetail1(item){
      collegeMedicareApplyInfoList({
        perTypeCode:this.perTypeCode,
        grade:this.grade,
        year:this.year,
        collegeNum:this.collegeNum,
        payStatus:'1',
        modelPay:item.modelPay
      }).then(res => {
        if (res.re === 1) {
          this.disabled = true
          this.personList = res.data
        } else {
          console.log(res)
        }
      })
    },
  }
}
</script>
