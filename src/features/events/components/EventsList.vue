<script setup lang="ts">
import { useEvents } from '@/features/events/composables/useEvents'
import { helpers } from '@/helpers/__helpers'
import { onMounted } from 'vue'

const { events, loadingGet, errorGet, getEvents } = useEvents()
const { formatDate, capitalize } = helpers()

onMounted(() => {
  getEvents()
})
</script>

<template>
  <!-- LOADING INDICATOR -->
  <div class="w-full flex flex-col items-center justify-center min-h-[50vh]" v-if="loadingGet">
    {{ $t('loading') }}
  </div>

  <!-- ERROR INDICATOR -->
  <div class="w-full flex flex-col items-center justify-center min-h-[50vh]" v-else-if="errorGet">
    {{ errorGet }}
  </div>

  <!-- NO EVENTS INDICATOR -->
  <div
    class="w-full flex flex-col items-center justify-center min-h-[50vh]"
    v-else-if="events.length === 0"
  >
    {{ $t('events.noEvents') }}

    <button id="events-add-new-event" class="primary mt-4" @click="$emit('create-event')">
      {{ $t('events.addNewEvent') }}
    </button>
  </div>

  <!-- EVENTS LISTED -->
  <div v-else>
    <div class="flex justify-end mb-4">
      <button id="events-add-new-event" class="primary border" @click="$emit('create-event')">
        {{ $t('events.addNewEvent') }}
      </button>
    </div>

    <div class="w-full flex flex-col items-center justify-center">
      <table class="w-full">
        <thead>
          <tr>
            <th>{{ $t('events.table.identification') }}</th>
            <th>{{ $t('events.table.createdAt') }}</th>
            <th>{{ $t('events.table.name') }}</th>
            <th>{{ $t('events.table.description') }}</th>
            <th>{{ $t('events.table.type') }}</th>
            <th>{{ $t('events.table.priority') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="event in events" :key="event.id" @click="$emit('event-selected', event)">
            <td>{{ event.identification }}</td>
            <td>{{ formatDate(event.createdAt) }}</td>
            <td>{{ event.name }}</td>
            <td>
              {{ event.description }}
            </td>
            <td>{{ capitalize(event.type) }}</td>
            <td class="!text-center">{{ event.priority }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Style table */
table {
  border-collapse: collapse;
}

th,
td {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

th {
  background-color: #e63946;
  color: #ffffff;
  border: none;
  text-align: center;
}

th:nth-child(1) {
  border-top-left-radius: 5px;
}

th:last-child {
  border-top-right-radius: 5px;
}

tr:nth-child(even) {
  background-color: #fff8f8;
}

tr:hover {
  background-color: #fbdddd;
}
</style>
