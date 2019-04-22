<template>
  <span>
    <ion-item v-if="position === 'right'">
      <span>{{ text }}</span>
      <ion-icon class="icon-right" :name="icon" />
    </ion-item>
    <ion-item v-else>
      <ion-icon class="icon-left" :name="icon" />
      <span>{{ text }}</span>
    </ion-item>
  </span>
</template>

<style lang="scss" scoped>
ion-item {
  ion-icon, span {
    display: inline-block;
    vertical-align: middle;
  }

  ion-icon {
    &.icon-left { padding-right: 4px; }
    &.icon-right { padding-left: 4px; }
  }
}
</style>

<script>
export default {
  name: 'IconText',
  props: {
    icon: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: 'left',
    },
  },
};
</script>
