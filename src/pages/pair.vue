<template>
  <q-page padding>
    <q-toolbar color="primary">
      <q-toolbar-title>
        {{$t('pair')}}
        <span v-if="w > 0">
          {{$t('success')}}
        </span>
      </q-toolbar-title>
    </q-toolbar>
    <div class="q-pa-md">
      <div class="row">
        <div class="col" @click="check()" @touchstart="check()">
          <div class="content" v-show="!hard">
            <span class="big header">{{card_list[Math.floor(a) % card_list.length].name}}</span>
          </div>
          <div class="image">
            <img class="a" :src="card_list[Math.floor(a) % card_list.length].img">
          </div>
        </div>
        <div class="col" @click="check()" @touchstart="check()">
          <div class="content">
            <span class="big header" v-bind:class="{ only: hard}">{{card_list[b].name}}</span>
          </div>
          <div class="image" v-show="!hard">
            <img class="a" :src="card_list[b].img">
          </div>
        </div>
      </div>
      <div class="row">
        <img src="~/assets/th.jpg" v-if="w > 0">
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'pair',
  props: ['card_list'],
  data () {
    return {
      a: 0,
      b: 0,
      w: 0,
      speed: 0.25,
      hard: false,
      record: false,
      good: 0,
      bad: 0
    }
  },
  methods: {
    go: function () {
      if (!this.w) {
        this.a += Number(this.speed)
        if (this.card_list[Math.floor(this.a) % this.card_list.length].hide) {
          this.go()
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
      this.w = 0
      if (this.card_list[this.b].hide) {
        this.reset()
      }
    },
    win: function () {
      this.w++
      this.good++
      setTimeout(this.reset, 3000)
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
  width: 40vw;
}

</style>
