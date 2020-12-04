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
          <el-button v-if="scope.row.isCheck===true" @click="donlowdExamReport(scope.row.year,'check')" size="mini" type="primary">查体报告下载</el-button>
          <el-button v-else style="color: black;">未上传查体报告</el-button>
          <el-button v-if="scope.row.isAssess===true" style="margin-left: 50px;" @click="donlowdExamReport(scope.row.year,'assess')" size="mini" type="primary">评估报告下载</el-button>
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
        list:{
          perNum: '',
          perName: '',
          perIdCard: '',

          dataList: [],
        }

      }
    },
    created() {
      physicalexaminationReportView().then(res => {
        console.log("aa"+res.data.perName)
        this.list = res.data
        this.list.dataList = res.data.dataList
      });
    },
    methods: {
      donlowdExamReport(year, type) {
        wx.downloadFile({
          url: getApp().globalData.medicareurl + '/medicare/physicalexaminationReportDownload?year=' + year +
            '&perIdCard=' + this.perIdCard + '&type=' + type,
          header: {
            "Content-Type": "application/json",
            "Cookie": "JSESSIONID=" + getApp().globalData.vueSessionId
          },

          success: (res) => {
            if (res.statusCode === 200) {
              var filePath = res.tempFilePath;
              console.log(filePath);
              wx.openDocument({
                filePath: filePath,
                fileType: 'pdf',
                showMenu:true,
                success: function(res) {
                  console.log('打开文档成功')
                },
                fail: function(res) {
                  console.log(res);
                },
                complete: function(res) {
                  console.log(res);
                }
              })


              this.$message({
                message: '下载成功',
                type: 'success',
                offset: '10'
              })
            }
          }
        });
      }
    },
  }
</script>
