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

        <q-select
          v-model="$i18n.locale"
          :options="langs"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>{{$t('game')}}</q-item-label>
        <q-item clickable @click.native="$router.push('/')" v-ripple>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            {{$t('home')}}
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="$router.push('/pair')" v-ripple>
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            {{$t('pair')}}
          </q-item-section>
        </q-item>
        <q-item-label header>{{$t('setting')}}</q-item-label>
        <q-item clickable @click.native="$router.push('/edit')" v-ripple>
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            {{$t('edit')}}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :card_list="card_list"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      langs: ['en-us', 'zh-TW'],
      leftDrawerOpen: this.$q.platform.is.desktop,
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
