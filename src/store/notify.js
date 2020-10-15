import loadMore from '../assets/js/loadMore'
import axios from 'axios'
export default {

    state: {
        messages: [],
        messagesMain: [],

    },
    mutations: {
        setMessage(state, payload) {
            state.messages = payload
        },
        setMessageMain(state, payload) {
            state.messagesMain = payload
        },
        setMessageEmpty(state) {
            state.messages = []
        },
        setMessageMainEmpty(state) {
            state.messagesMain = []
        },
        pushMessages(state, payload) {
            state.messages.push(payload)
        },
        pushMessagesMain(state, payload) {
            state.messagesMain.push(payload)
        },
        loadMessages(state, payload) {
            state.messagesMain = [...state.messagesMain, ...payload]
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
                })
                .finally(() => (dispatch('setLoading', false, { root: true })))
        },
        setMessageMain({ commit }, payload) {
            commit('setMessageMain', payload)
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
        pushMessages({ commit }, payload) {
            commit('pushMessages', payload)
        },
        pushMessagesMain({ commit }, payload) {
            commit('pushMessages', payload)
        }
    },
    getters: {
        getMessage(state) {
            return state.messages
        },
        getMessageMain(state) {
            return state.messagesMain
        },
        getMessageEmpty(state) {
            return state.messages
        },
        getMessageMainEmpty(state) {
            return state.messagesMain
        },
        getMessageFilter(state) {
            return state.messages.filter(mes => {
                return mes.main === false
            })
        },

    },

}