export const getModUserList = () => {
  return [{
    'id': '123',
    'name': 'test',
    'loginno': 'lll',
    'mobile': '111',
    'levels': 1,
    'enabled': true,
    'sort': 1,
    'organization_set': [],
    'organization_mng_set': [],
    'role_set': []
  }]
}
export const getUserList = () => {
  return {
    'content': [{
      'id': 'dbfd58aa-19fb-11e9-894e-d8c49792dd7b',
      'name': 'ZhangBin',
      'loginno': 'admin',
      'mobile': '13888888888',
      'levels': 0,
      'enabled': true,
      'sort': 0,
      'organization_set': [],
      'organization_mng_set': [],
      'role_set': [{
        'id': 'dbe88dbc-19fb-11e9-894e-d8c49792dd7b',
        'appid': 'dbd1458a-19fb-11e9-894e-d8c49792dd7b',
        'name': '超级管理员',
        'code': 'ADMIN',
        'levels': 0,
        'sort': 0
      }]
    }, {
      'id': '163c7453-1eef-11e9-8980-d8c49792dd7b',
      'name': 'test',
      'loginno': 'test',
      'mobile': '13888888881',
      'levels': 1,
      'enabled': true,
      'sort': 1,
      'organization_set': [{
        'parentid': 'a1f6bef2-1a76-11e9-894e-d8c49792dd7b',
        'children': [],
        'id': '386d4aae-1afc-11e9-a49e-d8c49792dd7b',
        'name': '新机构112',
        'code': '',
        'sort': 1
      }],
      'organization_mng_set': [{
        'parentid': 'a1f6bef2-1a76-11e9-894e-d8c49792dd7b',
        'children': [],
        'id': '386d4aae-1afc-11e9-a49e-d8c49792dd7b',
        'name': '新机构112',
        'code': '',
        'sort': 1
      }, {
        'parentid': 'a1f6bef2-1a76-11e9-894e-d8c49792dd7b',
        'children': [],
        'id': '99c30635-1ccb-11e9-a49e-d8c49792dd7b',
        'name': '新机构2',
        'code': '',
        'sort': 0
      }, {
        'parentid': 'root',
        'children': [],
        'id': 'a1f6bef2-1a76-11e9-894e-d8c49792dd7b',
        'name': '新机构1',
        'code': '',
        'sort': 1
      }],
      'role_set': [{
        'id': 'fd3bb9d8-1bf1-11e9-a49e-d8c49792dd7b',
        'appid': 'dbd1458a-19fb-11e9-894e-d8c49792dd7b',
        'name': '测试人员',
        'code': 'TEST',
        'levels': 1,
        'sort': 1
      }]
    }],
    'pageable': {
      'sort': { 'sorted': true, 'unsorted': false, 'empty': false },
      'offset': 0,
      'page_size': 10,
      'page_number': 0,
      'paged': true,
      'unpaged': false
    },
    'last': true,
    'total_pages': 1,
    'total_elements': 2,
    'size': 10,
    'number': 0,
    'sort': { 'sorted': true, 'unsorted': false, 'empty': false },
    'number_of_elements': 2,
    'first': true,
    'empty': false
  }
}
export const updateUser = () => {
  return {
    'id': '163c7453-1eef-11e9-8980-d8c49792dd7b',
    'name': 'test',
    'loginno': 'test',
    'mobile': '13888888881',
    'levels': 1,
    'enabled': true,
    'avatar': '/public/img/avatar.5d5d165b.jpg',
    'sort': 1,
    'organization_set': [{
      'parentid': 'a1f6bef2-1a76-11e9-894e-d8c49792dd7b',
      'children': [],
      'id': '386d4aae-1afc-11e9-a49e-d8c49792dd7b',
      'name': '新机构112',
      'code': '',
      'sort': 1
    }],
    'organization_mng_set': [{
      'parentid': 'a1f6bef2-1a76-11e9-894e-d8c49792dd7b',
      'children': [],
      'id': '99c30635-1ccb-11e9-a49e-d8c49792dd7b',
      'name': '新机构2',
      'code': '',
      'sort': 0
    }, {
      'parentid': 'root',
      'children': [],
      'id': 'a1f6bef2-1a76-11e9-894e-d8c49792dd7b',
      'name': '新机构1',
      'code': '',
      'sort': 1
    }, {
      'parentid': 'a1f6bef2-1a76-11e9-894e-d8c49792dd7b',
      'children': [],
      'id': '386d4aae-1afc-11e9-a49e-d8c49792dd7b',
      'name': '新机构112',
      'code': '',
      'sort': 1
    }],
    'role_set': [{
      'id': 'fd3bb9d8-1bf1-11e9-a49e-d8c49792dd7b',
      'appid': 'dbd1458a-19fb-11e9-894e-d8c49792dd7b',
      'name': '测试人员',
      'code': 'TEST',
      'levels': 1,
      'sort': 1
    }]
  }
}
export const deleteUser = () => {
  return {
    message: '删除成功'
  }
}
export const resetSuccess = () => {
  return {
    message: '操作成功'
  }
}
