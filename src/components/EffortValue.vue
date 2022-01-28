<template>
	<td>
		<!-- <input v-model="ev" type="number" min="0" max="252" maxlength="2" /> -->
		<select v-model="ev">
			<option v-for="(item, index) in 64" :key="index * 4">{{index * 4}}</option>
		</select>
	</td>
</template>
<script>
	export default {
		name: "EV",
		props: ["parentMsg", "evOrder"],
		data() {
			return {
				ev: this.parentMsg,
				order: this.evOrder
			}
		},
		watch: {
			ev: {
				handler(val) {
					val < 0 && (this.ev = 0)
					val > 252 && (this.ev = 252);
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