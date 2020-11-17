import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    correctColors: [],
    selectedColors: [],
    availableColors: [],
    blackPegs: [],
    whitePegs: [],
    minColorsQuantity: 4,
    showResult: false
  },
  mutations: {
    SET_CORRECT_COLORS(state, colors) {
      state.correctColors = colors;
    },
    SET_AVAILABLE_COLORS(state, colors) {
      state.availableColors = colors;
    },
    REMOVE_COLOR(state, colorIndex) {
      state.selectedColors.splice(colorIndex, 1);
    },
    SELECT_COLOR(state, color) {
      state.selectedColors.push(color);
    },
    CLEAN_VALUES(state) {
      state.blackPegs = [];
      state.whitePegs = [];
    },
    UPDATE_SHOW_RESULT_VALUE(state, value) {
      state.showResult = value;
    },
    ADD_BLACK_PEG(state, color) {
      state.blackPegs.push(color);
    },
    ADD_WHITE_PEG(state, color) {
      state.whitePegs.push(color);
    }
  }
});
