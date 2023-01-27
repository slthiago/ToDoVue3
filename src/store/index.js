import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
	todos: []
  },
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload
    },

    //função adiciona o payload(valor) ao array de todos e atualiza a lista
    storeTodo(state, payload) {
      //index recebe o valor de id do payload caso seja igual ao id da todo
      const index = state.todos.findIndex(todo => todo.id === payload.id)
      //se index for >= 0, quer dizer que esse payload já existe no array todo
      //então é feito um splice no array, ATUALIZANDO somente aquele valor com index informado
      if (index >= 0) {
        state.todos.splice(index, 1, payload)
      }
      //se index for < 0, então o payload não existe no array e nesse caso é chamada
      //a função push que vai ACRESCENTAR um novo valor ao array de todos 
      else {
        state.todos.push(payload)
      }
    },

    deleteTodoMutation(state, id) {
      const index = state.todos.findIndex(todo => todo.id === id)

      if (index >= 0){
        state.todos.splice(index, 1)
      }
    }
  },
  actions: {
    getTodos({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
            return axios.get('http://localhost:3000/todos')
              .then((response) => {
                commit('storeTodos', response.data)
                resolve()
              })
        }, 1000)
      })
    },

    addTodo({ commit }, data) {
      return axios.post('http://localhost:3000/todos', data).then((response) => {
        //o commit vai chamar a mutation que insere o valor no state todo
        //ele pega o valor que vem da requisição de post addTodo
        commit('storeTodo', response.data)
      })
    },

    updateTodo({ commit }, { id, data }) {
      return axios.put(`http://localhost:3000/todos/${id}`, data).then((response) => {
        //esse then pega a resposta da requisição e comita no storeTodo para sincronizar
        //os dados do vuex
        commit('storeTodo', response.data)
      })
    },
    
    deleteTodo({ commit }, id) {
      return axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
        commit('deleteTodoMutation', id)
      })
    },
    
  },
  modules: {
  }
})
