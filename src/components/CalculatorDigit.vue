<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 270 420"
    class="digit"
    :style="{ width: digitWidth ? `${digitWidth}px` : '12px' }"
  >
    <circle class="digit__bar" :class="{ active: digit.point }" cx="250" cy="400" r="20" />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('bottom') }"
      d="m 63.716164,347.76491 -16.04806,16.11742 16.04806,16.11741 H 186.2837 l 16.11736,-16.11736 -16.11736,-16.11736 z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('top') }"
      d="m 63.716164,29.999891 -16.04806,16.117411 16.04806,16.11741 H 186.2837 L 202.40106,46.117352 186.2837,29.999998 Z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('top-left') }"
      d="m 29.442903,186.8411 16.11742,16.04806 16.11741,-16.04806 V 64.273557 l -16.11736,-16.11736 -16.11735,16.11736 z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('top-right') }"
      d="m 188.32242,186.8411 16.11742,16.04806 16.11741,-16.04806 V 64.273557 l -16.11736,-16.11736 -16.11735,16.11736 z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('bottom-right') }"
      d="m 188.32242,345.72645 16.11742,16.04806 16.11741,-16.04806 V 223.1589 l -16.11736,-16.11736 -16.11735,16.11736 z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('bottom-left') }"
      d="m 29.44463,345.72661 16.11742,16.04806 16.11741,-16.04806 V 223.15906 L 45.5621,207.0417 29.44475,223.15906 Z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('middle') }"
      d="m 63.716322,188.87969 -16.04806,16.11741 16.04806,16.11741 H 186.28386 l 16.11736,-16.11736 -16.11736,-16.11735 z"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['digitWidth', 'digit'])

const digitPlan = {
  0: ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'],
  1: ['top-right', 'bottom-right'],
  2: ['top', 'top-right', 'middle', 'bottom', 'bottom-left'],
  3: ['top', 'top-right', 'middle', 'bottom', 'bottom-right'],
  4: ['top-left', 'top-right', 'middle', 'bottom-right'],
  5: ['top', 'top-left', 'middle', 'bottom', 'bottom-right'],
  6: ['top', 'top-left', 'middle', 'bottom', 'bottom-left', 'bottom-right'],
  7: ['top', 'top-left', 'top-right', 'bottom-right'],
  8: ['top', 'top-left', 'top-right', 'middle', 'bottom', 'bottom-left', 'bottom-right'],
  9: ['top', 'top-left', 'top-right', 'middle', 'bottom', 'bottom-right'],
  '-': ['middle'],
  empty: [],
  error: ['middle', 'bottom', 'bottom-left', 'bottom-right']
}

const isKeyAcitive = computed(() => {
  return digitPlan[props.digit.key] ? digitPlan[props.digit.key] : digitPlan['error']
})
</script>

<style scoped lang="scss">
.digit {
  width: 25px;
  height: auto;

  &__bar {
    fill: hsla(160, 67%, 24%, 0.12);

    &.active {
      fill: hsla(160, 20%, 30%);
    }
  }
}
</style>
