<template>
  <div v-for="task in tasks">
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ task.title }}</ion-card-title>
        <ion-card-subtitle>{{ task.category }}</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <p>{{ task.priority }}</p>
        <ion-checkbox :checked="task.completed" @click="persist(task.id)"></ion-checkbox>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script>
import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle,
  IonCheckbox,
  IonCardTitle
} from '@ionic/vue';

import TaskService from '../services/TaskService';

export default {
  name: 'task-list',
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCheckbox,
    IonCardTitle
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    persist(taskId) {
      TaskService.toggleCompletion(taskId);
    },
  },
};
</script>
