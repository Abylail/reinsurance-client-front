<template>
  <div class="base-photo-input">

    <div class="base-photo-input__list" :class="{disabled: isLoading}">
      <div class="base-photo-input__item" :style="{height: imageSize, width: imageSize}" v-for="(imageBuffer, index) in selfValue" :key="imageBuffer">
        <img class="base-photo-input__image" :src="imageBuffer"/>
<!--        <div class="base-photo-input__edit" @click.prevent="triggerInput()"><base-icon name="mdi-pencil"/></div>-->
        <div class="base-photo-input__remove" @click.stop="removeHandle(index)"><base-icon name="mdi-close"/></div>
      </div>
      <div class="base-photo-input__add" :style="{height: imageSize, width: imageSize}" v-if="showPlus" @click.prevent="triggerInput()">
        <base-icon name="mdi-plus" size="36"/>
      </div>
    </div>

    <input ref="inputElement" type="file" :accept="acceptFiles" v-show="false" @change="inputHandle($event?.target?.files[0])"/>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {fileToBase64, resizeImage} from "../../helpers/file";
import BaseIcon from "./BaseIcon";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: null
  },
  multiple: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: "default",
    validator: val => ["default", "small"].includes(val)
  },
  maxWidth: {
    type: Number,
    default: 1200
  },
  maxCount: {
    type: Number,
    default: 5
  }
});

const acceptFiles = "image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/x-icon, image/svg+xml, image/webp, image/xxx";

const selfLoading = ref(false);
const inputElement = ref(null);

const selfValue = computed(() => {
  if (!props.multiple && props.modelValue) return [props.modelValue];
  return props.modelValue || [];
})

const isLoading = computed(() => props.loading || selfLoading.value);

const showPlus = computed(() => {
  if (props.multiple) return !props.modelValue?.length || props.modelValue.length < props.maxCount;
  return !props.modelValue;
})

const imageSize = computed(() => {
  if (props.size === "small") return "50px";
  return "6rem"
})

const inputHandle = async (file) => {
  if (!file) return;
  selfLoading.value = true;
  const base64File = await fileToBase64(file);
  if (!base64File) {
    selfLoading.value = false;
    return alert("Поврежденный файл");
  }
  const optimizedImage = await resizeImage(base64File, props.maxWidth);
  selfLoading.value = false;

  inputElement.value.value = "";
  if (!optimizedImage) return alert("Извините, не могу принять ваш файл :(")
  emit("update:modelValue", [...(props.modelValue || []), optimizedImage]);
}

const getImageUrl = (url) => {
  return process.env.CDN_URL + url;
}

// Вызвать инпут
const triggerInput = () => {
  inputElement.value?.click();
};

// Удалить
const removeHandle = (imageIndex) => {
  if (props.multiple) {
    let newVal = [...props.modelValue];
    newVal.splice(imageIndex, 1);
    console.log(imageIndex, props.modelValue, newVal);
    emit("update:modelValue", newVal);
  }
  else {
    emit("update:modelValue", null);
  }
};
</script>

<style lang="scss" scoped>
.base-photo-input {
  margin: .5rem 0;

  &__list {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  &__edit {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.7);
    border-top-left-radius: 5px;
    cursor: pointer;
    transition: .15s;

    &:hover {
      background-color: white;
    }
  }

  &__remove {
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.7);
    border-bottom-left-radius: 5px;
    cursor: pointer;
    transition: .15s;

    &:hover {
      background-color: white;
    }
  }

  &__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  &__add {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 0;
    border: .2rem solid #1976d2;
    border-radius: 5px;
    cursor: pointer;
    transition: .15s;
    color: $color--blue;
    background-color: rgba(25, 118, 210, 0.2);

    &:hover {
      background-color: rgba(25, 118, 210, 0.4);
    }
  }

}
</style>
