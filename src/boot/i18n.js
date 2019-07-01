import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import ImageUploader from 'vue-image-upload-resize'

Vue.use(ImageUploader)

export default async ({ app, Vue }) => {
  Vue.use(VueI18n)

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: 'zh-TW',
    fallbackLocale: 'en-us',
    messages
  })
}
