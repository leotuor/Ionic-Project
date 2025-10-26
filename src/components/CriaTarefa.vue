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
          label="Task name"
          label-placement="stacked"
          v-model="taskName"
          type="text"
          placeholder="Your task"
        ></ion-input>
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
} from '@ionic/vue';

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
    }
  },
  emits: ['on-dismiss', 'on-confirm'],
  data() {
    return {
      taskName: '',
    };
  },
  methods: {
    onWillDismiss() {
      this.$emit('on-dismiss');
    },
    cancel() {
      this.$emit('on-dismiss');
    },
    confirm() {
      this.$emit('on-confirm', this.taskName);
      this.taskName = '';
    },
  },
};
</script>