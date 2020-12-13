<template>
  <div >
    <table class="content" >
      <tr >
        <td colspan="6" style="font-size: 26px;font-weight: bold;color: #304156 ">系统通知 </td>
      </tr>
      <tr>
        <td colspan="6" style="font-size: 23px;color: #304156 ;text-align: left"> 学生登陆平台，核对个人信息完成后，自主选择缴费方式。
          <p>（1）参保：参加本年度医疗保险的学生，缴费方式选择：“校园卡缴费”或“现金缴费”并提交。</p>
          <p>（2）免费：此方式针对代缴及免缴的学生。学生进入系统核对个人信息即可，无需缴费，无需提交。</p>
          <p>（3）弃保：弃保的学生，缴费方式选择：“弃保”并提交。下载附件5.《弃保申明书》并签字，上交学院及学校存档。
          弃保后想重新入保的同学，需到学院管理员处进行现金缴费入保或者选择校园卡缴费入保。
          </p>（4）接健康中心通知：“弃保后想重新入保的同学，需到学院管理员处进行现金缴费入保或者选择校园卡缴费入保。”
          这一条仅是对本次集体报名登记工作期,初始选择“弃保”，随后又选择“参保”的学生，集体报名登记时间结束后，
          不再受理参保登记事宜！
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      noticeList: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {

    }
  }
}
</script>
