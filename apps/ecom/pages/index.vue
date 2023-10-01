<script setup lang="ts">
import { Product } from "~/types/product";

const products: Ref<Product[]> = ref([
  {
    id: 1,
    title: "Product 1",
    description: "Product 1 description",
    url: "https://picsum.photos/id/237/200/300",
    price: 999,
  },
  {
    id: 2,
    title: "Product 2",
    description: "Product 1 description",
    url: "https://picsum.photos/id/238/200/300",
    price: 999,
  },
  {
    id: 3,
    title: "Product 3",
    description: "Product 1 description",
    url: "https://picsum.photos/id/239/200/300",
    price: 999,
  },
  {
    id: 4,
    title: "Product 4",
    description: "Product 1 description",
    url: "https://picsum.photos/id/240/200/300",
    price: 999,
  },
  {
    id: 5,
    title: "Product 5",
    description: "Product 1 description",
    url: "https://picsum.photos/id/228/200/300",
    price: 999,
  },
  {
    id: 6,
    title: "Product 6",
    description: "Product 1 description",
    url: "https://picsum.photos/id/241/200/300",
    price: 999,
  },
  {
    id: 7,
    title: "Product 7",
    description: "Product 1 description",
    url: "https://picsum.photos/id/242/200/300",
    price: 999,
  },
  {
    id: 8,
    title: "Product 8",
    description: "Product 1 description",
    url: "https://picsum.photos/id/243/200/300",
    price: 999,
  },
  {
    id: 9,
    title: "Product 9",
    description: "Product 1 description",
    url: "https://picsum.photos/id/244/200/300",
    price: 999,
  },
  {
    id: 10,
    title: "Product 10",
    description: "Product 1 description",
    url: "https://picsum.photos/id/233/200/300",
    price: 999,
  },
]);
</script>

<template>
  <div id="indexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div
      class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4"
    >
      <div v-for="product in products" :key="product.id">
        <UiProductComponent v-if="product" :product="product" />
      </div>
    </div>
  </div>
</template>
