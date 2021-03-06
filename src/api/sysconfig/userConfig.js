import ApiComm from '../ApiComm'

export default {
  getModifiableUser: () => {
    return ApiComm.$http.get('/oauth/moduserlist')
  },
  query: (query) => {
    return ApiComm.$http.post('/oauth/user', query)
  },
  delete: (idList) => {
    return ApiComm.$http.delete('/oauth/user', {
      data: idList
    })
  },
  create: (userInfo) => {
    return ApiComm.$http.put('/oauth/user', userInfo)
  },
  update: (userInfo) => {
    return ApiComm.$http.patch('/oauth/user', userInfo)
  },
  resetPwd: (userId) => {
    return ApiComm.$http.get('/oauth/user/resetpwd/' + userId)
  }
}
