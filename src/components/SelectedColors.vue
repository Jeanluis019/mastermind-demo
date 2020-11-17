<template>
  <div class="selected-colors">
    <p>Selected colors:</p>
    <div
      v-for="(selectedColor, index) in selectedColors"
      :key="index"
      class="color"
    >
      {{ selectedColor }}
      <span class="remove-color" @click="removeColor(index)">x</span>
    </div>
    <br />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["selectedColors"])
  },
  methods: {
    removeColor(index) {
      this.$store.commit("REMOVE_COLOR", index);
    }
  }
};
</script>
