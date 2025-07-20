<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<script setup lang="ts">
import { default as ModalComponent } from '@/components/ModalComponent.vue'
import type { paths } from '@/types/api-types'
import { ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Events from '../components/EventsComponent.vue'

const { t } = useI18n()

const showEditModal = ref(false)
const showCreateModal = ref(false)
const selectedEvent: Ref<
  paths['/v1/api/events/{id}']['get']['responses']['200']['content']['application/json'] | null
> = ref(null)

const createEventDto: Ref<
  paths['/v1/api/events']['post']['requestBody']['content']['application/json']
> = ref({
  name: '',
  description: '',
  type: 'crosspromo',
  priority: 0,
})

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
      .then((res) => res.json())
      .then((res) => {
        const response =
          res as paths['/v1/api/events/{id}']['delete']['responses']['400']['content']['application/json']

        if (response.error && response.message && response.statusCode == 400) {
          // instead of toast we will just alert
          alert(response.message[0])

          loading.value = false
          return
        }

        showEditModal.value = false
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
    .then((res) => res.json())
    .then((res) => {
      const response =
        res as paths['/v1/api/events/{id}']['patch']['responses']['400']['content']['application/json']

      if (response.error && response.message && response.statusCode == 400) {
        // instead of toast we will just alert
        alert(response.message[0])

        loading.value = false
        return
      }

      showEditModal.value = false
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

function createEvent() {
  const path: keyof paths = '/v1/api/events'

  const url = import.meta.env.VITE_API_URL

  fetch(url + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createEventDto.value),
  })
    .then((res) => res.json())
    .then((res) => {
      const response =
        res as paths['/v1/api/events']['post']['responses']['400']['content']['application/json']

      if (response.error && response.message && response.statusCode == 400) {
        // instead of toast we will just alert
        alert(response.message[0])

        loading.value = false
        return
      } else if (response.error && response.message && response.statusCode == 403) {
        // instead of toast we will just alert
        alert(t('error403'))

        loading.value = false
        return
      }

      showCreateModal.value = false
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
  <main class="container mx-auto p-2">
    <!-- TITLE -->
    <!-- TITLE -->
    <!-- TITLE -->
    <h2 class="mt-[50px] mb-[30px] text-center text-2xl">{{ $t('events.events') }}</h2>

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
          showEditModal = true
        }
      "
      @create-event="
        () => {
          createEventDto = { name: '', description: '', type: 'crosspromo', priority: 0 }
          showCreateModal = true
        }
      "
    />

    <!-- EVENT EDIT MODAL -->
    <!-- EVENT EDIT MODAL -->
    <!-- EVENT EDIT MODAL -->
    <ModalComponent
      :allowBackdrop="false"
      v-if="showEditModal && selectedEvent"
      @close="showEditModal = false"
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
    </ModalComponent>

    <!-- EVENT EDIT MODAL -->
    <!-- EVENT EDIT MODAL -->
    <!-- EVENT EDIT MODAL -->
    <ModalComponent
      :allowBackdrop="false"
      v-if="showCreateModal && createEventDto"
      @close="showCreateModal = false"
      @save="createEvent"
      :loading="loading"
    >
      <div>
        <div class="mb-2">
          <h2 class="text-center">{{ $t('events.newEvent') }}</h2>
        </div>
        <div class="flex flex-col">
          <!-- add labelrs -->

          <label for="name">{{ $t('events.table.name') }}</label>
          <input type="text" id="name" v-model="createEventDto.name" />

          <label for="description">{{ $t('events.table.description') }}</label>
          <input type="text" id="description" v-model="createEventDto.description" />

          <label for="priority">{{ $t('events.table.priority') }}</label>
          <input type="number" id="priority" v-model="createEventDto.priority" />

          <label for="type">{{ $t('events.table.type') }}</label>
          <select id="type" v-model="createEventDto.type">
            <option value="crosspromo">crosspromo</option>
            <option value="liveops">liveops</option>
            <option value="app">app</option>
            <option value="ads">ads</option>
          </select>
        </div>
      </div>
    </ModalComponent>
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
