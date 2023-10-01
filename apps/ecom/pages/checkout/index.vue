<script setup lang="ts">
import { Product } from "~/types/product";

const stripe = null;
const elements = null;
const card = null;
const form = null;
const total = ref(0);
const clientSecret = null;
const currentAddress = ref(null);
const isProcessing = ref(false);

const userStore = useUserStore();

onMounted(() => {
  isProcessing.value = true;
  userStore.checkout.forEach((item: any) => (total.value += item.price));
});

watch(
  () => total.value,
  () => {
    if (total.value > 0) {
      stripeInit();
    }
  },
);

const stripeInit = async () => {};

const pay = async () => {};

const createOrder = async (stripeId: string) => {};

const showError = async (errorMsgText: string) => {};

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
]);
</script>

<template>
  <div id="checkout-page" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[65%]">
        <div class="bg-white rounded-lg p-4">
          <div class="text-xl font-semibold mb-2">Shipping Address</div>
          <div v-if="false">
            <NuxtLink
              to="/address"
              class="flex items-center pb-2 text-blue-500 hover:text-red-400"
            >
              <Icon name="mdi:plus" size="18" class="mr-2" />
              Update Address
            </NuxtLink>

            <div class="pt-2 border-t">
              <div class="underline pb-1">Delivery Address</div>
              <ul class="text-xs">
                <li class="flex items-center gap-2">
                  <div>Contact name:</div>
                  <div class="font-bold">Test</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Address:</div>
                  <div class="font-bold">Test</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Zip Code:</div>
                  <div class="font-bold">Test</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>City:</div>
                  <div class="font-bold">Test</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Country:</div>
                  <div class="font-bold">Test</div>
                </li>
              </ul>
            </div>
          </div>

          <NuxtLink
            v-else
            to="/address"
            class="flex items-center text-blue-500 hover:text-red-400"
          >
            <Icon name="mdi:plus" size="18" class="mr-2" />
            Add New Address
          </NuxtLink>
        </div>

        <div id="items" class="bg-white rounded-lg p-4 mt-4">
          <div v-for="product in products" :key="product.id">
            <UiCheckoutItem :product="product" />
          </div>
        </div>
      </div>

      <div class="md:hidden block my-4" />
      <div class="md:w-[35%]">
        <div id="place-order" class="bg-white rounded-lg p-4">
          <div class="text-2xl font-extrabold mb-2">Summary</div>
          <div class="flex items-center justify-between my-4">
            <div class="">Total Shipping</div>
            <div class="">Free</div>
          </div>

          <div class="border-t" />

          <div class="flex items-center justify-between my-4">
            <div class="font-semibold">Total</div>
            <div class="text-2xl font-semibold">
              $ <span class="font-extrabold">{{ total / 100 }}</span>
            </div>
          </div>

          <form @submit.prevent="pay()">
            <div
              id="card-element"
              class="border border-gray-500 p-2 rounded-sm"
            />

            <p
              id="card-error"
              role="alert"
              class="text-red-700 text-center font-semibold"
            />

            <button
              :disabled="isProcessing"
              type="submit"
              class="mt-4 bg-gradient-to-r from-orange to-orange-dark w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
              :class="isProcessing ? 'opacity-70' : 'opacity-100'"
            >
              <Icon v-if="isProcessing" name="eos-icons:loading" />
              <div v-else>Place order</div>
            </button>
          </form>
        </div>

        <div class="bg-white rounded-lg p-4 mt-4">
          <div class="text-lg font-semibold mb-2 mt-2">AliExpress</div>
          <p class="my-2">AliExpress keeps your information and payment safe</p>
        </div>
      </div>
    </div>
  </div>
</template>