<template>
  <div class="modal-backdrop" @click.self="allowBackdrop && close">
    <div class="modal-content">
      <slot />
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  allowBackdrop: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close'])
function close() {
  emit('close')
}
</script>

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
  min-width: 300px;
}
</style>
