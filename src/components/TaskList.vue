<template>
  <ion-grid>
    <ion-row>
      <ion-col size="12" size-md="6" size-lg="4" v-for="task in tasks" :key="task.id">
        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ task.title }}</ion-card-title>
            <ion-card-subtitle>{{ task.category }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-label>{{ task.priority }}</ion-label>
            <ion-item lines="none">
              <ion-checkbox slot="start" :checked="task.completed" @click="persist(task.id)"></ion-checkbox>
              <ion-buttons slot="end">
                <ion-button>
                  <ion-icon slot="icon-only" :icon="pencilOutline"></ion-icon>
                </ion-button>
                <ion-button @click="deleteItem(task.id)">
                  <ion-icon slot="icon-only" :icon="trashOutline" ></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-item>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle,
  IonCheckbox,
  IonCardTitle,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton
} from '@ionic/vue';

import {
  trashOutline,
  pencilOutline,
} from 'ionicons/icons';


import TaskService from '../services/TaskService';

export default {
  name: 'task-list',
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCheckbox,
    IonCardTitle,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonButtons,
    IonButton
  },
  setup() {
    return { 
      trashOutline,
      pencilOutline,
    };
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleItem(taskId) {
      this.$emit('on-toggle', taskId);
    },
    deleteItem(taskId) {
      this.$emit('on-delete', taskId);
    },
  },
};
</script>
<style scoped>
ion-item {
  --background: transparent;
}
</style>