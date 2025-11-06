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

      <task-filter @on-filter="handleFilter"></task-filter>

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
import TaskFilter from '@/components/TaskFilter.vue';
</script>

<script lang="ts">
export default {
  data() {
    return {
      isModalOpen: false,
      tasks: [],
      allTasks: [],
    };
  },

  created() {
    const tasks = TaskService.getAll();
    this.tasks = tasks;
    this.allTasks = tasks;
  },

  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handlePersist() {
      const tasks = TaskService.getAll();
      this.tasks = tasks;
      this.allTasks = tasks;
      this.closeModal();
    },
    handleToggle(taskId: number) {
      TaskService.toggleCompletion(taskId);
      const tasks = TaskService.getAll();
      this.tasks = tasks;
      this.allTasks = tasks;
    },
    handleDelete(taskId: number) {
      TaskService.remove(taskId);
      const tasks = TaskService.getAll();
      this.tasks = tasks;
      this.allTasks = tasks;
    },
    handleFilter(filters: { searchTerm: string; category: string; priority: string }) {
      let filteredTasks = this.allTasks;

      if (filters.searchTerm) {
        filteredTasks = filteredTasks.filter((task: Task) =>
          task.title && task.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }

      if (filters.category) {
        filteredTasks = filteredTasks.filter(
          (task: Task) => task.category === filters.category
        );
      }

      if (filters.priority) {
        filteredTasks = filteredTasks.filter(
          (task: Task) => task.priority === filters.priority
        );
      }

      this.tasks = filteredTasks;
    },
  },
};
</script>
