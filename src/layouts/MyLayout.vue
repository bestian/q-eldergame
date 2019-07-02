<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{$t('title')}}
        </q-toolbar-title>

        <div class="q-gutter-md">
          <q-select
            v-model="$i18n.locale"
            :options="langs"
            :label="$t('lang')"
            emit-value
          />
        </div>

        <q-btn
          flat
          dense
          round
          @click="rightDrawerOpen = !rightDrawerOpen"
          aria-label="Menu"
        >
          <q-avatar>
            <img src="../assets/john.png"/>
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item clickable @click.native="$router.push('/')" v-ripple>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            {{$t('home')}}
          </q-item-section>
        </q-item>
        <q-item-label header>{{$t('game')}}</q-item-label>
        <q-item clickable @click.native="$router.push('/pair')" v-ripple>
          <q-item-section avatar>
            <q-icon name="sync" />
          </q-item-section>
          <q-item-section>
            {{$t('pair_game')}}
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="$router.push('/name')" v-ripple>
          <q-item-section avatar>
            <q-icon name="face" />
          </q-item-section>
          <q-item-section>
            {{$t('name_game')}}
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="$router.push('/spin')" v-ripple>
          <q-item-section avatar>
            <q-icon name="track_changes" />
          </q-item-section>
          <q-item-section>
            {{$t('spin_game')}}
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="$router.push('/fishing')" v-ripple>
          <q-item-section avatar>
            <q-icon name="swap_vert" />
          </q-item-section>
          <q-item-section>
            {{$t('fishing_game')}}
          </q-item-section>
        </q-item>
        <q-item-label header>{{$t('setting')}}</q-item-label>
        <q-item clickable @click.native="$router.push('/edit')" v-ripple>
          <q-item-section avatar>
            <q-icon name="cloud_upload" />
          </q-item-section>
          <q-item-section>
            {{$t('edit')}}
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="$router.push('/contact')" v-ripple>
          <q-item-section avatar>
            <q-icon name="phone" />
          </q-item-section>
          <q-item-section>
            {{$t('contact')}}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer
      side="right"
      v-model="rightDrawerOpen"
      bordered
      content-class="bg-grey-2">
      <q-list>
        <q-item>
          <q-item-section>
            <q-avatar>
              <img src="../assets/john.png">
            </q-avatar>
            {{ $t('human_vs_bot') }}
            <q-toggle
              v-model="human_vs_bot"
              color="green"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select color="purple-12" v-model="bot_level" :options="options" :label="$t('bot_level')" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :card_list="card_list" :human_vs_bot="human_vs_bot" :bot_level="bot_level" @addCard="addCard" @removeCard = "removeCard" :updateCard="updateCard" @hideShow = "hideShow" @saveCards = "saveCards"/>
    </q-page-container>

    <q-footer v-if="human_vs_bot">
      <q-avatar>
        <img src="../assets/john.png">
      </q-avatar>
      {{ $t(speech[0]) }}
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      speech: [
        'hello! I\'m John',
        'I\'m thinking...'
      ],
      human_vs_bot: false,
      bot_level: 5,
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      langs: [
        { label: '繁體中文', value: 'zh-TW' },
        { label: '簡体中文', value: 'zh-CN' },
        { label: 'US English', value: 'en-us' }
      ],
      leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: this.$q.platform.is.desktop,
      card_list: [
        { img: 'https://i.imgur.com/9g8Snz6.jpg', name: '天使' },
        { img: 'https://i.imgur.com/41zpBhQ.jpg', name: '山' },
        { img: 'https://i.imgur.com/1vZiSGf.jpg', name: '瀑布' },
        { img: 'https://i.imgur.com/rPCYQls.png', name: '圓臉' },
        { img: 'https://i.imgur.com/SuLzJZ3.png', name: '蟲蟲' }
      ]
    }
  },
  methods: {
    openURL,
    addCard: function (url, name) {
      this.card_list.push({ img: url, name: name })
      this.setLocal('card_list')
    },
    removeCard: function (index) {
      this.card_list.splice(index, 1)
      this.setLocal('card_list')
    },
    saveCards: function (list) {
      this.card_list = list
      this.setLocal('card_list')
    },
    hideShow: function (index, bool) {
      this.card_list[index].hide = bool
      this.setLocal('card_list')
    },
    updateCard: function (index, obj) {
      this.card_list[index] = obj
      this.setLocal('card_list')
    },
    getLocal: function (n) {
      console.log('get:' + n)
      this[n] = JSON.parse(this.$q.localStorage.getItem(n))
    },
    setLocal: function (n) {
      console.log('set:' + n)
      this.$q.localStorage.set(n, JSON.stringify(this[n]))
      // console.log(this.$q.localStorage.getItem(n))
    }
  },
  mounted () {
    // console.log(this.$q.localStorage.getItem(n))
    if (this.$q.localStorage.getItem('card_list')) {
      this.getLocal('card_list')
    }
    if (this.$q.localStorage.getItem('event_list')) {
      this.getLocal('event_list')
    }
  }
}
</script>

<style>
</style>
