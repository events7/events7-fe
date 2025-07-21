<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<script setup lang="ts">
import { default as ModalComponent } from '@/components/ModalComponent.vue'
import { useEvents } from '@/composables/useEvents'
import type { paths } from '@/types/api-types'
import { ref, type Ref } from 'vue'
import EventsList from '../components/EventsList.vue'

const { loadingDelete, deleteEvent, updateEvent, loadingUpdate, createEvent, loadingCreate } =
  useEvents()

const showEditModal = ref(false)
const showCreateModal = ref(false)
const selectedEventDto: Ref<
  paths['/v1/api/events/{id}']['get']['responses']['200']['content']['application/json']['data']
> = ref(null)

const createEventDto: Ref<
  paths['/v1/api/events']['post']['requestBody']['content']['application/json']
> = ref({
  name: '',
  description: '',
  type: 'ads',
  priority: 1,
})

const eventsKey = ref(0) // Key to force reload

function onDelete() {
  const id = selectedEventDto.value?.id

  if (id == undefined) {
    return
  }

  deleteEvent(id).then((res) => {
    if (!res?.success) return

    // toast
    // TODO

    showEditModal.value = false
    eventsKey.value += 1 // Increment key to force reload Events
  })
}

function onUpdate() {
  if (selectedEventDto.value === null) {
    return
  }

  updateEvent(selectedEventDto.value.id, {
    description: selectedEventDto.value.description,
    name: selectedEventDto.value.name,
    priority: selectedEventDto.value.priority,
    type: selectedEventDto.value.type,
  }).then((res) => {
    debugger
    if (!res?.success) return

    // toast
    // TODO

    showEditModal.value = false
    eventsKey.value += 1 // Increment key to force reload Events
  })
}

function onCreate() {
  createEvent(createEventDto.value).then((res) => {
    if (!res?.success) return

    // toast
    // TODO

    showCreateModal.value = false
    eventsKey.value += 1 // Increment key to force reload Events
  })
}
</script>

<!-- TEMPLATE -->
<!-- TEMPLATE -->
<!-- TEMPLATE -->
<!-- TEMPLATE -->
<!-- TEMPLATE -->
<template>
  <main id="home-view" class="container mx-auto p-2">
    <!-- TITLE -->
    <!-- TITLE -->
    <!-- TITLE -->
    <h2 class="mt-[50px] mb-[30px] text-center text-2xl">{{ $t('events.events') }}</h2>

    <!-- EVENTS -->
    <!-- EVENTS -->
    <!-- EVENTS -->
    <EventsList
      :key="eventsKey"
      @event-selected="
        (
          event: NonNullable<
            paths['/v1/api/events/{id}']['get']['responses']['200']['content']['application/json']['data']
          >,
        ) => {
          selectedEventDto = { ...event }
          showEditModal = true
        }
      "
      @create-event="
        () => {
          createEventDto = { name: '', description: '', type: 'ads', priority: 1 }
          showCreateModal = true
        }
      "
    />

    <!-- EVENT EDIT MODAL -->
    <!-- EVENT EDIT MODAL -->
    <!-- EVENT EDIT MODAL -->
    <ModalComponent
      :allowBackdrop="false"
      v-if="showEditModal && selectedEventDto"
      @close="showEditModal = false"
      @save="onUpdate"
      :loading="loadingDelete || loadingUpdate"
    >
      <div>
        <div class="mb-2">
          <h2 class="text-center">{{ $t('events.editEvent') }}</h2>
        </div>
        <div class="flex flex-col">
          <!-- add labelrs -->

          <label for="name">{{ $t('events.table.name') }}</label>
          <input required type="text" id="name" v-model="selectedEventDto.name" />

          <label required for="description">{{ $t('events.table.description') }}</label>
          <input type="text" id="description" v-model="selectedEventDto.description" />

          <label required for="priority">{{ $t('events.table.priority') }}</label>
          <input min="1" max="10" type="number" id="priority" v-model="selectedEventDto.priority" />

          <label for="type">{{ $t('events.table.type') }}</label>
          <select required id="type" v-model="selectedEventDto.type">
            <option value="crosspromo">crosspromo</option>
            <option value="liveops">liveops</option>
            <option value="app">app</option>
            <option value="ads">ads</option>
          </select>
          <div class="flex justify-center">
            <button
              id="modal-delete-button"
              @click="onDelete()"
              :disabled="loadingDelete || loadingUpdate"
              class="cursor-pointer danger"
            >
              {{ $t('delete') }}
            </button>
          </div>
        </div>
      </div>
    </ModalComponent>

    <!-- EVENT CREATE MODAL -->
    <!-- EVENT CREATE MODAL -->
    <!-- EVENT CREATE MODAL -->
    <ModalComponent
      :allowBackdrop="false"
      v-if="showCreateModal && createEventDto"
      @close="showCreateModal = false"
      @save="onCreate"
      :loading="loadingCreate"
    >
      <div>
        {{ loadingCreate ? 'Da' : 'Ne' }}
        <div class="mb-2">
          <h2 class="text-center">{{ $t('events.newEvent') }}</h2>
        </div>
        <div class="flex flex-col">
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
