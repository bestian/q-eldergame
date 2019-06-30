<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/aged1.jpeg">
    <p>
    您家中有年紀大的長輩嗎？<br/>
    您可以輸入自己家族成員的照片，幫助長輩記得大家。
    </p>
    <q-btn-group big push>
      <q-btn big push label="玩遊戲" icon="visibility" @click="$router.push({ path: '/pair' })" />
      <q-btn big push label="設定" icon="settings" />
    </q-btn-group>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>

<style scoped>
  p {
    padding: 1em;
    font-weight: bold;
    font-size: 18px;
  }
</style>
