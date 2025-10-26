<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Task list</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Task list</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button @click="openModal">Add Task</ion-button>
      <cria-tarefa
        :is-open="isModalOpen"
        title="Create New Task"
        @on-confirm="handleConfirm"
        @on-dismiss="closeModal"
      ></cria-tarefa>

      <task-list :tasks="tasks"></task-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton
} from '@ionic/vue';
import CriaTarefa from '@/components/CriaTarefa.vue';
import TaskList from '@/components/TaskList.vue';
import TaskService from '@/services/TaskService';
</script>

<script lang="ts">
export default {
  data() {
    return {
      isModalOpen: false,
      tasks: [],
    };
  },

  created() {
    this.tasks = TaskService.getAll();
  },

  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleConfirm(taskName: string) {
      console.log('New task added:', taskName);
      this.closeModal();
      this.tasks = TaskService.getAll();
    },
  },
};
</script>
