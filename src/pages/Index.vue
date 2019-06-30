<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/aged1.jpeg">
    <p>
    {{$t('intro_0')}}<br/>
    {{$t('intro_1')}}
    </p>
    <q-btn-group big push>
      <q-btn big push :label="$t('game')" icon="visibility" @click="$router.push({ path: '/pair' })" />
      <q-btn big push :label="$t('setting')" icon="settings" @click="$router.push({ path: '/edit' })"  />
    </q-btn-group>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      langs: ['en-us', 'zh-TW']
    }
  }
}
</script>

<style scoped>
  p {
    padding: 1em;
    font-weight: bold;
    font-size: 18px;
  }
</style>
