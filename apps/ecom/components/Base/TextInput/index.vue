<script setup lang="ts">
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const props = defineProps<{
  modelValue: string;
  placeholder: string;
  maxLength?: string;
  inputType: string;
  error: string;
}>();

const { modelValue, placeholder, maxLength, inputType, error } = toRefs(props);
const isFocused = ref(false);

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

const emitValue = (value: string) => emit("update:modelValue", value);
</script>

<template>
  <div>
    <client-only>
      <input
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxLength"
        class="w-full bg-white text-gray-800 border text-sm border-neutral-50 rounded-lg p-3 placeholder-gray-500 focus:outline-none"
        :class="{ 'border-gray-900': isFocused, 'border-red-500': error }"
        :type="inputType"
        autocomplete="off"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="(e) => emitValue((e.target as HTMLInputElement).value)"
      />
    </client-only>
    <span v-if="error" class="text-red-500 text-[14px] font-semibold">
      {{ error }}
    </span>
  </div>
</template>
