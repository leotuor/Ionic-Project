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

      <ion-button @click="openModal" class='ion-margin' expand="block">Add task</ion-button>

      <save-task
        :is-open="isModalOpen"
        title="Create new task"
        @on-confirm="handlePersist"
        @on-dismiss="closeModal"
      ></save-task>

      <task-list 
        :tasks="tasks"
        @on-toggle="handleToggle"
        @on-delete="handleDelete"
        @on-edit="handlePersist"
      ></task-list>
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
import SaveTask from '@/components/SaveTask.vue';
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
    handlePersist() {
      this.tasks = TaskService.getAll();
      this.closeModal();
    },
    handleToggle(taskId: number) {
      TaskService.toggleCompletion(taskId);
      this.tasks = TaskService.getAll();
    },
    handleDelete(taskId: number) {
      TaskService.remove(taskId);
      this.tasks = TaskService.getAll();
    },
  },
};
</script>
