export default {

    state: {
        loading: false
    },
    mutations: {
        setLoading(state, trueValue) {
            state.loading = trueValue
        }
    },
    actions: {
        setLoading({ commit }, trueValue) {
            commit('setLoading', trueValue)
        },

    },
    getters: {
        getLoading: state => state.loading
    },
}