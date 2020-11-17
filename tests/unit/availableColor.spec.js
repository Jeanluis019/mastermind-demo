import { shallowMount } from "@vue/test-utils";
import AvailableColor from "@/components/AvailableColor.vue";

describe("AvailableColor.vue", () => {
  it("check that colors are being rendered", () => {
    const color = "Blue";
    const wrapper = shallowMount(AvailableColor, {
      propsData: { color }
    });
    expect(wrapper.text()).toMatch(color);
  });
});
