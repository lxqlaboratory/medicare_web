import request from '@/utils/request'

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
