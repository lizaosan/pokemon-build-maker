<template>
  <h1>Pokemon Build Maker</h1>
  <main class="container">
    <div class="input_wrapper">
      <div class="inner_wrap">
        <div>
          <input class="pmkeyword" type="text" placeholder="搜尋寶可夢" v-model="pmkeyword">
          <select class="selectedPM" v-model="selectedPM">
            <option v-for="(item, index) in filteredpmJsonData" :key="index" :value="item.jsonid">
              {{ item.ndex }} {{ item.cht }}</option>
          </select>
        </div>
      </div>
      <div class="inner_wrap">
        <div>
          <input class="pmkeyword" type="text" placeholder="搜尋道具" v-model="itemkeyword">
          <select class="selectedPM" v-model="selectedItem">
            <option v-for="(item, index) in filteredItemJsonData" :key="index" :value="item.cht">{{ item.cht }}</option>
          </select>
        </div>
      </div>
      <div class="inner_wrap">
        <div>
          <span>Lv</span>
          <select v-model="level">
            <option v-for="(item, index) in 100" :key="index + 1">{{index + 1 }}</option>
          </select>
        </div>
        <div>
          <span>性別</span>
          <select v-model="sex">
            <option v-for="(item, index) in sexList" :key="index + 1">{{ item }}</option>
          </select>
        </div>
        <div>
          <span>異色</span>
          <select v-model="isShiny">
            <option v-for="(item, index) in shinyList" :key="index + 1">{{ item }}</option>
          </select>
        </div>
      </div>
      <div class="inner_wrap">
        <div>
          <span>特性</span>
          <!-- <input v-model="level" type="number" min="1" max="100" /> -->
          <select class="select-sm" v-model="ability">
            <option v-for="(item, index) in filteredAbilityJsonData" :key="index + 1" :value="item">{{ item }}</option>
          </select>
        </div>
        <div>
          <span>性格</span>
          <select class="select-sm" v-model="nature">
            <option :value="0">不加不減</option>
            <option :value="12">+A-B 怕寂寞</option>
            <option :value="13">+A-C 固執</option>
            <option :value="14">+A-D 頑皮</option>
            <option :value="15">+A-S 勇敢</option>
            <option :value="21">+B-A 大膽</option>
            <option :value="23">+B-C 淘氣</option>
            <option :value="24">+B-D 樂天</option>
            <option :value="25">+B-S 悠閒</option>
            <option :value="31">+C-A 內斂</option>
            <option :value="32">+C-B 慢吞吞</option>
            <option :value="34">+C-D 馬虎</option>
            <option :value="35">+C-S 冷靜</option>
            <option :value="41">+D-A 溫和</option>
            <option :value="42">+D-B 溫順</option>
            <option :value="43">+D-C 慎重</option>
            <option :value="45">+D-S 自大</option>
            <option :value="51">+S-A 膽小</option>
            <option :value="52">+S-B 急躁</option>
            <option :value="53">+S-C 爽朗</option>
            <option :value="54">+S-D 天真</option>
          </select>
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>項目</th>
          <th>種族值</th>
          <th>個體值</th>
          <th width="90rem">努力值<br><small><span>{{EVSum}}</span> / <span>{{EVLast}}</span></small></th>
          <th>能力值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>HP</td>
          <td>{{selectedStat.stats[0].base_stat}}</td>
          <individualValue :parent-msg="userIV[0]" iv-order="0" @update="updateIV" :key="resetFrequency"></individualValue>
          <effortValue :parent-msg="userEV[0]" ev-order="0" @update="updateEV" :key="resetFrequency"></effortValue>
          <td>{{getHP}}</td>
        </tr>
        <tr>
          <td>攻擊</td>
          <td>{{selectedStat.stats[1].base_stat}}</td>
          <individualValue :parent-msg="userIV[1]" iv-order="1" @update="updateIV" :key="resetFrequency"></individualValue>
          <effortValue :parent-msg="userEV[1]" ev-order="1" @update="updateEV" :key="resetFrequency"></effortValue>
          <td :class="{'text_red': naturePatch[0] == 1.1 , 'text_blue' : naturePatch[0] == 0.9}">{{getAtk}}</td>
        </tr>
        <tr>
          <td>防禦</td>
          <td>{{selectedStat.stats[2].base_stat}}</td>
          <individualValue :parent-msg="userIV[2]" iv-order="2" @update="updateIV" :key="resetFrequency"></individualValue>
          <effortValue :parent-msg="userEV[2]" ev-order="2" @update="updateEV" :key="resetFrequency"></effortValue>
          <td :class="{'text_red': naturePatch[1] == 1.1 , 'text_blue' : naturePatch[1] == 0.9}">{{getDef}}</td>
        </tr>
        <tr>
          <td>特攻</td>
          <td>{{selectedStat.stats[3].base_stat}}</td>
          <individualValue :parent-msg="userIV[3]" iv-order="3" @update="updateIV" :key="resetFrequency"></individualValue>
          <effortValue :parent-msg="userEV[3]" ev-order="3" @update="updateEV" :key="resetFrequency"></effortValue>
          <td :class="{'text_red': naturePatch[2] == 1.1 , 'text_blue' : naturePatch[2] == 0.9}">{{getSpAtk}}</td>
        </tr>
        <tr>
          <td>特防</td>
          <td>{{selectedStat.stats[4].base_stat}}</td>
          <individualValue :parent-msg="userIV[4]" iv-order="4" @update="updateIV" :key="resetFrequency"></individualValue>
          <effortValue :parent-msg="userEV[4]" ev-order="4" @update="updateEV" :key="resetFrequency"></effortValue>
          <td :class="{'text_red': naturePatch[3] == 1.1 , 'text_blue' : naturePatch[3] == 0.9}">{{getSpDef}}</td>
        </tr>
        <tr>
          <td>速度</td>
          <td>{{selectedStat.stats[5].base_stat}}</td>
          <individualValue :parent-msg="userIV[5]" iv-order="5" @update="updateIV" :key="resetFrequency"></individualValue>
          <effortValue :parent-msg="userEV[5]" ev-order="5" @update="updateEV" :key="resetFrequency"></effortValue>
          <td :class="{'text_red': naturePatch[4] == 1.1 , 'text_blue' : naturePatch[4] == 0.9}">{{getSpd}}</td>
        </tr>
        <tr>
          <td>招式</td>
          <td colspan="4" class="moves">
            <moveSelector :parent-moves="userMove[0]" move-order="0" :parent-movedata="moveJsonData.data" @updateMove="updateMove" :key="resetFrequency"></moveSelector>&nbsp;
            <moveSelector :parent-moves="userMove[1]" move-order="1" :parent-movedata="moveJsonData.data" @updateMove="updateMove" :key="resetFrequency"></moveSelector><br>
            <moveSelector :parent-moves="userMove[2]" move-order="2" :parent-movedata="moveJsonData.data" @updateMove="updateMove" :key="resetFrequency"></moveSelector>&nbsp;
            <moveSelector :parent-moves="userMove[3]" move-order="3" :parent-movedata="moveJsonData.data" @updateMove="updateMove" :key="resetFrequency"></moveSelector>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="inner_wrap">
      <div class="reset_btn">
        <button @click="generatorImage">截圖</button>&nbsp;
        <button @click="resetAll">重置</button>
      </div>
    </div>
    <div class="card_maker" ref="capture">
      <div class="card_wrapper">
        <div class="card_sprite">
          <img :src="selectedStat.sprites.front_default" alt="card_sprite">
        </div>
        <div class="card_info">
          <div class="card_row"></div>
        </div>
      </div>
    </div>

    <!-- <small class="copyright">Copyright © 2022 Lizaosan. All rights reserved.<br> Last Updated: 2022/01/27 17:28</small> -->
  </main>
  
