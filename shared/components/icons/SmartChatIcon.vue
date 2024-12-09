<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 16 17">
    <path :fill="color" d="M3.184,10.083,0,13.267V0H13.267V10.083ZM5.837,3.715H3.184V6.368H5.837Zm4.245,0H7.429V6.368h2.653Z"/>
    <path :fill="color" d="M297.94,263.52V256h2.093v12.892l-3.254-3.223H288V263.52Z" transform="translate(-284.032 -251.892)"/>
  </svg>
</template>

<script lang="ts" setup>
interface Props {
  size?: number | string
  color?: string
}

withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor'
})
</script>
