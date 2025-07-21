<script setup lang="ts">
import type { paths } from '@/types/api-types'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  isEdit: boolean
  visible: boolean
  modelValue:
    | paths['/v1/api/events']['post']['requestBody']['content']['application/json']
    | paths['/v1/api/events/{id}']['get']['responses']['200']['content']['application/json']['data']
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'close'): void
  (e: 'save'): void
  (e: 'delete'): void
}>()

const formTitle = computed(() => (props.isEdit ? t('events.editEvent') : t('events.newEvent')))
</script>

<template>
  <ModalComponent
    :allowBackdrop="false"
    v-if="visible"
    @close="emit('close')"
    @save="emit('save')"
    :loading="loading"
  >
    <div>
      <div class="mb-2">
        <h2 class="text-center">{{ formTitle }}</h2>
      </div>
      <div class="flex flex-col">
        <!-- add labelrs -->

        <!-- <label for="name">{{ $t('events.table.name') }}</label>
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
        </select> -->
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
</style>