</template>

<script>
  import individualValue from "./IndividualValue.vue";
  import effortValue from "./EffortValue.vue";
  import MoveSelector from './moveSelector.vue';
  import html2canvas from 'html2canvas';

  export default {
    name: 'statCalculator',
    components: {
      individualValue, effortValue, MoveSelector
    },
    data() {
      return {
        pmkeyword: "",
        itemkeyword: "",
        pmJsonUrl: "json/pokemon-json.json",
        pmJsonData: {
          "data": [
            {
              "ndex": "001",
              "cht": "妙蛙種子",
              "jp": "フシギダネ",
              "en": "Bulbasaur",
              "jsonid": "1"
            }
          ]
        },
        itemJsonUrl: "json/item-json.json",
        itemJsonData: {
          "data": [
            {
                "index": "1",
                "cht": "光粉",
                "jp": "ひかりのこな",
                "en": "Bright Powder"
            }
          ]
        },
        abilityJsonUrl: "json/ability-json.json",
        abilityJsonData : {
          "data": [
            {
                "index": "1",
                "cht": "惡臭",
                "jp": "あくしゅう",
                "en": "Stench",
                "lower": "stench"
            }
          ]
        },
        moveJsonUrl: "json/move-json.json",
        moveJsonData : {
          "data": [
            {
                "index": "1",
                "cht": "拍擊",
                "jp": "はたく",
                "en": "Pound"
            }
          ]
        },
        selectedPM: "1",
        selectedItem: "",
        selectedStat: {
          stats: [{base_stat: 45},{base_stat: 49},{base_stat: 49},{base_stat: 65},{base_stat: 65},{base_stat: 45},],
          abilities:[{ability:{name:"overgrow"}},{ability:{name:"chlorophyll"}}],
          sprites:{back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/815.png"}
        },
        userIV: [31, 31, 31, 31, 31, 31],
        userEV: [0, 0, 0, 0, 0, 0],
        userMove: ["","","",""],
        level: 50,
        sex: "♂",
        sexList: ["♂","♀","X"],
        isShiny: "X",
        shinyList: ["O","X"],
        nature: "0",
        naturePatch: [1, 1, 1, 1, 1],
        ability: "茂盛",
        resetFrequency: 0,
      };
    },
    methods: {
      getJson(uri) {
        let vm = this;
        fetch(uri)
          .then(function (response) {
            return response.json();
          })
          .then(function (msg) {
            if (uri == vm.pmJsonUrl) {
              vm.pmJsonData = msg;
            } else if (uri == vm.itemJsonUrl) {
              vm.itemJsonData = msg;
            } else if (uri == vm.abilityJsonUrl) {
              vm.abilityJsonData = msg;
            } else if (uri == vm.moveJsonUrl) {
              vm.moveJsonData = msg;
            }
          });
      },
      getSelectedStatJson(uri) {
        let vm = this;
        fetch(uri)
          .then(function (response) {
            return response.json();
          })
          .then(function (msg) {
            vm.selectedStat = msg;
          });
      },
      resetAll() {
        this.level = 50;
        this.nature = "0";
        this.$data.userIV = this.$options.data().userIV;
        this.$data.userEV = this.$options.data().userEV;
        this.$data.userMove = this.$options.data().userMove;
        this.resetFrequency += 1;
      },
      updateIV(val, order) {
        this.userIV[order] = val;
      },
      updateEV(val, order) {
        this.userEV[order] = val;
      },
      updateMove(val, order) {
        this.userMove[order] = val;
      },
      generatorImage () {
        let vm = this;
        html2canvas(this.$refs.capture,{
          allowTaint: true,
          backgroundColor: null,
          imageTimeout: 0,
          useCORS: true
        }).then(canvas => { 
          let link = document.createElement('a');
          link.href = canvas.toDataURL();
          link.setAttribute('download', vm.selectedStat.name);
          // link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
        })
      },
    },
    computed: {
      filteredpmJsonData() {
        let vm = this;
        let result = null;
        let tags = ["超級", "超極巨", "阿羅拉", "伽勒爾"];
        if (tags.includes(this.pmkeyword)) {
          result = vm.pmJsonData.data.filter(obj => obj.cht.indexOf(this.pmkeyword) !== -1)
        } else {
          result = vm.pmJsonData.data.filter(obj => obj.cht.indexOf(this.pmkeyword) === 0)
        }
        return result
      },
      filteredItemJsonData() {
        let vm = this;
        let result = null;
        result = vm.itemJsonData.data.filter(obj => obj.cht.indexOf(this.itemkeyword) !== -1)
        return result
      },
      filteredAbilityJsonData(){
        let vm = this;
        let selectedAbility = [];
        let result = [];
        for (let i = 0; i < vm.selectedStat.abilities.length; i++) {
          selectedAbility.push(vm.selectedStat.abilities[i].ability.name)
        }
        for (let j = 0; j < selectedAbility.length; j++) {
          for (let k = 0; k < vm.abilityJsonData.data.length; k++) {
            let alteredData = vm.abilityJsonData.data[k].lower.replace(" ","-")
            if (alteredData == selectedAbility[j]) {
              result.push(vm.abilityJsonData.data[k].cht)
            }
          } 
        }
        return result;
      },
      getHP() {
        let vm = this;
        let result = null;
        result = vm.userIV[0] === '' || vm.userEV[0] === '' ? "錯誤" : Math.floor((Math.floor(vm.selectedStat.stats[0].base_stat * 2 + (vm.userIV[0]*1) + (vm.userEV[0]*1) / 4) * vm.level) / 100) + 10 + (vm.level * 1);
        return result;
      },
      getAtk() {
        let vm = this;
        let result = null;
        result = vm.userIV[1] === '' || vm.userEV[1] === '' ? "錯誤" : Math.floor((Math.floor((Math.floor(vm.selectedStat.stats[1].base_stat * 2 + (vm.userIV[1]*1) + (vm.userEV[1]*1) / 4) * vm.level) / 100) + 5) * vm.naturePatch[0]);
        return result;
      },
      getDef() {
        let vm = this;
        let result = null;
        result = vm.userIV[2] === '' || vm.userEV[2] === '' ? "錯誤" : Math.floor((Math.floor((Math.floor(vm.selectedStat.stats[2].base_stat * 2 + (vm.userIV[2]*1) + (vm.userEV[2]*1) / 4) * vm.level) / 100) + 5) * vm.naturePatch[1]);
        return result;
      },
      getSpAtk() {
        let vm = this;
        let result = null;
        result = vm.userIV[3] === '' || vm.userEV[3] === '' ? "錯誤" : Math.floor((Math.floor((Math.floor(vm.selectedStat.stats[3].base_stat * 2 + (vm.userIV[3]*1) + (vm.userEV[3]*1) / 4) * vm.level) / 100) + 5) * vm.naturePatch[2]);
        return result;
      },
      getSpDef() {
        let vm = this;
        let result = null;
        result = vm.userIV[4] === '' || vm.userEV[4] === '' ? "錯誤" : Math.floor((Math.floor((Math.floor(vm.selectedStat.stats[4].base_stat * 2 + (vm.userIV[4]*1) + (vm.userEV[4]*1) / 4) * vm.level) / 100) + 5) * vm.naturePatch[3]);
        return result;
      },
      getSpd() {
        let vm = this;
        let result = null;
        result = vm.userIV[5] === '' || vm.userEV[5] === '' ? "錯誤" : Math.floor((Math.floor((Math.floor(vm.selectedStat.stats[5].base_stat * 2 + (vm.userIV[5]*1) + (vm.userEV[5]*1) / 4) * vm.level) / 100) + 5) * vm.naturePatch[4]);
        return result;
      },
      EVSum() {
        let vm = this;
        return (
          (vm.userEV[0]*1) + (vm.userEV[1]*1) + (vm.userEV[2]*1) + (vm.userEV[3]*1) + (vm.userEV[4]*1) + (vm.userEV[5]*1)
        );
      },
      EVLast() {
        let vm = this;
        return (
          510 - ((vm.userEV[0]*1) + (vm.userEV[1]*1) + (vm.userEV[2]*1) + (vm.userEV[3]*1) + (vm.userEV[4]*1) + (vm.userEV[5]*1))
        );
      }
    },
    watch: {
      "selectedPM": {
        handler: function () {
          this.getSelectedStatJson('https://pokeapi.co/api/v2/pokemon/' + this.selectedPM);
        },
        immediate: true
      },
      "nature": {
        handler: function () {
          let array = this.nature.split("")
          for (let i = 0; i < this.naturePatch.length; i++) {
            if (i + 1 == array[0]) {
              this.naturePatch[i] = 1.1;
            } else if (i + 1 == array[1]) {
              this.naturePatch[i] = 0.9;
            } else {
              this.naturePatch[i] = 1;
            }
          }
        }
      },
      "level": {
        handler: function (val) {
          val < 0 && (this.level = 1)
					val > 100 && (this.level = 100);
        }
      },
      "filteredpmJsonData" : {
        handler: function (val) {
          if (val.length != 0) {
            this.selectedPM = val[0].jsonid;
          }
        }
      },
      "filteredItemJsonData" : {
        handler: function (val) {
          if (val.length != 0) {
            this.selectedItem = val[0].cht;
          }
        }
      },
      "filteredAbilityJsonData" : {
        handler: function (val) {
          if (val.length != 0) {
            this.ability = val[0];
          }
        }
      }
    },
    mounted() {
      this.getJson(this.pmJsonUrl);
      this.getJson(this.itemJsonUrl);
      this.getJson(this.abilityJsonUrl);
      this.getJson(this.moveJsonUrl);
    }
  };
</script>

<style scoped>

  h1 {
    font-size: 1.75rem;
    font-weight: bold;
    margin: 0.5em 0;
  }

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

  tr {
    height: 1.5rem;
  }

  table {
    table-layout: fixed;
    word-wrap:break-word;
  }

  .container {
    display: flex;
    flex-direction: column;
    max-width: 30rem;
    margin: 0 auto;
  }

  .input_wrapper {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input_wrapper span {
    margin-right: .25rem;
  }

  .inner_wrap {
    display: flex;
    flex: 1;
    justify-content:space-around;
    width: 100%;
    margin: .25rem 0;
    align-items: center;
  }

  .inner_wrap:first-child {
    margin-top: 0; 
  }

  .pmkeyword {
    padding: 0;
    border: 0;
    margin: 0;
    width: 6rem;
    border-bottom: 1px solid #ccc;
    font-size: 1rem;
    font-style: italic;
    border-radius: 0;
  }

  .select-sm {
    width: 7.5rem;
  }

  .selectedPM {
    width: 15rem;
    margin-inline-start: 1rem;
  }

  .text_red {
    color: #dc3545;
  }

  .text_blue {
    color: #007bff;
  }

  .card_maker {
    margin-top: 0.5rem;
    background-color: #FFE153;
    border-radius: 0.25rem;
    position: relative;
    padding: 0.12rem;
    width: 100%;
    box-sizing: border-box;
  }

  .card_wrapper {
    border: #EAC100 2px solid;
    background-color: #FFF0AC;
    height: 14rem;
    border-radius: 0.25rem;
    position: relative;
  }

  .card_sprite {
    width: 9rem;
    height: 9rem;
    background-color: #fff;
    border-radius: 999rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 1rem;
    margin: auto;
    z-index: 1;
  }

  .card_sprite img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

  }

  .card_info {
    background-color: #FFE153;
    width: 100%;
    height: 12rem;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 2px solid #fff;
    border-left: none;
    border-right: none;
  }

  .copyright {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: auto;
  }
</style>