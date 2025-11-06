<template>
  <ion-list>
    <ion-item>
      <ion-searchbar
        :debounce="500"
        placeholder="Search by title"
        v-model="filters.searchTerm"
        @ionInput="handleSearchInput"
      ></ion-searchbar>
    </ion-item>
    <ion-row>
      <ion-col>
        <ion-item>
          <ion-select
            label="Category"
            placeholder="All"
            v-model="filters.category"
            @ionChange="emitFilterChange"
          >
            <ion-select-option value="">All</ion-select-option>
            <ion-select-option value="work">Work</ion-select-option>
            <ion-select-option value="study">Study</ion-select-option>
            <ion-select-option value="personal">Personal</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-item>
          <ion-select
            label="Priority"
            placeholder="All"
            v-model="filters.priority"
            @ionChange="emitFilterChange"
          >
            <ion-select-option value="">All</ion-select-option>
            <ion-select-option value="low">Low</ion-select-option>
            <ion-select-option value="medium">Medium</ion-select-option>
            <ion-select-option value="high">High</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-col>
    </ion-row>
  </ion-list>
</template>

<script lang="ts">
import {
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonList,
  IonRow,
  IonCol,
} from '@ionic/vue';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'TaskFilter',
  components: {
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonList,
    IonRow,
    IonCol,
  },
  emits: ['on-filter'],
  setup(_, { emit }) {
    const filters = reactive({
      searchTerm: '',
      category: '',
      priority: '',
    });

    const emitFilterChange = () => {
      emit('on-filter', { ...filters });
    };

    const handleSearchInput = (event: CustomEvent) => {
      filters.searchTerm = event.detail.value || '';
      emitFilterChange();
    };

    return {
      filters,
      emitFilterChange,
      handleSearchInput,
    };
  },
});
</script>