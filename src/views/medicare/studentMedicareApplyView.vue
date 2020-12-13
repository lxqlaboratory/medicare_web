<template>
  <div class="app-container">
    <table class="content">
      <tr >
        <td colspan="6" style="font-size: 26px;font-weight: bold;color: #304156 ">报名信息 </td>
      </tr>
      <tr style="height: 30px">
        <td colspan="1">学号</td>
        <td colspan="2">{{ form.perNum }}</td>
        <td colspan="1">姓名</td>
        <td colspan="2">
          {{ form.perName }}
        </td>
      </tr>
      <tr >
        <td colspan="1" width="200">身份证号</td>
        <td colspan="2">{{ form.perIdCard }}</td>
        <td colspan="1">*性别</td>
        <td colspan="2">
          <el-select disabled style="text-align-last: center;" v-model="form.genderCode" :value="form.genderCode" size="mini" class="elinput" @change="bindPickerGenderChange">
            <el-option
              v-for="item in genders"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </td>
      </tr>
      <tr style="height: 30px">
        <td colspan="1">*出生日期</td>
        <td colspan="2">
          <el-date-picker
            disabled
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
          {{form.mobilePhone}}
        </td>
      </tr>
      <tr style="height: 30px">
        <td colspan="1">所在学院</td>
        <td colspan="2">{{ form.collegeName }}</td>
        <td colspan="1">所学专业</td>
        <td colspan="2">
          {{ form.majorName }}
        </td>
      </tr>
      <tr style="height: 30px">
        <td colspan="1">所在年级</td>
        <td colspan="2">{{ form.grade }}</td>
        <td colspan="1">所在班级</td>
        <td colspan="2">
          {{ form.perClass }}
        </td>
      </tr>
      <tr style="height: 30px">
        <td colspan="1">缴费状态</td>
        <td colspan="2">{{ form.payStatus }}</td>
        <td colspan="1" >*缴费方式</td>
        <td colspan="2">{{form.modelPayName}}</td>
      </tr>
      <tr style="height: 30px">
        <td colspan="1">流水号</td>
        <td colspan="5">{{ form.insuredNumber }}</td>
      </tr>
    </table>

  </div>
</template>

<script>
import { studentMedicareApplyView } from '@/api/medicare'
export default {
  name: 'StudentMedicareApplyView',
  data() {
    return {
      genders: [{
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '女'
      }],
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
        insuredNumber: ''
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      studentMedicareApplyView().then(res => {
        if (res.re === 1) {
          this.form = res.data.form
        } else {
          console.log(res)
          this.isLoading = false
        }
      })
    }
  }
}
</script>
