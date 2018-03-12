import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  userCred: {},
  isAuth: false,
}

const getters = {
  getUserState: state => {
    return state.userCred
  },
  isLoggedIn: state => {
    return state.isAuth
  }
}

const mutations = {

  authLogin(state, resp) {
    state.isAuth = true
    state.userCred = resp
  },
  authLogout(state, resp) {
    state.isAuth = false
    state.userCred = null
    state.searchResult = null 
    state.allUsers = null
    localStorage.clear();
  },
  updateUserState(state, resp) {
    state.userCred = resp
  },
  setupSearchResult(state, resp) {
    state.searchResult = resp
  }, 
  
  clearSearchResult(state){
    state.searchResult = null 
  },
  setupSearch(state){
    state.searchIsOngoing = true
  },
  clearSearch(state){
    state.searchIsOngoing = false
  },
  setupAllUsers(state, resp){
      state.allUsers = resp
  },
  keepPendingPoll(state, resp){
    state.pendingPoll = resp
  },
  clearPendingPoll(state){
    state.pendingPoll = null
  },
  


}

const actions = {

  login: (context, user) => {

    axios.post('http://localhost:4000/api/auth/login', user).then(response => {

      const stringifiedUserID = JSON.stringify(response.data.user.userID)

      localStorage.setItem('userID', stringifiedUserID)
      localStorage.setItem('userToken', response.data.token)

      context.commit('authLogin', response.data.user)

    }).catch(e => {
      throw (e)
    })


  },

  getUserState: (context, payload) => {
  
    axios.get(`http://localhost:4000/api/user/${payload}`).then(response => {
      context.commit('updateUserState', response.data)
    }).catch(e => {
      throw (e)
    })

  },

  getAllUsers: (context, payload) =>{
      axios.get('http://localhost:4000/api/users/all').then(response=>{
          context.commit('setupAllUsers', response.data)
      })
  },


  follow: (context, payload) => {
    axios.post('http://localhost:4000/api/user/follow', payload).then(response => {

      context.commit('updateUserState', response.data.follower)
      context.commit('setupSearchResult', response.data.followed)
    }).catch(e => {
        throw (e)
      })
  },
  unfollow: (context, payload) => {
    axios.post('http://localhost:4000/api/user/unfollow', payload).then(response => {

      context.commit('updateUserState', response.data.unfollower)
      context.commit('setupSearchResult', response.data.unfollowed)

    }).catch(e => {
        throw (e)
      })
  }, 

  selectUser: (context, payload) =>{
    axios.get(`http://localhost:4000/api/user/${payload}`).then(response=>{
      console.log(response.data)
      context.commit('setupSearchResult', response.data)
    })
  }


}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
})
