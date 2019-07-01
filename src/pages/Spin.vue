<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        {{ $t('spin_note') }}
      </q-toolbar-title>
    </q-toolbar>
    <div class="centered">
      <div class="spin" v-bind:class="{good: isWin()}" v-bind:style="{ transform: countTrans(deg) }" @click="check()" @touchstart="check()">
        <div class="image">
          <h4 class="attached top middle text-white shadow">{{card_list[a].name}}</h4>
          <img class="a" :src="card_list[a].img">
        </div>
      </div>
    </div>
    <q-select color="purple-12" v-model="speed" :options="options" :label="$t('speed')" />
    <span>{{$t('3d_spin')}}:</span>
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
  name: 'Spin',
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
      deg: 0,
      speed: 5,
      hard: false,
      options: [3, 5, 10, 20]
    }
  },
  methods: {
    countTrans: function (deg) {
      if (!this.hard) {
        return 'rotate(-' + deg + 'deg)'
      } else {
        return 'rotateY(-' + deg + 'deg) rotateZ(-' + deg + 'deg)'
      }
    },
    isWin: function () {
      return Math.abs((this.deg + 30) % 360) < 60
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
      this.deg = 0
      this.winning = false
      this.a = Math.floor(Math.random() * this.card_list.length)
      if (this.card_list[this.a].hide) {
        this.reset()
      }
    },
    win: function () {
      this.winning = true
      this.deg = 0
      this.good++
    },
    go: function () {
      if (!this.winning) {
        if (Math.floor(this.deg / 360) < Math.floor((this.deg + Number(this.speed)) / 360)) {
          this.bad++
        }
        this.deg += Number(this.speed)
      }
    }
  },
  mounted () {
    setTimeout(this.reset, 500)
    setInterval(this.go, 50)
    window.addEventListener('keydown', this.check)
  }
}
</script>

<style>

.spin {
}

.spin.good img {
  box-shadow: green 0px 0px 10px 10px;
}

.spin img {
  width: 50vmin;
  height: 50vmin;
  border-radius: 100%;
  transition: all 0.3s ease;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
