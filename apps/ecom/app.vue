<template>
  <div class="fixed overflow-auto z-[-1] bg-neutral-200 w-full h-[100vh]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "AliExpress",
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s;
}
.layout-enter-from {
  opacity: 0;
  transform: translate(100px, 0);
}
.layout-leave-to {
  opacity: 0;
  transform: translate(-100px, 0);
}
</style>
