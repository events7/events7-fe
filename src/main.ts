import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

const i18n = createI18n({
  locale: 'si',
  fallbackLocale: 'en',
  messages: {
    en: {
      error: 'Something went wrong. Try again later.',
      loading: 'Getting data...',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',

      events: {
        events: 'Events',
        deleteEvent: 'Delete event',
        editEvent: 'Edit event',
        areYouSure: 'Are you sure you want to delete this event?',
        noEvents: 'No events found.',
        table: {
          createdAt: 'Created At',
          name: 'Name',
          description: 'Description',
          type: 'Type',
          priority: 'Priority',
        },
      },
    },
    si: {
      error: 'Prišlo je do napake. Poskusite znova.',
      loading: 'Pridobivanje podatkov...',
      delete: 'Izbriši',
      cancel: 'Prekliči',
      save: 'Shrani',

      events: {
        events: 'Dogodki',
        deleteEvent: 'Izbriši dogodek',
        editEvent: 'Uredi dogodek',
        areYouSure: 'Ste prepričani, da želite izbrisati dogodek?',
        noEvents: 'Ni dogodkov.',
        table: {
          createdAt: 'Ustvarjen',
          name: 'Ime',
          description: 'Opis',
          type: 'Vrsta',
          priority: 'Prioritet',
        },
      },
    },
  },
})

const app = createApp(App)

app.use(i18n)
app.use(router)

app.mount('#app')
