<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 13 14">
    <path :fill="color" d="M104.479,64.4a2.361,2.361,0,1,1-1.673.69,2.355,2.355,0,0,1,1.673-.69m0-1a3.359,3.359,0,1,0,3.368,3.359A3.364,3.364,0,0,0,104.479,63.4Zm2.8,8.009a2.574,2.574,0,0,1,1.892.856,3.021,3.021,0,0,1,.6.961,3.221,3.221,0,0,1,.224,1.19V75.4a1.077,1.077,0,0,1-.279.736.8.8,0,0,1-.578.267H99.859a.8.8,0,0,1-.578-.267A1.071,1.071,0,0,1,99,75.4v-.979a3.227,3.227,0,0,1,.224-1.19,3.049,3.049,0,0,1,.6-.961,2.574,2.574,0,0,1,1.892-.856h.484l1.419,1.531a1.193,1.193,0,0,0,1.747,0l1.429-1.534h.481m0-1h-.835a.192.192,0,0,0-.138.059l-1.67,1.793a.188.188,0,0,1-.276,0L102.7,70.47a.188.188,0,0,0-.138-.061h-.84A3.885,3.885,0,0,0,98,74.418V75.4a1.941,1.941,0,0,0,1.859,2h9.281a1.941,1.941,0,0,0,1.859-2v-.979A3.882,3.882,0,0,0,107.28,70.409Z" transform="translate(-98 -63.4)"/>
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
