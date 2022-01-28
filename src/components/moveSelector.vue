<template>
  <input class="moveInput" name="teleplay" list="teleplay_list" v-model="chosenMove"/>
  <datalist id="teleplay_list">
    <option v-for="(item, index) in parentMovedata" :key="index + 1" :data-value="item.cht"> {{ item.cht}} </option>
  </datalist>

</template>
<script>
  export default {
    name: "moveSelector",
    emits: ["updateMove"],
    props: ["parentMoves", "parentMovedata", "moveOrder"],
    data() {
      return {
        chosenMove: "",
        moves: this.parentMoves,
        order: this.moveOrder,
        data: this.parentMovedata,
      }
    },
    watch: {
      chosenMove: {
        handler(val) {
          this.$emit('updateMove', val, this.order);
        }
      }
    }
  }
</script>

<style scoped>
  .moveInput {
    padding: 0;
    margin: 0;
    width: 10rem;
    margin-top: 0.25rem;
  }
</style>