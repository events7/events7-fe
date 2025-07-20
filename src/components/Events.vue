<template>
  <div class="p-2">
    <h2 class="mt-4 mb-3 text-center text-2xl">{{ $t('events.events') }}</h2>

    <!-- LOADING INDICATOR -->
    <div class="w-full flex flex-col items-center justify-center min-h-[50vh]" v-if="loading">
      {{ $t('loading') }}
    </div>

    <!-- ERROR INDICATOR -->
    <div class="w-full flex flex-col items-center justify-center min-h-[50vh]" v-else-if="error">
      {{ error }}
    </div>

    <!-- NO EVENTS INDICATOR -->
    <div
      class="w-full flex flex-col items-center justify-center min-h-[50vh]"
      v-else-if="events.length === 0"
    >
      {{ $t('events.noEvents') }}
    </div>

    <!-- EVENTS LISTED -->
    <div class="w-full flex flex-col items-center justify-center min-h-[50vh]" v-else>
      <table>
        <thead>
          <tr>
            <th>{{ $t('events.table.createdAt') }}</th>
            <th>{{ $t('events.table.name') }}</th>
            <th>{{ $t('events.table.description') }}</th>
            <th>{{ $t('events.table.type') }}</th>
            <th>{{ $t('events.table.priority') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="event in events" :key="event.id" @click="showAlert">
            <td>{{ formatDate(event.createdAt) }}</td>
            <td>{{ event.name }}</td>
            <td>{{ event.description }}</td>
            <td>{{ capitalize(event.type) }}</td>
            <td class="!text-center">{{ event.priority }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import type { paths } from '../types/api-types'

export default {
  name: 'EventsComponent',
  data(): {
    events: paths['/v1/api/events']['get']['responses']['200']['content']['application/json']
    loading: boolean
    error: string | null
  } {
    return {
      events: [],
      loading: true,
      error: null,
    }
  },
  methods: {
    formatDate: (value: string) => {
      if (!value) return ''
      const date = new Date(value)
      return date.toLocaleString('sl-SI', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
    showAlert() {
      alert('this.message')
    },
  },
  computed: { capitalize: () => (value: string) => value.toLocaleUpperCase() },
  mounted() {
    const path: keyof paths = '/v1/api/events'

    // get url from enviroment
    const url = import.meta.env.VITE_API_URL
    fetch(url + path)
      .then((response) => response.json())
      .then((data) => {
        this.events = data
        this.loading = false
      })
      .catch((error) => {
        console.error(error)
        this.error = this.$t('error')
        this.loading = false
      })
  },
}
</script>

<style scoped>
/* Style table */
table {
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

th {
  background-color: #e63946;
  color: #ffffff;
  border: none;
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
