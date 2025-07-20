<script setup lang="ts">
import EventEditModal from '@/components/EventEditModal.vue'
import type { paths } from '@/types/api-types'
import { ref, type Ref } from 'vue'
import Events from '../components/Events.vue'

const showModal = ref(false)
const selectedEvent: Ref<
  paths['/v1/api/events/{id}']['get']['responses']['200']['content']['application/json'] | null
> = ref(null)

const loading = ref(false)

function deleteEvent() {
  const confirm = window.confirm('Are you sure you want to delete this event?')

  if (confirm && selectedEvent.value) {
    // delete event
    loading.value = true

    console.log(selectedEvent.value)
    const path: keyof paths = '/v1/api/events/{id}'

    // get url from enviroment
    const url = import.meta.env.VITE_API_URL
    fetch(url + path.replace('{id}', selectedEvent.value.id), {
      method: 'DELETE',
    })
      .then(() => {
        showModal.value = false
        loading.value = false
        // force reload
        location.reload()
      })
      .catch((error) => {
        console.error(error)
        loading.value = false
      })
  }
}
</script>

<template>
  <main>
    <Events
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
    <EventEditModal
      :allowBackdrop="false"
      v-if="showModal && selectedEvent"
      @close="showModal = false"
    >
      <div>
        <div>
          <h2>{{ selectedEvent.name }}</h2>
          <p>{{ selectedEvent.description }}</p>
        </div>
        <div class="flex flex-col">
          <input type="text" v-model="selectedEvent.name" />
          <input type="text" v-model="selectedEvent.description" />
          <input type="number" v-model="selectedEvent.priority" />
          <select v-model="selectedEvent.type">
            <option value="crosspromo">crosspromo</option>
            <option value="liveops">liveops</option>
            <option value="app">app</option>
            <option value="ads">ads</option>
          </select>
          <button @click="deleteEvent()" :disabled="loading">
            {{ $t('delete') }}
          </button>
        </div>
      </div>
    </EventEditModal>
  </main>
</template>

<style scoped>
/* Style inputs */

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
