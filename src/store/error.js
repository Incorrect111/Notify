export default {

    state: {
        error: false,
        errorName: null
    },
    mutations: {
        setError(state, payload) {
            state.error = true
            state.errorName = payload
            alert(payload)
        }
    },
    actions: {
        setError({ commit }, payload) {
            commit('setError', payload)
        }
    },
    getters: {
        getError(state) {
            return state.error
        },
        getErrorName(state) {
            return state.errorName
        }
    },
}