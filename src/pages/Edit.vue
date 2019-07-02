<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        {{$t('edit')}}
      </q-toolbar-title>
    </q-toolbar>
    <q-list bordered separator>
      <q-item>
        <div class="upload-btn-wrapper">
          <template>
            <image-uploader
            :debug="1"
            :maxWidth="200"
            :quality="0.7"
            :autoRotate=true
            outputFormat="verbose"
            :preview=false
            :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
            capture="environment"
            accept="image/*"
            doNotResize="['gif', 'svg']"
            @input="setImage"
          ></image-uploader>
          </template>
          <q-avatar>
              <img v-show="url" :src="url" />
          </q-avatar>
        </div>
    </q-item>
    <q-item>
        <q-item-section>
          <q-input v-model="name" :label="$t('name')" />
        </q-item-section>
        <q-item-section>
          <q-btn color="green" @click="addCard(url, name); url = ''; name = ''">
            {{$t('add')}}
          </q-btn>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple v-for="(c,idx) in card_list" v-bind:key="idx" :active="c.hide">
        <q-item-section avatar>
          <q-avatar>
            <img :src="c.img" />
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ c.name }}</q-item-section>
        <q-item-section>
          <q-btn color="red" @click="removeCard(idx)">
            {{$t('delete')}}
          </q-btn>
        </q-item-section>
        <q-item-section>
          {{$t('hide')}}
          <q-toggle v-model="c.hide"/>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          {{ $t('importJSON') }}
        </q-item-section>
        <q-item-section>
          <input type="file" @change="importJSON" name="json" id="json" accept="application/json">
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <a href="http://elder.game.tw/#edit" target="_blank">
            {{ $t('genJSON') }}
          </a>
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
    addCard: function (url, name) {
      this.$emit('addCard', url, name)
    },
    removeCard: function (index) {
      this.$emit('removeCard', index)
    },
    hideShow: function (index, bool) {
      this.$emit('hideShow', index, bool)
    },
    setImage: function (file) {
      this.hasImage = true
      this.url = file.dataUrl
    },
    previewImage: function (event) {
      var input = event.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.url = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    exportCards: function () {
      var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.card_list))
      var dlAnchorElem = document.getElementById('downloadAnchorElem')
      dlAnchorElem.setAttribute('href', dataStr)
      dlAnchorElem.setAttribute('download', 'card_list.json')
      dlAnchorElem.click()
    },
    importJSON: function (event) {
      var input = event.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.my_card_list = this.card_list.concat(JSON.parse(e.target.result))
          this.$emit('saveCards', this.my_card_list)
        }
        reader.readAsText(input.files[0])
      }
    }
  }
}
</script>

<style>
</style>
