<script setup lang="ts">
const userStore = useUserStore();

interface Error {
  type: string;
  message: string;
}

const contactName = ref(null);
const address = ref(null);
const zipCode = ref(null);
const city = ref(null);
const country = ref(null);

const currentAddress = ref(null);
const isUpdate = ref(false);
const isWorking = ref(false);
const error: Ref<Error | null> = ref(null);

const submit = () => {
  alert("submit");
};
</script>

<template>
  <div>
    <div id="address-page" class="mt-4 max-w-[500px] mx-auto px-2">
      <div class="mx-auto bg-white rounded-lg p-3">
        <div class="text-xl text-bold mb-2">Address Details</div>
        <form @submit.prevent="submit()">
          <BaseTextInput
            v-model:input="contactName"
            class="w-full"
            placeholder="Contact Name"
            input-type="text"
            :error="error && error.type == 'contactName' ? error.message : ''"
          />

          <BaseTextInput
            v-model:input="address"
            class="w-full mt-2"
            placeholder="Address"
            input-type="text"
            :error="error && error.type == 'address' ? error.message : ''"
          />

          <BaseTextInput
            v-model:input="zipCode"
            class="w-full mt-2"
            placeholder="Zip Code"
            input-type="text"
            :error="error && error.type == 'zipCode' ? error.message : ''"
          />

          <BaseTextInput
            v-model:input="city"
            class="w-full mt-2"
            placeholder="City"
            input-type="text"
            :error="error && error.type == 'city' ? error.message : ''"
          />

          <BaseTextInput
            v-model:input="country"
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
