import i18n from '@/i18n'
import type { components, paths } from '@/types/api-types'
import { ref, type Ref } from 'vue'

export type EventType = NonNullable<
  paths['/v1/api/events/{id}']['get']['responses']['200']['content']['application/json']['data']
>
type EventList = EventType[]

type EventGetManyResponse =
  paths['/v1/api/events']['get']['responses']['200']['content']['application/json']

type EventDeleteResponse =
  paths['/v1/api/events/{id}']['delete']['responses']['200']['content']['application/json']

type EventUpdateDto =
  | paths['/v1/api/events/{id}']['patch']['requestBody']['content']['application/json']
  | null

type EventUpdateResponse =
  paths['/v1/api/events/{id}']['patch']['responses']['200']['content']['application/json']

export type EventCreateDto =
  paths['/v1/api/events']['post']['requestBody']['content']['application/json']

export function useEvents() {
  const { t } = i18n.global

  const events = ref<EventList>([])

  const loadingGet = ref(false)
  const errorGet: Ref<string | null> = ref(null)

  const loadingDelete = ref(false)
  const errorDelete: Ref<string | null> = ref(null)

  const loadingUpdate = ref(false)
  const errorUpdate: Ref<string | null> = ref(null)

  const loadingCreate = ref(false)
  const errorOnCreate: Ref<string | null> = ref(null)

  /**
   * Delete an event
   * @param id
   * @returns
   */
  const deleteEvent = async (id: string): Promise<EventDeleteResponse | null> => {
    // check for confirmation
    const confirmed = window.confirm(t('events.areYouSure'))
    if (!confirmed) return null

    // set loading
    loadingDelete.value = true
    errorDelete.value = null

    // prepare URL
    const path: keyof paths = '/v1/api/events/{id}'
    const url = import.meta.env.VITE_API_URL + path.replace('{id}', id)

    try {
      // send request
      const res = await fetch(url, { method: 'DELETE' })

      return checkResponseStatus<EventDeleteResponse>(res, loadingDelete, errorDelete)
    } catch (err) {
      console.error(err)
      alert(t('error'))

      return null
    }
  }

  const updateEvent = async (
    id: NonNullable<EventType>['id'],
    dto: EventUpdateDto,
  ): Promise<EventUpdateResponse | null> => {
    // set loading
    loadingUpdate.value = true
    errorUpdate.value = null

    try {
      // prepare URL
      const path: keyof paths = '/v1/api/events/{id}'
      const url = import.meta.env.VITE_API_URL + path.replace('{id}', id)

      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      })

      return checkResponseStatus<EventUpdateResponse>(res, loadingUpdate, errorUpdate)
    } catch (err) {
      console.error(err)
      alert(t('error'))

      return null
    }
  }

  const createEvent = async (dto: EventCreateDto) => {
    // set loading
    loadingCreate.value = true
    errorOnCreate.value = null

    try {
      // prepare URL
      const path: keyof paths = '/v1/api/events'
      const url = import.meta.env.VITE_API_URL + path

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      })

      return checkResponseStatus<EventUpdateResponse>(res, loadingCreate, errorOnCreate)
    } catch (err) {
      console.error(err)
      alert(t('error'))

      return null
    }
  }

  /**
   * Fetches the list of events from the API
   *
   * @description
   * This function fetches the list of events from the API and stores it in the
   * `events` ref. If there is an error, the error is logged to the console.
   *
   * @returns {Promise<void>}
   */
  const getEvents = async () => {
    loadingGet.value = true
    errorGet.value = null

    try {
      const path: keyof paths = '/v1/api/events'
      const url = import.meta.env.VITE_API_URL + path

      const res = await fetch(url)
      const json = (await res.json()) as EventGetManyResponse

      events.value = json
    } catch (error) {
      console.error('Failed to fetch events:', error)
      // optional: add error handling logic
    } finally {
      loadingGet.value = false
    }
  }

  const checkResponseStatus = async <T>(res: Response, loadingRef: Ref, errorRef: Ref) => {
    switch (res.status) {
      case 201:
        const json201 = (await res.json()) as T

        loadingRef.value = false
        errorRef.value = null
        return json201
      case 200:
        const json200 = (await res.json()) as T

        loadingRef.value = false
        errorRef.value = null
        return json200

      case 400:
        const json400 = (await res.json()) as components['schemas']['BadRequestResponseType']

        console.log('todo json400', json400)

        loadingRef.value = false
        errorRef.value = null
        // toast
        // TODO
        return null

      case 403:
        const json403 = (await res.json()) as components['schemas']['ForbiddenResponseType']

        console.log('todo json403', json403)
        // toast
        // TODO

        loadingRef.value = false
        errorRef.value = null
        return null

      case 404:
        const json404 = (await res.json()) as components['schemas']['NotFoundExceptionType']

        console.log('todo json404', json404)
        // toast
        // TODO

        loadingRef.value = false
        errorRef.value = null
        return null

      default:
        alert('Unhandled error occured. Please contact support.')
        console.log('response', res)

        return null
    }
  }

  return {
    loadingGet,
    errorGet,
    loadingDelete,
    errorDelete,
    loadingUpdate,
    errorUpdate,
    loadingCreate,
    errorOnCreate,
    events,
    getEvents,
    deleteEvent,
    updateEvent,
    createEvent,
  }
}
