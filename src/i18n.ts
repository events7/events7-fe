import { createI18n } from 'vue-i18n'

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      error: 'Something went wrong. Try again later.',
      error403: 'You do not have permission to do this. Check your credentials or try again later.',
      loading: 'Getting data...',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',

      events: {
        events: 'Events',
        deleteEvent: 'Delete event',
        addNewEvent: 'Add new event',
        newEvent: 'New Event',
        editEvent: 'Edit Event',
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
      error403:
        'Nimate dovoljenja za to. Preverite vaše uporabniške podatke ali poskusite ponovno kasneje.',
      loading: 'Pridobivanje podatkov...',
      delete: 'Izbriši',
      cancel: 'Prekliči',
      save: 'Shrani',

      events: {
        events: 'Dogodki',
        deleteEvent: 'Izbriši dogodek',
        addNewEvent: 'Dodaj nov dogodek',
        newEvent: 'Nov dogodek',
        editEvent: 'Uredi dogodek',
        areYouSure: 'Ste prepričani, da želite izbrisati dogodek?',
        noEvents: 'Ni dogodkov.',
        table: {
          createdAt: 'Ustvarjen',
          name: 'Ime',
          description: 'Opis',
          type: 'Vrsta',
          priority: 'Prioriteta',
        },
      },
    },
  },
})
