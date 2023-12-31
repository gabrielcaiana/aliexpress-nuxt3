<script setup lang="ts">
import { Address } from "~/types/address";

const userStore = useUserStore();
const user = useSupabaseUser();

interface Error {
  type: string;
  message: string;
}

interface Model {
  contactName: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
}

const model = reactive<Model>({
  contactName: "",
  address: "",
  zipCode: "",
  city: "",
  country: "",
});

const currentAddress: Ref<Address | null> = ref(null);
const isUpdate: Ref<boolean> = ref(false);
const isWorking: Ref<boolean> = ref(false);
const error: Ref<Error | null> = ref(null);

watchEffect(async () => {
  const { data } = await useFetch(
    `/api/prisma/get-address-by-user/${user.value?.id}`,
  );

  if (data.value) {
    currentAddress.value = data.value;
    model.contactName = currentAddress.value.name;
    model.address = currentAddress.value.address;
    model.zipCode = currentAddress.value.zipcode;
    model.city = currentAddress.value.city;
    model.country = currentAddress.value.country;

    isUpdate.value = true;
  }

  userStore.isLoading = false;
});

const submit = async () => {
  isWorking.value = true;
  error.value = null;

  if (!model.contactName) {
    error.value = {
      type: "contactName",
      message: "Contact name is required",
    };
  } else if (!model.address) {
    error.value = {
      type: "address",
      message: "Address is required",
    };
  } else if (!model.zipCode) {
    error.value = {
      type: "zipCode",
      message: "Zip code is required",
    };
  } else if (!model.city) {
    error.value = {
      type: "city",
      message: "City is required",
    };
  } else if (!model.country) {
    error.value = {
      type: "country",
      message: "Country is required",
    };
  }

  if (error.value) {
    isWorking.value = false;
  }

  if (isUpdate.value) {
    await useFetch(`/api/prisma/update-address/${currentAddress.value?.id}`, {
      method: "PATCH",
      body: {
        userId: user.value?.id,
        ...model,
      },
    });

    isWorking.value = false;
    return navigateTo("/checkout");
  }

  await useFetch("/api/prisma/create-address", {
    method: "POST",
    body: {
      userId: user.value?.id,
      ...model,
    },
  });

  isWorking.value = false;
  return navigateTo("/checkout");
};

useHead({
  title: "Address",
});
</script>

<template>
  <div>
    <div id="address-page" class="mt-4 max-w-[500px] mx-auto px-2">
      <div class="mx-auto bg-white rounded-lg p-3">
        <div class="text-xl text-bold mb-2">Address Details</div>
        <form @submit.prevent="submit()">
          <BaseTextInput
            v-model="model.contactName"
            class="w-full"
            placeholder="Contact Name"
            input-type="text"
            :error="error && error.type == 'contactName' ? error.message : ''"
          />

          <BaseTextInput
            v-model="model.address"
            class="w-full mt-2"
            placeholder="Address"
            input-type="text"
            :error="error && error.type == 'address' ? error.message : ''"
          />

          <BaseTextInput
            v-model="model.zipCode"
            class="w-full mt-2"
            placeholder="Zip Code"
            input-type="text"
            :error="error && error.type == 'zipCode' ? error.message : ''"
          />

          <BaseTextInput
            v-model="model.city"
            class="w-full mt-2"
            placeholder="City"
            input-type="text"
            :error="error && error.type == 'city' ? error.message : ''"
          />

          <BaseTextInput
            v-model="model.country"
            class="w-full mt-2"
            placeholder="Country"
            input-type="text"
            :error="error && error.type == 'country' ? error.message : ''"
          />

          <button
            :disabled="isWorking"
            type="submit"
            class="mt-6 bg-gradient-to-r from-orange to-orange-dark w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
          >
            <div v-if="!isWorking">Update Address</div>
            <Icon v-else name="eos-icons:loading" size="25" class="mr-2" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
