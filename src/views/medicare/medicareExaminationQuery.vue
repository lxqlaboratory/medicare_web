<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 26px;font-weight: bold;color: #304156 ">体检报名情况 </td>
      </tr>
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">各单位信息</td>
      </tr>
      <tr v-for="(item,index) in statisticsList" :key="index">
        <td colspan="1">查体单位</td>
        <td colspan="2">{{ item.checkUnitName }}
        </td>
        <td colspan="1">申请人数</td>
        <td colspan="1">{{ item.count }}</td>
        <td colspan="1"> <el-button type="primary" @click="doDetail(item.checkUnit)">查看</el-button></td>
      </tr>

    </table>
    <el-button v-if="personList.length> 0" size="mini" type="primary">
      <a :href="serverAddres+'/func/medicare/exportCollegePhysicalExaminationInfoList?checkUnit='+checkUnit" download="人员名单.xls">导出人员名单</a></el-button>
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
      <el-table-column align="center" label="工号" min-width="8">
        <template slot-scope="scope">
          {{ scope.row.perNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" min-width="8">
        <template slot-scope="scope">
          {{ scope.row.perName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="体检券" min-width="8">
        <template slot-scope="scope">
          {{ scope.row.baseCheck }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="套餐" min-width="8">
        <template slot-scope="scope">
          {{ scope.row.projectName }}
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
            @click="$router.push({ path: 'MedicareApply', query: { 'perNum': scope.row.perNum ,'isCollege': '1' }} )
            "
          >报名</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { collegePhysicalExaminationQuery, collegePhysicalExaminationInfoList } from '@/api/medicare'
export default {
  name: 'MedicareExaminationQuery',
  data() {
    return {
      statisticsList: [],
      personList: [],
      serverAddres:'',
      checkUnit: '00',
      disabled: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {

    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      collegePhysicalExaminationQuery().then(res => {
        if (res.re === 1) {
          this.statisticsList = res.data.statisticsList
          this.isLoading = false
        } else {
          console.log(res)
          this.isLoading = false
        }
      })
    },
    doDetail(checkUnit) {
      this.disabled = true
      this.checkUnit = checkUnit
      collegePhysicalExaminationInfoList(checkUnit).then(res => {
        if (res.re === 1) {
          this.personList = res.data
        } else {
          console.log(res)
        }
      })
    }

  }
}
</script>
