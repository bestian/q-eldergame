<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        {{ $t('fishing_note') }}
      </q-toolbar-title>
    </q-toolbar>
    <div class="q-pa-md">
      <div class="row">
        <div class="col" v-for = "(f, index) in fishs1" :key="f.img+index" v-bind:class="[!memory || face0 == index ? 'face' : 'back', f.img ? 'good' : 'null', face0 == index ? 'focus' : 'other']">
          <q-card @click = "flip(index,0) ">
            <div class="content">
              <span class="header" v-show="!hard">{{!memory || face0 == index ? f.name : '?'}}</span>
            </div>
            <img v-bind:class="fishs1[face0] == fishs2[face1] ? 'gold' : '' " :src="f.img"/>
          </q-card>
        </div>
      </div>
      <div class="row">
        <div class="col" v-for = "(f, index) in fishs2" :key="index" v-bind:class="[!memory || face1 == index ? 'face' : 'back', f.img ? 'good' : 'null', face1 == index ? 'focus' : 'other']">
          <q-card v-tap @click = "flip(index,1)">
            <div class="content">
              <span class="header">{{!memory || face1 == index ? f.name : '?'}}</span>
            </div>
            <img v-show="!hard" v-bind:class="fishs1[face0] == fishs2[face1] ? 'gold' : '' " :src="f.img"/>
          </q-card>
        </div>
      </div>
    </div>
    <span>{{$t('memory_mode')}}:</span>
    <q-toggle
      v-model="memory"
      color="green"
    />
    <br/>
    <span>{{$t('img_vs_text')}}:</span>
    <q-toggle
      v-model="hard"
      color="green"
    />
    <win v-show="winning"></win>
  </q-page>
</template>

<script>
import win from '../components/win'

export default {
  name: 'Fishing',
  props: ['card_list'],
  components: {
    win
  },
  data () {
    return {
      w: false,
      winning: false,
      memory: true,
      hard: false,
      fishs1: [],
      fishs2: [],
      face0: -1,
      face1: -1
    }
  },
  methods: {
    flip: function (i, n) {
      if (n === 0 && !this.w) { this.face0 = i }
      if (n === 1 && !this.w) { this.face1 = i }
      if (!this.w && this.fishs1[this.face0] && this.fishs2[this.face1] && this.fishs1[this.face0].img === this.fishs2[this.face1].img) {
        this.w = true
        setTimeout(this.remove, 1000)
      } else {
        if (!this.w && this.face0 > -1 && this.face1 > -1) {
          this.w = true
          setTimeout(this.flipback, 1000)
        }
      }
    },
    isWin: function () {
      var ww = true
      for (var i = 0; i < this.fishs1.length; i++) {
        if (this.fishs1[i].img !== '') { ww = false }
      }
      return ww
    },
    remove: function () {
      this.fishs1[this.face0] = { img: '', name: '' }
      this.fishs2[this.face1] = { img: '', name: '' }
      // this.fishs1.splice(this.face0, 1)
      // this.fishs2.splice(this.face1, 1)
      this.flipback()
      if (this.isWin()) {
        this.win()
        setTimeout(this.reset, 3000)
      }
    },
    flipback: function () {
      this.face0 = -1
      this.face1 = -1
      this.w = false
    },
    reset: function () {
      this.fishs1 = this.card_list.filter(function (o) { return !o.hide }).slice().sort(function () {
        return Math.random() - 0.5
      }).slice(0, 4)
      this.fishs2 = this.fishs1.filter(function (o) { return !o.hide }).slice().sort(function () {
        return Math.random() - 0.5
      })
      this.winning = false
    },
    win: function () {
      this.winning = true
    }
  },
  mounted () {
    setTimeout(this.reset, 500)
  }
}
</script>

<style>
.content {
  text-align: center;
}

.q-card {
  height: 25vh;
  overflow: hidden;
}

.back img {
  visibility: hidden;
}

.null {
  visibility: hidden !important;
}
</style>
