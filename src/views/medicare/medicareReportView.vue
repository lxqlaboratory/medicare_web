<template>
  <div class="app-container">
    <div align="center" style="font-size: 26px;font-weight: bold;color: #304156 ">体检报告记录 </div>
    <el-table
      :data="list.dataList"
      border
      fit
      highlight-current-row
      stripe
      style="margin-top: 15px;"
      v-loading="onLoading"
    >
      <el-table-column align="center" label="姓名" min-width="8">
        <template slot-scope="scope">
          {{list.perName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="工号" min-width="8">
        <template slot-scope="scope">
          {{list.perNum}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证号" min-width="8">
        <template slot-scope="scope">
          {{list.perIdCard}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="年度" min-width="8">
      <template slot-scope="scope">
        {{scope.row.year}}
      </template>
    </el-table-column>
      <el-table-column align="center" label="体检券" min-width="8">
        <template slot-scope="scope">
          {{scope.row.baseCheck}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请状态" min-width="8">
      <template slot-scope="scope">
        {{scope.row.applyState}}
      </template>
    </el-table-column>
      <el-table-column align="center" label="查体单位" min-width="8">
        <template slot-scope="scope">
          {{scope.row.checkUnit}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="基本套餐" min-width="8">
        <template slot-scope="scope">
          {{scope.row.projectName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="25">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isCheck===true" size="mini" type="primary">
            <a :href="serverAddres+'/func/medicare/physicalexaminationReportDownload?year='+scope.row.year+'&&perIdCard='+perIdCard+'&&type='+type1" download="查体报告.pdf">查体报告下载</a></el-button>
          <el-button v-else style="color: black;">未上传查体报告</el-button>
          <el-button v-if="scope.row.isAssess===true" style="margin-left: 50px;"  size="mini" type="primary">
            <a :href="serverAddres+'/func/medicare/physicalexaminationReportDownload?year='+scope.row.year+'&&perIdCard='+perIdCard+'&&type='+type2 " download="评估报告.pdf">评估报告下载</a>
            </el-button>
          <el-button v-else style="color: black;margin-left: 50px;">未上传评估报告</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {physicalexaminationReportView } from '@/api/medicare'
  export default {
    name: 'medicareReportView',
    data() {
      return {
        serverAddres:'',
        type1: '',
        type2: '',
        list:{
          perNum: '',
          perName: '',
          perIdCard: '',
          dataList: []
        }

      }
    },
    created() {
      this.type1 = 'check'
      this.type2 = 'assess'
      this.serverAddres = this.GLOBAL.servicePort
      physicalexaminationReportView().then(res => {
        this.list = res.data
        this.perIdCard = res.data.perIdCard
        this.list.dataList = res.data.dataList
      });
    },
    methods: {

      }

  }
</script>
