import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
  },
  actions: {
    TASKS: ({ commit }, _) => new Promise((resolve, reject) => {
      axios.get('http://localhost:3100/api/tasks')
        .then((response) => {
		  resolve(response);
        }).catch((err) => {
          reject();
        });
    }),
    SET_TASKS: ({ commit }, payload) => {
	  axios.post(`http://localhost:3100/api/task?description=${payload.description}&status=${payload.status}`)
	  	.then((response) => {
        });
    },
    EDIT_TASK: ({ commit }, payload) => new Promise((resolve, reject) => {
	  axios.put(`http://localhost:3100/api/task/${payload._id}?status=${payload.status}`)
	  .then((response) => {
          resolve(response);
        }).catch((err) => {
          reject(err);
	  });
    }),
    REMOVE_TASK: ({ commit }, payload) => new Promise((resolve, reject) => {
      axios.delete(`http://localhost:3100/api/task/${payload._id}`)
        .then((response) => {
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
  	}),
  },
});
