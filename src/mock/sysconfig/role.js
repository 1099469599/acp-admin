export const getRoleCodeList = () => {
  return ['OTHER', 'ADMIN', 'TEST']
}
export const getRoleList = () => {
  return [{
    'id': 'dbe88dbc-19fb-11e9-894e-d8c49792dd7b',
    'appid': 'dbd1458a-19fb-11e9-894e-d8c49792dd7b',
    'name': '超级管理员',
    'code': 'ADMIN',
    'levels': 0,
    'sort': 0
  }, {
    'id': 'b09d505f-1bf2-11e9-a49e-d8c49792dd7b',
    'appid': 'aa4da240-1bf2-11e9-a49e-d8c49792dd7b',
    'name': '新角色',
    'code': 'OTHER',
    'levels': 999,
    'sort': 1
  }, {
    'id': 'fd3bb9d8-1bf1-11e9-a49e-d8c49792dd7b',
    'appid': 'dbd1458a-19fb-11e9-894e-d8c49792dd7b',
    'name': '测试人员',
    'code': 'TEST',
    'levels': 1,
    'sort': 1
  }]
}
export const getRoleInfo = () => {
  return {
    'id': 'fd3bb9d8-1bf1-11e9-a49e-d8c49792dd7b',
    'appid': 'dbd1458a-19fb-11e9-894e-d8c49792dd7b',
    'name': '测试人员',
    'code': 'TEST',
    'levels': 1,
    'sort': 1,
    'user_ids': [],
    'menu_ids': ['dbdc0cd5-19fb-11e9-894e-d8c49792dd7b', 'dbdd18fc-19fb-11e9-894e-d8c49792dd7b', 'dbdc4e5a-19fb-11e9-894e-d8c49792dd7b', 'dbdba3bf-19fb-11e9-894e-d8c49792dd7b', 'dbdc90b0-19fb-11e9-894e-d8c49792dd7b', 'dbdcd7a2-19fb-11e9-894e-d8c49792dd7b'],
    'module_func_ids': []
  }
}
export const updateRole = () => {
  return {
    'id': 'fd3bb9d8-1bf1-11e9-a49e-d8c49792dd7b',
    'appid': 'dbd1458a-19fb-11e9-894e-d8c49792dd7b',
    'name': '测试人员',
    'code': 'TEST',
    'levels': 1,
    'sort': 1
  }
}
export const deleteRole = () => {
  return {
    message: '删除成功'
  }
}
export const getRoleListOption = () => {
  return [{
    'id': 'e9bdd38d-1bf7-11e9-a49e-d8c49792dd7b',
    'appid': 'aa4da240-1bf2-11e9-a49e-d8c49792dd7b',
    'name': '新角色',
    'code': 'OTHER',
    'levels': 999,
    'sort': 1
  }]
}
