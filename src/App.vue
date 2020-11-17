<template>
  <div id="app">
    <p class="code-to-break">Code to break:</p>
    <div
      v-for="selectedColor in correctColors"
      :key="selectedColor"
      class="color"
    >
      {{ selectedColor }}
    </div>

    <center>
      <h1>Mastermind Game (Demo)</h1>
      <p>Please choose 4 colors and press the <b>Send colors</b> button</p>

      <AvailableColor
        v-for="color in colorsForSelecting"
        v-model="selectedColors"
        :key="color"
        :color="color"
        :disabled="canSendColors"
      >
      </AvailableColor>
      <br /><br />

      <SelectedColors></SelectedColors><br /><br />

      <button
        class="send-button"
        :class="{ disabled: !canSendColors }"
        :disabled="!canSendColors"
        @click="guessColors"
      >
        Send colors
      </button>
      <br /><br /><br />

      <Result v-if="showResult"></Result>
    </center>
  </div>
</template>

<script>
import AvailableColor from "./components/AvailableColor.vue";
import Result from "./components/Result.vue";
import SelectedColors from "./components/SelectedColors.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    AvailableColor,
    Result,
    SelectedColors
  },
  created() {
    // Change the order randomly
    let correctColors = ["Green", "Blue", "Purple", "Yellow"].sort(
      () => 0.5 - Math.random()
    );
    let availableColors = ["Red", "Green", "Yellow", "Blue", "Purple"].sort(
      () => 0.5 - Math.random()
    );

    this.$store.commit("SET_CORRECT_COLORS", correctColors);
    this.$store.commit("SET_AVAILABLE_COLORS", availableColors);
  },
  computed: {
    ...mapState([
      "correctColors",
      "selectedColors",
      "availableColors",
      "minColorsQuantity",
      "blackPegs",
      "whitePegs",
      "showResult"
    ]),
    colorsForSelecting() {
      return this.availableColors.filter(
        color => !this.selectedColors.includes(color)
      );
    },
    canSendColors() {
      return this.selectedColors.length == this.minColorsQuantity;
    }
  },
  methods: {
    isAWhitePeg(colorName) {
      // If the selected color is included in the correct colors list, then it's a white peg
      return this.correctColors.includes(colorName);
    },
    isABlackPeg(colorName, colorIndex) {
      // If the color is correct and it's in the same position, then is a black peg
      return (
        this.isAWhitePeg(colorName) &&
        this.correctColors.indexOf(colorName) === colorIndex
      );
    },
    isAWinner() {
      // If both lists are equal, then the user won this match
      return (
        JSON.stringify(this.correctColors) == JSON.stringify(this.blackPegs)
      );
    },
    guessColors() {
      // Clean values everytime the user tries to guess the correct colors
      this.$store.commit("CLEAN_VALUES");

      for (let [index, color] of this.selectedColors.entries()) {
        if (this.isABlackPeg(color, index)) {
          this.$store.commit("ADD_BLACK_PEG", color);
        } else if (this.isAWhitePeg(color)) {
          this.$store.commit("ADD_WHITE_PEG", color);
        }
      }

      if (this.isAWinner()) {
        alert("Congratulations, you are a winner!");
      }
      this.$store.commit("UPDATE_SHOW_RESULT_VALUE", true);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

button {
  &:hover {
    cursor: pointer;
  }
}

.color-button {
  margin: 0 8px;
}

.color {
  background-color: grey;
  border-radius: 14px;
  padding: 3px 14px;
  color: white;
  font-size: 15px;
  width: fit-content;
  display: inline-flex;
  margin: 0 5px;
  position: relative;

  &:hover {
    cursor: move;

    &.dragging {
      background: #1abc9c;
    }
  }

  .remove-color {
    background-color: red;
    position: absolute;
    right: -6px;
    top: -5px;
    padding: 0 5px 1px;
    border-radius: 15px;

    &:hover {
      cursor: pointer;
    }
  }
}

.send-button {
  background-color: #006aff;
  border-color: transparent;
  color: #fff;
  border-radius: 4px;
  padding: 4px 8px;

  &.disabled {
    background: rgb(239, 239, 239);
    color: rgb(170, 170, 170);
  }
}

.code-to-break {
  margin-left: 8px;
  margin-bottom: 5px;
}
</style>
