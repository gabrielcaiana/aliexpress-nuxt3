<script setup lang="ts">
import { Address } from "~/types/address";

// const stripe = null;
// const elements = null;
// const card = null;
// const form = null;
const total: Ref<string | number> = ref("");
// const clientSecret = null;
const currentAddress: Ref<Address | null> = ref(null);
const isProcessing: Ref<boolean> = ref(false);

const userStore = useUserStore();
const user = useSupabaseUser();
const route = useRoute();

onBeforeMount(async () => {
  // if (userStore.checkout.length < 1) {
  //   return navigateTo("/cart");
  // }

  total.value = "0.00";

  if (user.value) {
    const { data } = await useFetch(
      `/api/prisma/get-address-by-user/${user.value.id}}`,
    );

    currentAddress.value = data.value;
    setTimeout(() => (userStore.isLoading = false), 200);
  }
});

watchEffect(() => {
  if (route.fullPath === "/checkout" && !user.value) {
    return navigateTo("/auth");
  }
});

onMounted(() => {
  isProcessing.value = true;
  userStore.checkout.forEach((item: any) => (total.value += item.price));
});

watch(
  () => total.value,
  () => {
    if (Number(total.value) > 0) {
      stripeInit();
    }
  },
);

const stripeInit = async () => {};

const pay = async () => {};

// const createOrder = async (stripeId: string) => {};
// const showError = async (errorMsgText: string) => {};

useHead({
  title: "Checkout",
});
</script>

<template>
  <div id="checkout-page" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[65%]">
        <div class="bg-white rounded-lg p-4">
          <div class="text-xl font-semibold mb-2">Shipping Address</div>
          <div v-if="currentAddress">
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
                  <div class="font-bold">{{ currentAddress.name }}</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Address:</div>
                  <div class="font-bold">{{ currentAddress.address }}</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Zip Code:</div>
                  <div class="font-bold">{{ currentAddress.zipcode }}</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>City:</div>
                  <div class="font-bold">{{ currentAddress.city }}</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Country:</div>
                  <div class="font-bold">{{ currentAddress.country }}</div>
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
          <div v-for="product in userStore.checkout" :key="product.id">
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
              $ <span class="font-extrabold">{{ Number(total) / 100 }}</span>
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
