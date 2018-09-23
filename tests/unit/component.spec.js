import { shallowMount } from '@vue/test-utils'
import Card from "@/ui/Card.vue";

describe("Card.vue", () => {
  it("renders props.title when passed", () => {
    const title = "new title";
    const wrapper = shallowMount(Card, {
      propsData: { title }
    });
    expect(wrapper.text()).toMatch(title);
  });
});

// Button can also be tested but I ran out of time 
// Jest also includes snapshot testing that can be added
