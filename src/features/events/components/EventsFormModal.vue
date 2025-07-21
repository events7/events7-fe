<script setup lang="ts">
import ModalComponent from '@/components/ModalComponent.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { EventCreateDto, EventType } from '../composables/useEvents'

const { t } = useI18n()

const props = defineProps<{
  isEdit: boolean
  fieldErrors: Record<string, string>
  modelValue: NonNullable<EventCreateDto | EventType>
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'save', entry: EventCreateDto): void
  (e: 'delete'): void
}>()

// Clone the modelValue to avoid mutating parent directly
const localEvent = ref({ ...props.modelValue })

const formTitle = computed(() => (props.isEdit ? t('events.editEvent') : t('events.newEvent')))
</script>

<template>
  <ModalComponent
    :allowBackdrop="false"
    @close="emit('cancel')"
    @save="emit('save', localEvent)"
    :loading="loading"
  >
    <div>
      <div class="mb-2">
        <h2 class="text-center">{{ formTitle }}</h2>
      </div>
      <div class="flex flex-col">
        <!-- add labelrs -->

        <label for="name">{{ $t('events.table.identification') }}</label>
        <input
          required
          type="text"
          id="name"
          v-model="localEvent.identification"
          :class="{ error: fieldErrors.identification }"
        />
        <div v-if="fieldErrors.identification" class="text-red-500 text-sm">
          {{ fieldErrors.identification }}
        </div>

        <label for="name">{{ $t('events.table.name') }}</label>
        <input
          required
          type="text"
          id="name"
          v-model="localEvent.name"
          :class="{ error: fieldErrors.name }"
        />
        <div v-if="fieldErrors.name" class="text-red-500 text-sm">
          {{ fieldErrors.name }}
        </div>

        <label required for="description">{{ $t('events.table.description') }}</label>
        <input
          type="text"
          id="description"
          v-model="localEvent.description"
          :class="{ error: fieldErrors.description }"
        />
        <div v-if="fieldErrors.description" class="text-red-500 text-sm">
          {{ fieldErrors.description }}
        </div>

        <label required for="priority">{{ $t('events.table.priority') }}</label>
        <input
          min="1"
          max="10"
          type="number"
          id="priority"
          v-model="localEvent.priority"
          :class="{ error: fieldErrors.priority }"
        />
        <div v-if="fieldErrors.priority" class="text-red-500 text-sm">
          {{ fieldErrors.priority }}
        </div>

        <label for="type">{{ $t('events.table.type') }}</label>
        <select required id="type" v-model="localEvent.type" :class="{ error: fieldErrors.type }">
          <option value="crosspromo">crosspromo</option>
          <option value="liveops">liveops</option>
          <option value="app">app</option>
          <option value="ads">ads</option>
        </select>
        <div v-if="fieldErrors.type" class="text-red-500 text-sm">
          {{ fieldErrors.type }}
        </div>

        <!-- DELETE BUTTON -->
        <div v-if="isEdit" class="flex justify-center">
          <button
            id="modal-delete-button"
            @click="emit('delete')"
            :disabled="props.loading"
            class="cursor-pointer danger"
          >
            {{ $t('delete') }}
          </button>
        </div>
      </div>
    </div>
  </ModalComponent>
</template>

<style>
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

input.error,
select.error {
  border-color: red;
  margin-bottom: 0 !important;
}
</style>
