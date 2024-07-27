<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 240 420"
    class="digit"
    :style="{ width: digitWidth ? `${digitWidth}px` : '12px' }"
  >
    <circle class="digit__bar" :class="{ active: digit.point }" cx="220" cy="400" r="20" />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('top') }"
      d="m 45, 0 -20,20 20,20 H 155 l 20,-20 -20,-20 Z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('middle') }"
      d="m 45,175 -20,20 20,20 H 155 l 20,-20 -20,-20 z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('bottom') }"
      d="m 45, 350 -20,20 20,20 H 155 l 20,-20 -20,-20 z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('top-right') }"
      d="m 160,170 20,20 20,-20 v -125 l -20,-20 -20,20 Z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('bottom-right') }"
      d="m 160,345 20,20 20,-20 v -125 l -20,-20 -20,20 Z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('top-left') }"
      d="m 0,170 20,20 20,-20 v -125 l -20,-20 -20,20 Z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('bottom-left') }"
      d="m 0,345 20,20 20,-20 v -125 l -20,-20 -20,20 Z"
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
  transform: skewX(-6deg);

  &__bar {
    fill: hsla(160, 67%, 24%, 0.12);

    &.active {
      fill: hsla(160, 20%, 30%);
    }
  }
}
</style>
