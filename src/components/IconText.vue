<template>
  <span>
    <ion-item v-if="position === 'right'">
      <span>{{ text }}</span>
      <ion-icon v-bind:style="getStyle()" :name="icon" />
    </ion-item>
    <ion-item v-else>
      <ion-icon v-bind:style="getStyle()" :name="icon" />
      <span>{{ text }}</span>
    </ion-item>
  </span>
</template>

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
    padding: {
      type: String,
      default: '4px',
    },
  },
  methods: {
    getStyle() {
      const style = {};
      style[this.position === 'left' ? 'padding-right' : 'padding-left'] = this.padding;
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
ion-item {
  ion-icon, span {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
