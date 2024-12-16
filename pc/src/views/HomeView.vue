<script setup lang="ts">
import { useAppStore } from '@/stores/useAppStore'
import { logger } from '@shared-utils/tools'

function checkVersion() {
  logger.info(`check browser : is electron? ${useAppStore().isElectron}`)
  if (!useAppStore().isElectron) return
  window.electron.ipcRenderer.invoke('updateVersion')
}
</script>

<template>
  <div>
    <el-button @click="checkVersion">检查更新</el-button>
  </div>
</template>

<style lang="scss" scoped>

</style>
