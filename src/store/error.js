export default {

    state: {
        error: false,
        message: null
    },
    mutations: {
        setError(state, errorMessage) {
            state.error = true
            state.message = errorMessage
            alert(errorMessage)
        }
    },
    actions: {
        setError({ commit }, errorMessage) {
            commit('setError', errorMessage)
        }
    },
    getters: {
        getError: state => state.error,
        getmessage: state => state.message
    },
}