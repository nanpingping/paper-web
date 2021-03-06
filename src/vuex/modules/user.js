import UserAPI from '@/api/user'

const user = {
  state: {
    isLogin: false,
    userName: '',
    type: '',
    uuid: '',
    nickname: '',
    newFlag: '' // 1代表新用户
  },

  mutations: {
    SET_USERNAME: (state, userName) => {
      state.userName = userName
    },
    SET_ISLOGIN: (state, isLogin) => {
      state.isLogin = isLogin
    },
    SET_TYPE: (state, type) => {
      state.type = type
    },
    SET_UUID: (state, uuid) => {
      state.uuid = uuid
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_NEWFLAG: (state, newFlag) => {
      state.newFlag = newFlag
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        UserAPI.login(userInfo).then(response => {
          if (response && response.data && response.data.successful) {
            // debugger
            const data = response.data.data
            commit('SET_USERNAME', data.userName)
            commit('SET_TYPE', data.type)
            commit('SET_UUID', data.uuid)
            commit('SET_ISLOGIN', true)
            commit('SET_NICKNAME', data.nickname)
            commit('SET_NEWFLAG', data.newFlag)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USERNAME', '')
        commit('SET_TYPE', '')
        commit('SET_UUID', '')
        commit('SET_ISLOGIN', false)
        commit('SET_NICKNAME', '')
        commit('SET_NEWFLAG', '')
        resolve()
      })
    }
  }
}

export default user
