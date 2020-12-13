<template>
  <div >
    <table class="content"  >
      <tr >
        <td colspan="1" style="font-size: 26px;font-weight: bold;color: #304156 ">系统通知 </td>
      </tr>
      <tr v-if="perTypeCode==='3'" >
        <td  colspan="1" style="font-size: 23px;color: #304156 ;text-align: left"> 教师登录平台，核对个人信息完成后。
          <p>（1）体检报名，完善必填的信息选择体检医院和体检套餐后点击提交可完成体检报名，在报名结束前可以多次修改提交。</p>
          <p>（2）报名信息查看，可查看当年选择的体检套餐和体检项目。</p>
          <p>（3）体检报告查看，可以下载打印已经上传系统的体检报告。</p>
          <p>（4）报名开始时间为{{applyStartTime}}，结束时间为{{applyEndTime}}，请在规定时间报名，其他时间只能查看报名信息和体检报告</p>
        </td>
      </tr>
      <tr v-else >
        <td  colspan="1" style="font-size: 23px;color: #304156 ;text-align: left"> 学生登录平台，核对个人信息完成后，自主选择缴费方式。
          <p>（1）个人缴费：参加本年度医疗保险的学生，选择缴费方式为个人缴费，并提交。</p>
          <p>（2）学校代缴：学生进入系统核对个人信息即可，无需缴费，无需提交。</p>
          <p>（3）弃保：弃保的学生，缴费方式选择：“弃保”并提交。《弃保申明书》并签字，上交学院及学校存档。</p>
          <p>（4）报名开始时间为{{applyStartTime}}，结束时间为{{applyEndTime}}，请在规定时间报名，其他时间只能查看报名缴费信息</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

import { getSystemNoticeInfo } from '@/api/medicare'
export default {
  name: 'Dashboard',
  data() {
    return {
      perTypeCode:'3',
      applyStartTime:'',
      applyEndTime:''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getSystemNoticeInfo().then(res => {
        if (res.re === 1) {
            this.perTypeCode = res.data.perTypeCode
            this.applyStartTime = res.data.applyStartTime
            this.applyEndTime = res.data.applyEndTime
        } else {
          console.log(res)
        }
      })
    }
  }
}
</script>
