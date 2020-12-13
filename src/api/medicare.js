import request from '@/utils/request'

export function getSystemNoticeInfo() {
  return request({
    url: '/medicare/getSystemNoticeInfo',
    method: 'POST',
    data: {}
  })
}

export function physicalexaminationApplySubmit(data) {
  return request({
    url: '/medicare/physicalexaminationApplySubmit',
    method: 'POST',
    data: data
  })
}
export function physicalexaminationApplyProjectItemList(data) {
  return request({
    url: '/medicare/physicalexaminationApplyProjectItemList',
    method: 'POST',
    data: data
  })
}
export function physicalexaminationApplyProjectList(data) {
  return request({
    url: '/medicare/physicalexaminationApplyProjectList',
    method: 'POST',
    data: data
  })
}
export function physicalexaminationApply(data) {
  return request({
    url: '/medicare/physicalexaminationApply',
    method: 'POST',
    data: data
  })
}

export function physicalexaminationReportView(perNum) {
  return request({
    url: '/medicare/physicalexaminationReportView',
    method: 'POST',
    data: { perNum }
  })
}
export function physicalexaminationApplyView() {
  return request({
    url: '/medicare/physicalexaminationApplyView',
    method: 'POST',
    data: {}
  })
}
export function collegePhysicalExaminationQuery() {
  return request({
    url: '/medicare/collegePhysicalExaminationQuery',
    method: 'POST',
    data: {}
  })
}
export function collegePhysicalExaminationInfoList(checkUnit) {
  return request({
    url: '/medicare/collegePhysicalExaminationInfoList',
    method: 'POST',
    data: {checkUnit}
  })
}
export function studentMedicareApply(data) {
  return request({
    url: '/medicare/studentMedicareApply',
    method: 'POST',
    data
  })
}
export function studentMedicareApplySubmit(data) {
  return request({
    url: '/medicare/studentMedicareApplySubmit',
    method: 'POST',
    data
  })
}
export function studentMedicareApplyView(data) {
  return request({
    url: '/medicare/studentMedicareApplyView',
    method: 'POST',
    data: {data}
  })
}
export function collegeMedicareApplyQuery(data) {
  return request({
    url: '/medicare/collegeMedicareApplyQuery',
    method: 'POST',
    data:data
  })
}
export function collegeMedicareApplyInfoList(data) {
  return request({
    url: '/medicare/collegeMedicareApplyInfoList',
    method: 'POST',
    data:data
  })
}
export function collegeMedicareApplyStatisticsList(data) {
  return request({
    url: '/medicare/collegeMedicareApplyStatisticsList',
    method: 'POST',
    data:data
  })
}
