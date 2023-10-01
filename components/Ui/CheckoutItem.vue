<script setup lang="ts">
import { Product } from "~/types/product";

const props = defineProps<{
  product: Product;
}>();

const { product } = toRefs(props);
</script>
<template>
  <div class="flex justify-start my-2">
    <img
      class="rounded-md md:w-[150px] w-[90px] h-[120px] object-cover"
      :src="product.url"
    />

    <div class="overflow-hidden pl-2">
      <div class="flex items-center">
        <span
          class="bg-primary-dark text-white text-[9px] font-semibold px-1.5 rounded-sm min-w-[80px]"
          >Welcome Deal</span
        >
        <div class="truncate pl-2">{{ product.title }}</div>
      </div>

      <div class="text-lg font-semibold mt-2">
        $ <span class="font-bold">{{ product.price / 100 }}</span>
      </div>
    </div>
  </div>
</template>
