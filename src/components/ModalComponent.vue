<!-- TEMPLATE -->
<!-- TEMPLATE -->
<!-- TEMPLATE -->
<!-- TEMPLATE -->
<!-- TEMPLATE -->
<template>
  <div class="modal-backdrop" @click.self="allowBackdrop && close">
    <div class="modal-content">
      <slot />

      <div class="mt-4"></div>

      <div class="flex justify-between">
        <button :disabled="loading" class="terciary" @click="close">{{ $t('cancel') }}</button>

        <button :disabled="loading" class="primary" @click="save">{{ $t('save') }}</button>
      </div>
    </div>
  </div>
</template>

<!-- SCRIPT -->
<!-- SCRIPT -->
<!-- SCRIPT -->
<!-- SCRIPT -->
<!-- SCRIPT -->
<script lang="ts">
export default {
  name: 'ModalComponent',
}
</script>

<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
<!-- SCRIPT SETUP -->
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
function close() {
  emit('close')
}

function save() {
  emit('save')
}
</script>

<!-- STYLES -->
<!-- STYLES -->
<!-- STYLES -->
<!-- STYLES -->
<!-- STYLES -->
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
