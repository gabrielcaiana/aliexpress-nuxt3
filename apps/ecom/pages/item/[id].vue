<script setup lang="ts">
import { Product } from "~/types/product";

const userStore = useUserStore();
const route = useRoute();
const product: Ref<Product | null> = ref(null);

const currentImage = ref("");

const images: Ref<string[]> = ref([
  "",
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/236/200/300",
  "https://picsum.photos/id/235/200/300",
  "https://picsum.photos/id/234/200/300",
  "https://picsum.photos/id/233/200/300",
]);

const priceComputed = computed(() => {
  if (product.value) return product.value.price / 100;
  return "0.00";
});

const isInCart = computed(() => {
  let res = false;

  userStore.cart.forEach((prod: Product) => {
    const id = Number(route.params.id);

    if (id === prod.id) {
      res = true;
    }
  });

  return res;
});

const addToCart = () => userStore.cart.push(product.value as Product);

const { data } = await useFetch(
  `/api/prisma/get-product-by-id/${route.params.id}`,
);

watchEffect(() => {
  if (data.value) {
    product.value = data.value;
    currentImage.value = product.value.url;
    images.value[0] = product.value.url;
    userStore.isLoading = false;
  }
});
</script>

<template>
  <div id="item-page" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[40%]">
        <img
          v-if="currentImage"
          :src="currentImage"
          alt="image"
          class="rounded-lg object-cover w-full max-h-[450px]"
        />

        <div
          v-if="images[0] !== ''"
          class="flex items-center justify-center mt-2"
        >
          <div v-for="image in images" :key="image">
            <img
              width="70"
              class="rounded-md object-fit border-[3px] cursor-pointe"
              :class="
                currentImage === image ? 'border border-primary-light' : ''
              "
              :src="image"
              @mouseover="currentImage = image"
              @click="currentImage = image"
            />
          </div>
        </div>
      </div>

      <div class="md:w-[60%] bg-white p-3 rounded-lg">
        <div v-if="product">
          <p class="mb-2">{{ product?.title }}</p>
          <p class="font-light text-[112px mb-2]">{{ product?.description }}</p>
        </div>

        <div class="flex items-center pt-1.5">
          <span class="h-4 min-w-4 rounded-full p-0.5 bg-warning mr-2">
            <Icon
              name="material-symbols:star-rounded"
              class="-mt-[17px]"
              size="12"
            />
          </span>
          <p class="text-primary-light">Extra 5% off</p>
        </div>

        <div class="flex items-center justify-start my-2">
          <Icon
            v-for="(star, index) in 5"
            :key="index"
            name="ic:baseline-star"
            class="text-primary-light"
          />
          <span class="text-[13px] font-light ml-2"
            >5 213 Reviews 1,000+ orders</span
          >
        </div>

        <div class="border-b" />

        <div class="flex items-center justify-start gap-2 my-2">
          <div class="text-xl font-bold">$ {{ priceComputed }}</div>
          <span
            class="bg-neutral-50 border text-brown text-[9px] font-semibold px-1.5 rounded-sm"
            >70% off</span
          >
        </div>

        <p class="text-success text-xs font-semibold pt-1">
          Free 11-day delivery over ￡8.28
        </p>

        <p class="text-success text-xs font-semibold pt-1">Free Shipping</p>

        <div class="py-2" />

        <button
          :disabled="isInCart"
          class="px-6 py-2 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-warning-darkest to-warning-dark"
          @click="addToCart()"
        >
          <div v-if="isInCart">Is Added</div>
          <div v-else>Add to Cart</div>
        </button>
      </div>
    </div>
  </div>
</template>
