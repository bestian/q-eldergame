<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title v-if="!hard"> {{ $t('who_is_this?') }}
      </q-toolbar-title>
      <q-toolbar-title v-if="hard"> {{ $t('who_is_missing?') }}
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
        <div class="col">
          <q-list bordered separator v-if="hard">
            <q-item clickable v-ripple v-for="(c,idx) in card_list" v-bind:key="idx" v-show="idx != a && !c.hide">
              <q-item-section>
                  <img class="full" :src="c.img" />
                  <span class="text-white small shadow attached top">{{ c.name }}</span>
              </q-item-section>
            </q-item>
          </q-list>
          <q-card v-if="!hard">
            <img :src="card_list[a].img"/>
          </q-card>
        </div>
        <div class="col">
          <q-list bordered separator>
            <q-item v-for = "(c, index) in card_list" :key = "index" v-show="noDup(index) && !c.hide">
              <q-item-section>
                <q-btn color="green" big @click = "b = index; check()" @touchstart="b = index; check()">{{ c.name }}</q-btn>
              </q-item-section>
              <img class="avatar" :src="c.img" v-show="!hard"/>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
    <q-select color="purple-12" v-model="speed" :options="options" :label="$t('speed')" />
    <span>{{$t('who_is_missing?')}}:</span>
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
  name: 'Name',
  props: ['card_list', 'human_vs_bot', 'bot_level'],
  components: {
    win, johnWin
  },
  data () {
    return {
      winning: false,
      loosing: false,
      record: false,
      progress: 0.1,
      good: 0,
      bad: 0,
      a: 0,
      t: 0.25,
      b: -1,
      hard: false,
      speed: 0,
      options: [0, 0.25, 0.5, 1]
    }
  },
  methods: {
    isWin: function () {
      return this.card_list[this.a].name === this.card_list[this.b].name
    },
    check: function () {
      if (this.isWin()) {
        this.win()
      } else {
        this.bad++
      }
    },
    reset: function () {
      this.winning = false
      this.loosing = false
      this.progress = 0
      this.$emit('johnSay', 'Be relexed...')
      this.a = Math.floor(Math.random() * this.card_list.length)
      if (this.card_list[this.a].hide) {
        this.reset()
      }
    },
    win: function () {
      this.winning = true
      this.progress = 0
      this.t = 0.25
      this.good++
      this.bad = 0
      this.$emit('johnSay', 'You win!')
      setTimeout(this.reset, 2000)
    },
    loose: function () {
      this.loosing = true
      this.$emit('johnSay', 'I win!')
      setTimeout(this.reset, 2000)
    },
    go: function () {
      if (!this.winning && !this.loosing) {
        if (Math.floor(this.t) < Math.floor(this.t + Number(this.speed))) {
          this.bad++
        }
        this.t += Number(this.speed)
        this.progress += (this.bot_level / 50)
        if (this.progress >= 1 && this.human_vs_bot) {
          this.loose()
        }
      }
    },
    noDup: function (idx) {
      for (var i = 0; i < idx; i++) {
        if (this.card_list[i].name === this.card_list[idx].name) {
          return false
        }
      }
      return true
    }
  },
  mounted () {
    setTimeout(this.reset, 500)
    setInterval(this.go, 1000)
  }
}
</script>

<style>

</style>
