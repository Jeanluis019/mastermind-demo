<template>
  <button class="color-button" @click="selectColor">
    {{ color }}
  </button>
</template>

<script>
export default {
  name: "AvailableColor",
  props: {
    color: String
  },
  methods: {
    selectColor() {
      this.$store.commit("SELECT_COLOR", this.color);
    }
  }
};
</script>
