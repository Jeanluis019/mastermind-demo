<template>
  <div class="selected-colors">
    <p>Selected colors:</p>

    <div
      v-for="(selectedColor, index) in selectedColors"
      v-dragging="{
        item: selectedColor,
        list: selectedColors,
        group: 'color'
      }"
      :key="index"
      class="draggable-color"
    >
      <div class="color">
        {{ selectedColor }}
        <span class="remove-color" @click="removeColor(index)">x</span>
      </div>
      <p>{{ index + 1 }}</p>
    </div>
    <br />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["selectedColors"])
  },
  methods: {
    ...mapMutations({ removeColor: "REMOVE_COLOR" })
  }
};
</script>

<style lang="scss" scoped>
.draggable-color {
  display: inline-grid;

  &:hover {
    cursor: move;

    &.dragging {
      background: #1abc9c;
    }
  }
}
</style>
