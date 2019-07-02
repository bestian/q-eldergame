<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        {{$t('pair_note')}}
      </q-toolbar-title>
    </q-toolbar>
    <q-toolbar v-if="human_vs_bot">
      <q-avatar>
        <img src="../assets/john.png">
      </q-avatar>
      <q-linear-progress stripe rounded style="height: 25px" :value="progress" class="q-mt-md" :color="progress > 0.62 ? 'red' : 'blue'"/>
    </q-toolbar>
    <div class="q-pa-md">
      <div class="row">
        <div class="col" @click="check()" @touchstart="check()">
          <q-card style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" class="text-white my-card">
            <div class="content" v-show="!hard">
              <span class="big header">{{card_list[Math.floor(a) % card_list.length].name}}</span>
            </div>
            <div class="image">
              <img class="a" :src="card_list[Math.floor(a) % card_list.length].img">
            </div>
          </q-card>
        </div>
        <div class="col" @click="check()" @touchstart="check()">
          <q-card style="background: radial-gradient(circle, #35a2ff 0%, #393 100%)" class="text-white my-card">
            <div class="content">
              <span class="big header" v-bind:class="{ only: hard}">{{card_list[b].name}}</span>
            </div>
            <div class="image" v-show="!hard">
              <img class="a" :src="card_list[b].img">
            </div>
          </q-card>
        </div>
      </div>
    </div>
    <q-select color="purple-12" v-model="speed" :options="options" :label="$t('speed')" />
    <span>{{$t('img_vs_text')}}:</span>
    <q-toggle
      v-model="hard"
      color="green"
    />
    <win v-show="winning" ></win>
    <john-win v-show="loosing" ></john-win>
  </q-page>
</template>

<script>

import win from '../components/win'
import johnWin from '../components/john_win'

export default {
  name: 'pair',
  props: [ 'card_list', 'human_vs_bot', 'bot_level' ],
  components: { win, johnWin },
  data () {
    return {
      loosing: false,
      progress: 0.1,
      a: 0,
      b: 0,
      winning: true,
      speed: 0.25,
      hard: false,
      record: false,
      good: 0,
      bad: 0,
      options: [0.1, 0.25, 0.5, 1]
    }
  },
  methods: {
    go: function () {
      if (!this.winning) {
        this.a += Number(this.speed)
        if (this.card_list[Math.floor(this.a) % this.card_list.length].hide) {
          this.go()
        }
        this.progress += (this.bot_level / 200)
        var ma = Math.floor(this.a) % this.card_list.length
        if (this.progress >= 1 && this.card_list[ma].name === this.card_list[this.b].name && this.human_vs_bot) {
          this.loose()
        }
      }
    },
    check: function () {
      // console.log('a')
      var ma = Math.floor(this.a) % this.card_list.length
      if (this.card_list[ma].name === this.card_list[this.b].name) {
        this.win()
      } else {
        this.bad++
      }
    },
    reset: function () {
      this.b = Math.floor(Math.random() * this.card_list.length)
      this.winning = false
      this.loosing = false
      this.progress = 0
      this.$emit('johnSay', 'I\'m thinking...')
      if (this.card_list[this.b].hide) {
        this.reset()
      }
    },
    win: function () {
      this.winning++
      this.good++
      this.$emit('johnSay', 'You win!')
      setTimeout(this.reset, 2000)
    },
    loose: function () {
      this.loosing = true
      this.$emit('johnSay', 'I win!')
      setTimeout(this.reset, 2000)
    }
  },
  mounted () {
    setInterval(this.go, 500)
    this.reset()
    window.addEventListener('keydown', this.check)
  }
}
</script>

<style>

.big.header {
  font-weight: bold;
  font-size: 28px;
}

img {
  width: 100%;
}

.my-card {
  width: 100%;
  height: 50vmax;
  max-width: 250px;
  padding: 5px;
}
</style>
