<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style>

body {
  font-size: 22px;
}

.q-btn {
  font-weight: bold !important;
  font-size: 22px !important;
}

.q-field__label {
  font-weight: bold !important;
  font-size: 28px !important;
  line-height: 1 !important;
}

.q-field__native {
  font-weight: bold !important;
  font-size: 22px !important;
  line-height: 1 !important;
}

img.full {
  width: 80px;
  height: 80px;
}

.attached {
  position: absolute;
}

.top {
  top: 35px;
  left: 35px;
}

.text-white.shadow {
  text-shadow: black 2px 2px;
}

</style>
