<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<script setup lang="ts">
import EventEditModal from '@/components/EventEditModal.vue'
import type { paths } from '@/types/api-types'
import { ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Events from '../components/Events.vue'

const { t } = useI18n()

const showModal = ref(false)
const selectedEvent: Ref<
  paths['/v1/api/events/{id}']['get']['responses']['200']['content']['application/json'] | null
> = ref(null)

const loading = ref(false)
const eventsKey = ref(0) // Key to force reload

function deleteEvent() {
  const confirm = window.confirm(t('events.areYouSure'))

  if (confirm && selectedEvent.value) {
    loading.value = true

    const path: keyof paths = '/v1/api/events/{id}'

    const url = import.meta.env.VITE_API_URL
    fetch(url + path.replace('{id}', selectedEvent.value.id), {
      method: 'DELETE',
    })
      .then(() => {
        showModal.value = false
        loading.value = false
        eventsKey.value += 1 // Increment key to force reload Events
      })
      .catch((error) => {
        console.error(error)
        loading.value = false
        // instead of toast lets just alert
        alert(t('error'))
      })
  }
}

function updateEvent() {
  if (selectedEvent.value === null) {
    return
  }

  const path: keyof paths = '/v1/api/events/{id}'

  const url = import.meta.env.VITE_API_URL

  fetch(url + path.replace('{id}', selectedEvent.value.id), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(selectedEvent.value),
  })
    .then(() => {
      showModal.value = false
      loading.value = false
      eventsKey.value += 1 // Increment key to force reload Events
    })
    .catch((error) => {
      console.error(error)
      loading.value = false
      // instead of toast lets just alert
      alert(t('error'))
    })
}
</script>

<!-- TEMPLATE -->
<!-- TEMPLATE -->
<!-- TEMPLATE -->
<!-- TEMPLATE -->
<!-- TEMPLATE -->
<template>
  <main>
    <!-- EVENTS -->
    <!-- EVENTS -->
    <!-- EVENTS -->
    <Events
      :key="eventsKey"
      @event-selected="
        (
          event: paths['/v1/api/events/{id}']['get']['responses']['200']['content']['application/json'],
        ) => {
          selectedEvent = { ...event }
          showModal = true
        }
      "
    />

    <!-- MODAL -->
    <!-- MODAL -->
    <!-- MODAL -->
    <EventEditModal
      :allowBackdrop="false"
      v-if="showModal && selectedEvent"
      @close="showModal = false"
      @save="updateEvent"
      :loading="loading"
    >
      <div>
        <div class="mb-2">
          <h2 class="text-center">{{ $t('events.editEvent') }}</h2>
        </div>
        <div class="flex flex-col">
          <!-- add labelrs -->

          <label for="name">{{ $t('events.table.name') }}</label>
          <input type="text" id="name" v-model="selectedEvent.name" />

          <label for="description">{{ $t('events.table.description') }}</label>
          <input type="text" id="description" v-model="selectedEvent.description" />

          <label for="priority">{{ $t('events.table.priority') }}</label>
          <input type="number" id="priority" v-model="selectedEvent.priority" />

          <label for="type">{{ $t('events.table.type') }}</label>
          <select id="type" v-model="selectedEvent.type">
            <option value="crosspromo">crosspromo</option>
            <option value="liveops">liveops</option>
            <option value="app">app</option>
            <option value="ads">ads</option>
          </select>
          <div class="flex justify-center">
            <button @click="deleteEvent()" :disabled="loading" class="cursor-pointer danger">
              {{ $t('delete') }}
            </button>
          </div>
        </div>
      </div>
    </EventEditModal>
  </main>
</template>

<!-- STYLES -->
<!-- STYLES -->
<!-- STYLES -->
<!-- STYLES -->
<!-- STYLES -->
<style scoped>
input[type='text'],
input[type='number'],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}
</style>
