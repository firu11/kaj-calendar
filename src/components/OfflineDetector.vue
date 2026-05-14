<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isOnline = ref(navigator.onLine);

function handleOnline() {
  isOnline.value = true;
}
function handleOffline() {
  isOnline.value = false;
}

onMounted(() => {
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
});

onUnmounted(() => {
  window.removeEventListener('online', handleOnline);
  window.removeEventListener('offline', handleOffline);
});
</script>

<template>
  <div class="connection-status" :class="isOnline ? 'online' : 'offline'">
    <span class="dot" />
    <span class="label">{{ isOnline ? 'Online' : 'Offline' }}</span>
  </div>
</template>

<style scoped>
.connection-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  transition: all 0.3s ease;
  justify-self: flex-start;
}

.online {
  color: #16a34a;
}

.offline {
  color: #dc2626;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: background 0.3s ease;
}

.online .dot {
  background: #16a34a;
  box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4);
  animation: pulse-green 2s infinite;
}

.offline .dot {
  background: #dc2626;
  box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4);
  animation: pulse-red 1.5s infinite;
}

@keyframes pulse-green {
  0% {
    box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(22, 163, 74, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(22, 163, 74, 0);
  }
}

@keyframes pulse-red {
  0% {
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(220, 38, 38, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
  }
}
</style>
