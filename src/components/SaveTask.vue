<template>
  <ion-modal :is-open="isOpen" @willDismiss="onWillDismiss">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="cancel()">Cancel</ion-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-input
          label="Task title"
          label-placement="stacked"
          v-model="taskTitle"
          type="text"
          placeholder="Your task"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-select
          label="Category" 
          placeholder="Select the category of the task"
          v-model="taskCategory"
        >
          <ion-select-option value="work">Trabalho</ion-select-option>
          <ion-select-option value="study">Estudo</ion-select-option>
          <ion-select-option value="personal">Pessoal</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-select
          label="Priority" 
          placeholder="Select the priority of the task"
          v-model="taskPriority"
        >
          <ion-select-option value="low">Baixa</ion-select-option>
          <ion-select-option value="medium">Média</ion-select-option>
          <ion-select-option value="high">Alta</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-checkbox v-model="taskCompleted">Is completed</ion-checkbox>
      </ion-item>
    </ion-content>
  </ion-modal>
</template>

<script>
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
} from '@ionic/vue';

import TaskService from '../services/TaskService';

export default {
  name: 'save-task',
  components: {
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    task: {
      type: Object,
      default: null,
    },
  },
  emits: ['on-dismiss', 'on-confirm'],
  data() {
    return {
      taskTitle: '',
      taskCategory: '',
      taskPriority: '',
      taskCompleted: false,
    };
  },
  watch: {
    isOpen(newId) {
      if (newId) {
        if (this.task) {
          this.taskTitle = this.task.title;
          this.taskCategory = this.task.category;
          this.taskPriority = this.task.priority;
          this.taskCompleted = this.task.completed;
        } else {
          this.resetForm();
        }
      }
    },
  },
  methods: {
    onWillDismiss() {
      this.$emit('on-dismiss');
    },
    cancel() {
      this.$emit('on-dismiss');
    },
    confirm() {
      const taskData = {
        id: this.task ? this.task.id : Math.floor(Math.random() * 1000000),
        title: this.taskTitle,
        category: this.taskCategory,
        priority: this.taskPriority,
        completed: this.taskCompleted,
      };

      TaskService.save({taskData});
      this.resetForm();
      this.$emit('on-confirm');
    },
    resetForm() {
      this.taskTitle = '';
      this.taskCategory = '';
      this.taskPriority = '';
      this.taskCompleted = false;
    },
  },
};
</script>
