<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    title: string;
    color?: string;
    temporary?: boolean;
  }>(),
  {
    color: '#6495ed',
    temporary: false,
  },
);

const dynamicStyles = computed(() => ({
  '--event-color': props.color,
}));
</script>

<template>
  <div class="allday-event" :style="dynamicStyles" :class="{ temporary: temporary }">
    {{ title }}
  </div>
</template>

<style scoped>
.allday-event {
  background-color: color-mix(in srgb, var(--event-color), transparent 50%);
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0 3px;
  line-height: 1.2rem;

  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;

  overflow: hidden;
  white-space: nowrap;
  z-index: 400;

  width: calc(100% - 0.5px);
}

.allday-event.temporary {
  background-color: color-mix(in srgb, var(--event-color), transparent 85%); /* light */
}

/* hover only for non-temporary events */
.allday-event:not(.temporary):hover {
  filter: brightness(1.15);
}
</style>
