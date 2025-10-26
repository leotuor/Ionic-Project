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
  name: 'cria-tarefa',
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
  },
  emits: ['on-dismiss', 'on-confirm'],
  methods: {
    onWillDismiss() {
      this.$emit('on-dismiss');
    },
    cancel() {
      this.$emit('on-dismiss');
    },
    confirm() {
      this.$emit('on-confirm');

      TaskService.save({
        id: Math.floor(Math.random() * 1000000),
        title: this.taskTitle,
        category: this.taskCategory,
        priority: this.taskPriority,
        completed: this.taskCompleted,
      });

      this.taskTitle = '';
      this.taskPriority = '';
      this.taskCompleted = '';
      this.taskCategory = '';
    },
  },
};
</script>
