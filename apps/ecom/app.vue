<template>
  <div class="fixed overflow-auto z-[-1] bg-neutral-200 w-full h-[100vh]">
    <NuxtLayout>
      <NuxtPage />
      <UiMenuOverlay
        :class="[
          {
            'max-h-[100vh] transition-all duration-200 ease-in visible':
              userStore.isMenuOverlay,
          },
          {
            'max-h-0 transition-all duration-200 ease-out invisible':
              !userStore.isMenuOverlay,
          },
        ]"
      />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "AliExpress",
});

const userStore = useUserStore();
const route = useRoute();

const windowWidth = ref(process.client ? window.innerWidth : 0);

onMounted(() => {
  userStore.isLoading = false;
  window.addEventListener("resize", function () {
    windowWidth.value = window.innerWidth;
  });
});

watch(
  () => windowWidth.value,
  () => {
    if (windowWidth.value >= 767) {
      userStore.isMenuOverlay = false;
    }
  },
);

watch(
  () => route.fullPath,
  () => {
    userStore.isLoading = true;
  },
);
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
