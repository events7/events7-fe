<script setup lang="ts">
import EventsList from '@/features/events/components/EventsList.vue'
import {
  useEvents,
  type EventCreateDto,
  type EventType,
} from '@/features/events/composables/useEvents'
import { ref, type Ref } from 'vue'
import EventsFormModal from './components/EventsFormModal.vue'

const { loadingDelete, deleteEvent, updateEvent, loadingUpdate, createEvent, loadingCreate } =
  useEvents()

const showEditModal = ref(false)
const showCreateModal = ref(false)
const selectedEventDto: Ref<EventType | null> = ref(null)

const createEventDto: Ref<EventCreateDto> = ref({
  identification: '',
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

function onUpdate(data: EventCreateDto) {
  if (selectedEventDto.value === null) {
    return
  }

  updateEvent(selectedEventDto.value.id, {
    identification: data.identification,
    description: data.description,
    name: data.name,
    priority: data.priority,
    type: data.type,
  }).then((res) => {
    if (!res?.success) return

    // toast
    // TODO

    showEditModal.value = false
    eventsKey.value += 1 // Increment key to force reload Events
  })
}

function onCreate(data: EventCreateDto) {
  createEvent(data).then((res) => {
    if (!res?.success) return

    // toast
    // TODO

    showCreateModal.value = false
    eventsKey.value += 1 // Increment key to force reload Events
  })
}
</script>

<template>
  <!-- TITLE -->
  <h2 class="mt-[50px] mb-[30px] text-center text-2xl">{{ $t('events.events') }}</h2>

  <!-- EVENTS -->
  <EventsList
    :key="eventsKey"
    @event-selected="
      (event: NonNullable<EventType>) => {
        selectedEventDto = { ...event }
        showEditModal = true
      }
    "
    @create-event="
      () => {
        createEventDto = { identification: '', name: '', description: '', type: 'ads', priority: 1 }
        showCreateModal = true
      }
    "
  />

  <!-- EDIT MODAL -->
  <EventsFormModal
    v-if="showEditModal && selectedEventDto"
    v-model="selectedEventDto"
    :isEdit="true"
    :loading="loadingUpdate || loadingDelete"
    @save="onUpdate"
    @cancel="showEditModal = false"
    @delete="onDelete()"
  />

  <!-- CREATE MODAL -->
  <EventsFormModal
    v-if="showCreateModal && createEventDto"
    v-model="createEventDto"
    :isEdit="false"
    :loading="loadingCreate"
    @save="onCreate"
    @cancel="showCreateModal = false"
    @delete="onDelete()"
  />
</template>

<style></style>
