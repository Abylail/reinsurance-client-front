<template>
  <div class="children" v-if="!isLoading || children.length">
    <base-go-button
        class="children__child"
        v-for="(child, index) in children" :key="index"
        :title="`${child.name} (${child.age} лет)`"
        icon="mdi-human"
        @click="openEditorHandle(child)"
    />
    <div class="children__empty" v-if="!children.length">Добавьте ребенка что бы вы могли его записать</div>
    <base-button v-if="!children.length" class="children__add" type="naked-blue" full-width @click="openEditorHandle({})">Добавить ребенка +</base-button>
    <base-button v-else class="children__add" type="naked" full-width @click="openEditorHandle({})">Добавить ребенка +</base-button>

    <!-- Редактор -->
    <base-backdrop v-model:active="openEditor" title="Редактирование">
      <children-editor
          class="children__editor"
          v-model="editChildData"
          :loading="isLoading"
          @save="saveHandle()"
          @cancel="cancelHandle()"
          @delete="deleteHandle()"
      />
    </base-backdrop>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import BaseGoButton from "../../base/BaseGoButton";
import BaseBackdrop from "../../base/BaseBackdrop";
import BaseButton from "../../base/BaseButton";
import {useParentChildrenStore} from "../../../store/parent/children";
import ChildrenEditor from "../catalog/childrenEditor";

const isLoading = ref(true);

const parentChildrenStore = useParentChildrenStore();
const fetchChildren = async () => {
  isLoading.value = true;
  await parentChildrenStore.fetchChildren();
  isLoading.value = false;
};

const children = computed(() => parentChildrenStore.getChildren);

const editChildData = ref({});
const openEditor = ref(false);
const openEditorHandle = child => {
  editChildData.value = JSON.parse(JSON.stringify(child));
  openEditor.value = true;
}

const saveHandle = async () => {
  isLoading.value = true;
  if (!editChildData.value?.id) await parentChildrenStore.addChild(editChildData.value);
  else await parentChildrenStore.updateChild(editChildData.value);
  openEditor.value = false;
  isLoading.value = false;
}

const cancelHandle = () => {
  editChildData.value = {};
  openEditor.value = false;
}

const deleteHandle = async () => {
  isLoading.value = true;
  if (editChildData.value?.id) await parentChildrenStore.deleteChild(editChildData.value);
  openEditor.value = false;
  isLoading.value = false;
}

onMounted(() => {
  fetchChildren();
})
</script>

<style lang="scss" scoped>
.children {

  &__child {
    margin: 8px 0;
  }

  &__add {
    margin-top: 8px;
  }

  &__editor {
    padding: 10px $side-space-mobile;
  }

  &__empty {
    color: $color--gray-dark;
  }

}
</style>