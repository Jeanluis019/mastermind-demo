<template>
  <div class="result">
    <div class="black-pegs">
      <p>Colors selected in correct position (Black pegs):</p>
      <div class="color" v-for="blackPeg in blackPegs" :key="blackPeg">
        {{ blackPeg }}
      </div>
      <span v-if="blackPegs.length === 0">None</span>
    </div>

    <div class="white-pegs">
      <p>Colors selected in wrong position (White pegs):</p>
      <div class="color" v-for="whitePeg in whitePegs" :key="whitePeg">
        {{ whitePeg }}
      </div>
      <span v-if="whitePegs.length === 0">None</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["blackPegs", "whitePegs"])
  }
};
</script>
