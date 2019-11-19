const state = {
    nm: window.localStorage.getItem('nowNm') || '北京',  // 如果有本地缓存则是该缓存，否则是北京
    id: window.localStorage.getItem('nowId') || 1
}

const mutations = {
   CITY_INFO(state, payload) {
        state.nm = payload.nm;
        state.id = payload.id;
    }
}

const actions = {
     
}

export default {
    namespaced: true,
    mutations,
    state,
    actions
}