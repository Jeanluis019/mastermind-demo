<template>
  <button class="color-button" @click="selectColor(color)">
    {{ color }}
  </button>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "AvailableColor",
  props: {
    color: String
  },
  methods: {
    ...mapMutations({ selectColor: "SELECT_COLOR" })
  }
};
</script>
