<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        {{$t('edit')}}
      </q-toolbar-title>
    </q-toolbar>
    <q-list bordered separator>
      <q-item v-for="(c,idx) in card_list" v-bind:key="idx" :active="c.hide">
        <q-item-section avatar>
          <q-avatar>
            <img :src="c.img" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-input type="text" v-model="c.email" name="" :label="$t('e-mail')"></q-input>
          <q-input v-model="c.phone" name="" :label="$t('phone')"></q-input>
        </q-item-section>
        <q-item-section>
          <q-btn color="green" @click="updateCard(idx, c)">
            {{$t('update')}}
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'Edit',
  props: [ 'card_list' ],
  data () {
    return {
      url: '',
      hasImage: false,
      name: '',
      my_card_list: []
    }
  },
  methods: {
    updateCard: function (index, obj) {
      this.$emit('updateCard', index, obj)
    }
  }
}
</script>

<style>
</style>
