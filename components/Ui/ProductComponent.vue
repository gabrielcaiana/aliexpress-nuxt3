<script setup lang="ts">
import { Product } from "~/types/product";

const props = defineProps<{
  product: Product;
}>();

const { product } = toRefs(props);

const priceComputed = computed(() => product.value.price / 100);

const oldPriceComputed = computed(() => {
  const res = (product.value.price + product.value.price / 20) / 100;
  return res.toFixed(2);
});
</script>

<template>
  <div
    :id="`product-component-${product.id}`"
    class="bg-white inline-block rounded hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.15)] cursor-pointer"
  >
    <nuxt-link :to="`/item/${product.id}`">
      <img class="rounded-t" :src="product.url" :alt="product.title" />

      <div id="ProductDetails">
        <span class="flex items-center justify-start gap-3 px-1 pt-1">
          <span class="text-primary font-semibold">${{ priceComputed }}</span>
          <span class="text-gray-500 text-sm text-light line-through"
            >${{ oldPriceComputed }}</span
          >
        </span>

        <span class="px-1 relative -top-1.5 text-primary text-xs font-semibold">
          Extra 5% off
        </span>

        <div class="flex items-center gap-1 px-1 relative -top-1">
          <span
            class="bg-primary-dark text-white text-[9px] font-semibold px-1.5 rounded-sm"
            >Welcome Deal</span
          >
          <span
            class="bg-neutral-50 border text-brown text-[9px] font-semibold px-1.5 rounded-sm"
            >Top Selling</span
          >
        </div>

        <p class="flex items-center px-1 pt-0.5 text-xs text-neutral-700">
          5,000+ sold
          <Icon
            name="material-symbols:star-rate"
            class="text-neutral-350 ml-1.5"
          />
          4.7
        </p>

        <p class="px-1 pt-0.5 text-xs text-neutral-700">
          {{ product.title.substring(0, 60) }}
        </p>

        <p class="px-1 pb-1">
          <span class="text-success text-xs font-semibold">Free Shipping</span>
        </p>
      </div>
    </nuxt-link>
  </div>
</template>
