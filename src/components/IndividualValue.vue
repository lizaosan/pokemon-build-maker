<template>
  <td>
    <select v-model="iv">
      <option v-for="(item, index) in 32" :key="index">{{index}}</option>
    </select>
  </td>
</template>
<script>
  export default {
    name: "IV",
    props: ["parentMsg", "ivOrder"],
    data() {
      return {
        iv: this.parentMsg,
        order: this.ivOrder
      }
    },
    watch: {
      iv: {
        handler(val) {
          val < 0 && (this.iv = 0)
          val > 31 && (this.iv = 31);
          this.$emit('update', val, this.order);
        }
      }
    }
  }
</script>

<style scoped>
  input {
    text-align: center;
  }

  input:focus {
    outline: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
</style>