
import request from '@/utils/request'

//在线评阅
export function personBaseInfoMaintainInit(data) {
  return request({
    url: '/person/personBaseInfoMaintainInit',
    method: 'POST',
    data
  })
}
export function personBaseInfoMaintain(data) {
    return request({
      url: '/person/personBaseInfoMaintain',
      method: 'POST',
      data
    })
  }



export function getEnrollProjectInstanceList(data) {
  return request({
    url: '/enroll/getEnrollProjectInstanceList',
    method: 'POST',
    data
  })
}
export function enrollProjectInstanceApply(data) {
  return request({
    url: '/enroll/enrollProjectInstanceApply',
    method: 'POST',
    data
  })
}
export function enrollProjectInstanceItemSubmit(data) {
  return request({
    url: '/enroll/enrollProjectInstanceItemSubmit',
    method: 'POST',
    data
  })
}


export function getEnrollProjectInstanceListOfManage(data) {
  return request({
    url: '/enroll/getEnrollProjectInstanceListOfManage',
    method: 'POST',
    data
  })
}

export function getEnrollProjectInstanceAndItemList(data) {
  return request({
    url: '/enroll/getEnrollProjectInstanceAndItemList',
    method: 'POST',
    data
  })
}
export function getEnrollItemPersonList(data) {
  return request({
    url: '/enroll/getEnrollItemPersonList',
    method: 'POST',
    data
  })
}



export function enrollItemPersonApplyCancel(data) {
  return request({
    url: '/enroll/enrollItemPersonApplyCancel',
    method: 'POST',
    data
  })
}


export function getSelectPersonList(data) {
  return request({
    url: '/person/getSelectPersonList',
    method: 'POST',
    data
  })
}

export function enrollItemPersonApplyAdd(data) {
  return request({
    url: '/enroll/enrollItemPersonApplyAdd',
    method: 'POST',
    data
  })
}

export function getEnrollProjectInfoListOfManage(data) {
  return request({
    url: '/enroll/getEnrollProjectInfoListOfManage',
    method: 'POST',
    data
  })
}
export function getEnrollProjectInstanceListOfProject(data) {
  return request({
    url: '/enroll/getEnrollProjectInstanceListOfProject',
    method: 'POST',
    data
  })
}
export function deleteEnrollProjectInstance(data) {
  return request({
    url: '/enroll/deleteEnrollProjectInstance',
    method: 'POST',
    data
  })
}
export function getEnrollProjectInstanceDetail(data) {
  return request({
    url: '/enroll/getEnrollProjectInstanceDetail',
    method: 'POST',
    data
  })
}
export function saveOrUpdateEnrollProjectInstance(data) {
  return request({
    url: '/enroll/saveOrUpdateEnrollProjectInstance',
    method: 'POST',
    data
  })
}
export function deleteEnrollInstanceItem(data) {
  return request({
    url: '/enroll/deleteEnrollInstanceItem',
    method: 'POST',
    data
  })
}
export function getEnrollInstanceItemDetail(data) {
  return request({
    url: '/enroll/getEnrollInstanceItemDetail',
    method: 'POST',
    data
  })
}

export function saveOrUpdateEnrollInstanceItem(data) {
  return request({
    url: '/enroll/saveOrUpdateEnrollInstanceItem',
    method: 'POST',
    data
  })
}

export function getApplyedEnrollInstanceItemList(data) {
  return request({
    url: '/enroll/getApplyedEnrollInstanceItemList',
    method: 'POST',
    data
  })
}

export function getApplyedEnrollInstanceItem(data) {
  return request({
    url: '/enroll/getApplyedEnrollInstanceItem',
    method: 'POST',
    data
  })
}
export function deleteItemPerson(data) {
  return request({
    url: '/enroll/deleteItemPerson',
    method: 'POST',
    data
  })
}

export function saveEnrollInstanceItem(data) {
  return request({
    url: '/enroll/saveEnrollInstanceItem',
    method: 'POST',
    data
  })
}


export function updateEnrollInstanceItem(data) {
  return request({
    url: '/enroll/updateEnrollInstanceItem',
    method: 'POST',
    data
  })
}


export function deleteEnrollInstanceItemC(data) {
  return request({
    url: '/enroll/deleteEnrollInstanceItemC',
    method: 'POST',
    data
  })
}


export function enrollInstancePersonListInit(data) {
  return request({
    url: '/enroll/enrollInstancePersonListInit',
    method: 'POST',
    data
  })
}


export function enrollInstancePersonListQuery(data) {
  return request({
    url: '/enroll/enrollInstancePersonListQuery',
    method: 'POST',
    data
  })
}

export function enrollInstancePersonListCheck(data) {
  return request({
    url: '/enroll/enrollInstancePersonListCheck',
    method: 'POST',
    data
  })
}

export function enrollInstancePersonListMessage(data) {
  return request({
    url: '/enroll/enrollInstancePersonListMessage',
    method: 'POST',
    data
  })
}
export function enrollInstancePersonListImport(data) {
  return request({
    url: '/enroll/enrollInstancePersonListImport',
    method: 'POST',
    data
  })
}

