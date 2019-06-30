<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title v-if="!hard"> {{ $t('who_is_this?') }}
      </q-toolbar-title>
      <q-toolbar-title v-if="hard"> {{ $t('who_is_missing?') }}
      </q-toolbar-title>
    </q-toolbar>
    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <q-list bordered separator v-if="hard">
            <q-item clickable v-ripple v-for="(c,idx) in card_list" v-bind:key="idx" v-show="idx != a && !c.hide">
              <q-item-section>
                  <img class="full" :src="c.img" />
                  <span class="text-white shadow attached top">{{ c.name }}</span>
              </q-item-section>
            </q-item>
          </q-list>
          <q-card v-if="!hard">
            <img :src="card_list[a].img"/>
          </q-card>
        </div>
        <div class="col">
          <q-list bordered separator>
            <q-item v-for = "(c, index) in card_list" :key = "index" v-show="noDup(index) && !c.hide" @click = "b = index; check()" @touchstart="b = index; check()">
              <q-item-section>
                <q-btn color="green" big>{{ c.name }}</q-btn>
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
  </q-page>
</template>

<script>

import win from '../components/win'

export default {
  name: 'Name',
  props: ['card_list'],
  components: {
    win
  },
  data () {
    return {
      winning: false,
      record: false,
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
        setTimeout(this.reset, 3000)
      } else {
        this.bad++
      }
    },
    reset: function () {
      this.winning = false
      this.a = Math.floor(Math.random() * this.card_list.length)
      if (this.card_list[this.a].hide) {
        this.reset()
      }
    },
    win: function () {
      this.winning = true
      this.t = 0.25
      this.good++
    },
    go: function () {
      if (!this.winning) {
        if (Math.floor(this.t) < Math.floor(this.t + Number(this.speed))) {
          this.bad++
          this.reset()
        }
        this.t += Number(this.speed)
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
