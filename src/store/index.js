import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      loggedIn: false,
      firstName: "",
      email: "",
    };
  },
  mutations: {
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    setUsername(state, value) {
      state.firstName = value;
    },
    setEmail(state, value) {
      state.email = value; // Corrected from state.firstName = value
    },
  },
});

export default store;
