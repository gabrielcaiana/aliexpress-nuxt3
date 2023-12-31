<script setup lang="ts">
import { Product } from "~/types/product";

const props = defineProps<{
  product: Product;
  selectedArray: any;
}>();

const userStore = useUserStore();

const { product } = toRefs(props);

const emit = defineEmits<{
  (e: "selectedRadio", { id, val }: { id: number; val: any }): void;
}>();

const isHover: Ref<boolean> = ref(false);
const isSelected: Ref<boolean> = ref(false);

const removeFromCart = () => {
  userStore.cart.forEach((prod: Product, index: number) => {
    if (prod.id === product.value.id) {
      userStore.cart.splice(index, 1);
    }
  });
};

watch(
  () => isSelected.value,
  (val) => {
    emit("selectedRadio", { id: product.value.id, val });
  },
);
</script>
<template>
  <div class="flex justify-start my-2">
    <div class="my-auto">
      <div
        class="flex items-center justify-start p-0.5 cursor-pointer"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
      >
        <div
          class="flex items-center justify-center h-[20px] w-[20px] rounded-full border mr-5 ml-2"
          :class="[
            isHover ? 'border-primary-dark' : 'border-gray-300',
            isSelected ? 'bg-primary-dark' : '',
          ]"
          @click="isSelected = !isSelected"
        >
          <div class="h-[8px] w-[8px] rounded-full bg-white" />
        </div>
      </div>
    </div>

    <img
      class="rounded-md md:w-[150px] w-[90px] max-h-[120px] object-cover"
      :src="product.url"
    />

    <div class="overflow-hidden pl-2 w-full">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-between truncate">
          <span
            class="sm:block hidden bg-primary-dark text-white text-[9px] font-semibold px-1.5 rounded-sm min-w-[80px]"
            >Welcome Deal</span
          >
          <div class="truncate sm:pl-2">{{ product.title }}</div>
        </div>
        <button
          class="mx-3 sm:block hidden -mt-0.5 hover:text-red-500"
          @click="removeFromCart()"
        >
          <Icon name="material-symbols:delete-outline" size="20" />
        </button>
      </div>

      <div class="text-xl font-semibold">
        $ <span class="font-bold">{{ product.price / 100 }}</span>
      </div>

      <p class="text-success text-xs font-semibold pt-1">
        Free 11-day delivery over ￡8.28
      </p>

      <p class="text-success text-xs font-semibold pt-1">Free Shipping</p>

      <div class="flex items-center justify-end">
        <button
          class="sm:hidden block -mt-0.5 hover:text-red-500"
          @click="removeFromCart()"
        >
          <Icon name="material-symbols:delete-outline" size="20" />
        </button>
      </div>
    </div>
  </div>
</template>
