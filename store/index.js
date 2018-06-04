import Vue from 'vue'
import Vuex from 'vuex'

import { fetchTodos } from '../api'

Vue.use(Vuex)

export const createStore = () => new Vuex.Store({
  state: {
    todos: [],
    newToto: ''
  },
  getters: {
    newTodo: state => state.newToto,
    todos: state => state.todos.filter(todo => {
      return !todo.completed
    }),
    completedTodos: state => state.todos.filter(todo => {
      return todo.completed
    })
  },
  mutations: {
    GET_TODO(state, todo) {
      state.newToto = todo
    },
    ADD_TODO(state, todo) {
      state.todos.push({
        body: state.newToto,
        completed: false
      })
    },
    ADD_TODOS(state, todos) {
      state.todos = state.todos.concat(todos);
    },
    EDIT_TODO(state, todo) {
      const todos = state.todos;
      todos.splice(todos.indexOf(todo), 1);
      state.todos = todos;
      state.newToto = todo.body;
    },
    COMPLETE_TODO(state, todo) {
      todo.completed = !todo.completed;
    },
    REMOVE_TODO(state, todo) {
      const todos = state.todos;
      todos.splice(todos.indexOf(todo), 1);
    },
    CLEAR_TODO(state, todo) {
      state.newToto = '';
    }
  },
  actions: {
    fetchTodos({ commit }) {
      return fetchTodos().then(todos => {
        commit('ADD_TODOS', todos);
      })
    },
    getTodo({ commit }, todo) {
      commit('GET_TODO', todo);
    },
    completeTodo({ commit }, todo) {
      commit('COMPLETE_TODO', todo);
    },
    addTodo({ commit }, todo) {
      commit('ADD_TODO', todo);
    },
    editTodo({ commit }, todo) {
      commit('EDIT_TODO', todo);
    },
    removeTodo({ commit }, todo) {
      commit('REMOVE_TODO', todo);
    },
    clearTodo({ commit }, todo) {
      commit('CLEAR_TODO', todo);
    },
  }
});
