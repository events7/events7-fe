<script setup lang="ts">
import EventsList from '@/features/events/components/EventsList.vue'
import {
  useEvents,
  type EventCreateDto,
  type EventType,
} from '@/features/events/composables/useEvents'
import { reactive, ref, type Ref } from 'vue'
import { toast, type ToastOptions } from 'vue3-toastify'
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
  type: 'app',
  priority: 1,
})

const fieldErrors = reactive<Record<string, string>>({})

const eventsKey = ref(0) // Key to force reload

function onDelete() {
  clearFieldErrors()

  const id = selectedEventDto.value?.id

  if (id == undefined) {
    return
  }

  deleteEvent(id, fieldErrors).then((res) => {
    if (!res?.success) return

    toast(res.message, {
      position: toast.POSITION.BOTTOM_CENTER,
    } as ToastOptions)

    showEditModal.value = false
    eventsKey.value += 1 // Increment key to force reload Events
  })
}

function onUpdate(data: EventCreateDto) {
  if (selectedEventDto.value === null) {
    return
  }
  clearFieldErrors()

  updateEvent(
    selectedEventDto.value.id,
    {
      identification: data.identification,
      description: data.description,
      name: data.name,
      priority: data.priority,
      type: data.type,
    },
    fieldErrors,
  ).then((res) => {
    if (!res?.success) return

    toast(res.message, {
      position: toast.POSITION.BOTTOM_CENTER,
    } as ToastOptions)

    showEditModal.value = false
    eventsKey.value += 1 // Increment key to force reload Events
  })
}

function onCreate(data: EventCreateDto) {
  clearFieldErrors()

  createEvent(data, fieldErrors).then((res) => {
    if (!res?.success) return

    toast(res.message, {
      position: toast.POSITION.BOTTOM_CENTER,
    } as ToastOptions)

    showCreateModal.value = false
    eventsKey.value += 1 // Increment key to force reload Events
  })
}

function clearFieldErrors() {
  Object.keys(fieldErrors).forEach((key) => delete fieldErrors[key])
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
        clearFieldErrors()
        selectedEventDto = { ...event }
        showEditModal = true
      }
    "
    @create-event="
      () => {
        clearFieldErrors()
        createEventDto = { identification: '', name: '', description: '', type: 'app', priority: 1 }
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
    :field-errors="fieldErrors"
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
    :field-errors="fieldErrors"
  />
</template>

<style></style>
