<template>
  <div class="dashboard-container">
    <div class="portlet-title">
      <div class="caption font-darkblue bold" style=" text-align: center;">
        <span>系统通知</span>
      </div>
    </div>


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
