<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        {{ $t('fishing_note') }}
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
          <q-card @click = "flip(index,1)">
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
    <john-win v-show="loosing" ></john-win>
  </q-page>
</template>

<script>
import win from '../components/win'
import johnWin from '../components/john_win'

export default {
  name: 'Fishing',
  props: ['card_list', 'human_vs_bot', 'bot_level'],
  components: {
    win, johnWin
  },
  data () {
    return {
      w: false,
      progress: 0.1,
      winning: false,
      loosing: false,
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
      this.loosing = false
      this.progress = 0
      this.$emit('johnSay', 'I\'m thinking...')
    },
    win: function () {
      this.winning = true
      this.$emit('johnSay', 'You win!')
    },
    loose: function () {
      this.loosing = true
      this.$emit('johnSay', 'I win!')
      setTimeout(this.reset, 2000)
    },
    go: function () {
      if (!this.winning && !this.loosing) {
        this.progress += (this.bot_level / 200)
        if (this.progress >= 1 && this.human_vs_bot) {
          this.loose()
        }
      }
    }
  },
  mounted () {
    setInterval(this.go, 500)
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
