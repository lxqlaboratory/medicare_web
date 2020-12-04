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
          {{ form.perName }}
        </td>
        <td colspan="1">套餐类型</td>
        <td colspan="2">
          {{ form.projectName }}
        </td>
      </tr>
      <tr>
        <td colspan="1" width="200">查体单位</td>
        <td colspan="2">{{ form.checkName }}</td>
        <td colspan="1">体检地点</td>
        <td colspan="2">
          {{ form.checkPlace }}
        </td>

      </tr>
      <tr>
        <td colspan="1">友情提示</td>
        <td colspan="2">
          aaaaaaa
        </td>
        <td colspan="1">注意事项</td>
        <td colspan="2">
          啊啊啊
        </td>
      </tr>
      <tr>
        <td colspan="1">查体项目</td>
        <td colspan="5">
          aaaa
        </td>
      </tr>

    </table>
    <div align="center">
      <el-button type="primary" :disabled="isDisable" @click="doSubmit">联系电话</el-button>
    </div>

  </div>
</template>

<script>
  import { physicalexaminationApplySubmit } from '@/api/medicare'
  export default {
    name: 'medicareApplyView',
    data() {
      return {
        showBank:false,
        form: {
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
        isDisable: false
      }
    },
    created() {
    },
    methods: {
      doSubmit() {
        if(this.form.mobilePhone===undefined || this.form.mobilePhone==='') {
          this.isLoading = false
          this.$message({
            message: '手机号不能为空',
            type: 'success',
            offset: '10'
          })
        }else if(this.form.checkUnit==='0000' || this.form.projectId==='0') {
          this.isLoading = false
          this.$message({
            message: '没有选择查体单位和查体套餐，不能提交',
            type: 'success',
            offset: '10'
          })
        }else {
          physicalexaminationApplySubmit({
            form: this.form,
          }).then(res => {
            console.log(res)
            if(res.re===1){
              this.$message({
                message: '保存成功',
                type: 'success',
                offset: '10'
              })
              if (res.confirm) {
                if(flag.isCollege==='1') {
                  this.$router.push({name:'medicareReportView'})
                }else {
                  this.$router.push({name:'medicareApplyView'})
                }
              }
            } else{
              this.$message({type: 'error', message: res.data})
            }

          }).catch(err => {})
        }
      },
      bandChange(e){
        this.form.secondPerType = e
        if(this.form.secondPerType === '12' ||this.form.secondPerType === undefined || this.form.secondPerType === '13'||this.form.secondPerType === '14'||this.form.secondPerType === '21'||this.form.secondPerType === '31'){
          this.showBank = true
        }else {
          this.showBank = false
        }
      },

    }
  }
</script>
