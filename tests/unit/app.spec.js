import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import store from "@/store/index.js";

describe("App.vue", () => {
  window.alert = jest.fn();

  it("check if user won the match", () => {
    const wrapper = shallowMount(App, { store: store });
    const correctColors = ["YELLOW", "PURPLE", "GREEN", "ORANGE"];

    // Set the correct colors (this is the code that user need to break)
    wrapper.vm.$store.commit("SET_CORRECT_COLORS", correctColors);

    // Select the correct colors to win the match
    for (let color of correctColors) wrapper.vm.$store.commit("SELECT_COLOR", color);

    // Try to guess the colors
    wrapper.vm.guessColors();

    // Check if user won this match
    expect(wrapper.vm.isAWinner()).toBe(true);
  });
});
