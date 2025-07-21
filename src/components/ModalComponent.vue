<script lang="ts" setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  allowBackdrop: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close', 'save'])
</script>

<template>
  <div id="modal" class="modal-backdrop" @click.self="allowBackdrop && emit('close')">
    <div class="modal-content relative">
      <!-- CLOSE BUTTON -->
      <div class="cursor-pointer absolute top-[1.5rem] right-[1.5rem]" @click="emit('close')">
        X
      </div>

      <!-- CONTENT -->
      <slot />

      <!-- FOOTER -->
      <div class="mt-4"></div>
      <div class="flex justify-between">
        <button
          id="modal-cancel-button"
          :disabled="loading"
          class="terciary"
          @click="emit('close')"
        >
          {{ $t('cancel') }}
        </button>

        <button id="modal-save-button" :disabled="loading" class="primary" @click="emit('save')">
          {{ $t('save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 400px;
  max-width: 99vw;
}
</style>
