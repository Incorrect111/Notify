import loadMore from '../assets/js/loadMore'
import axios from 'axios'
export default {

    state: {
        messages: [],
        messagesMain: [],

    },
    mutations: {
        setMessage(state, message) {
            state.messages = message
        },
        setMessageMain(state, messageMain) {
            state.messagesMain = messageMain
        },
        setMessageEmpty(state) {
            state.messages = []
        },
        setMessageMainEmpty(state) {
            state.messagesMain = []
        },
        pushMessages(state, elOfArrayMesMainFalse) {
            state.messages.push(elOfArrayMesMainFalse)
        },
        pushMessagesMain(state, elOfArrayMesMainTrue) {
            state.messagesMain.push(elOfArrayMesMainTrue)
        },
        loadMessages(state, resOfLoadmoreFunction) {
            state.messagesMain = [...state.messagesMain, ...resOfLoadmoreFunction]
        },
    },

    actions: {
        setMessageLazy: ({ dispatch }) => {
            dispatch('setLoading', true)
            setTimeout(() => {
                dispatch('setMessage')
            }, 1800)
            console.log('setMessageLazy')
        },

        setMessage({ commit, dispatch }) {
            dispatch('setLoading', true, { root: true })
            axios
                .get('https://tocode.ru/static/c/vue-pro/notifyApi.php')
                .then(response => {
                    let res = response.data.notify
                    commit('setMessageEmpty')
                    commit('setMessageMainEmpty')

                    for (let i = 0; i < res.length; i++) {
                        if (res[i].main) commit('pushMessagesMain', res[i])
                        else commit('pushMessages', res[i])
                    }
                })
                .catch(error => {
                    dispatch('setError', 'Error: Network error')
                    dispatch('setLoading', false)
                })
                .finally(() => (dispatch('setLoading', false, { root: true })))
        },
        setMessageMain({ commit }, messageMain) {
            commit('setMessageMain', messageMain)
        },
        setMessageMainEmpty({ commit }) {
            commit('setMessageMainEmpty')
        },
        setMessageEmpty({ commit }) {
            commit('setMessageMainEmpty')
        },
        loadMessages({ commit, getters }) {
            let res = getters.getMessageFilter
            commit('loadMessages', loadMore(res))
        },
        pushMessages({ commit }, elOfArrayMesMainFalse) {
            commit('pushMessages', elOfArrayMesMainFalse)
        },
        pushMessagesMain({ commit }, elOfArrayMesMainTrue) {
            commit('pushMessages', elOfArrayMesMainTrue)
        }
    },
    getters: {
        getMessage: state => state.messages,
        getMessageMain: state => state.messagesMain,
        getMessageEmpty: state => state.messages,
        getMessageMainEmpty: state => state.messagesMain,
        getMessageFilter: state => state.messages.filter(mes => mes.main === false)
    },

}