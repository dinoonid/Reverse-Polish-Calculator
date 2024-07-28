<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 240 430"
    class="digit"
    :style="{ width: digitWidth ? `${digitWidth}px` : '12px' }"
  >
    <circle class="digit__bar" :class="{ active: digit.point }" cx="220" cy="410" r="20" />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('top') }"
      d="m 35, 0 -10,10 30,30 h 90 l 30,-30 -10,-10 Z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('top-left') }"
      d="m 10,180 10,10 30,-20 v -125 l -30,-30 -10,10 Z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('top-right') }"
      d="m 150,170 30,20 10,-10 v -155 l -10,-10 -30,30 Z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('middle') }"
      d="m 55,175 -30,20 30,20 h 90 l 30,-20 -30,-20 z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('bottom') }"
      d="m 55, 350 -30,30 10,10 h 130 l 10,-10 -30,-30 z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('bottom-left') }"
      d="m 10,365 10,10 30,-30 v -125 l -30,-20 -10,10 Z"
    />
    <path
      class="digit__bar"
      :class="{ active: isKeyAcitive.includes('bottom-right') }"
      d="m 150,345 30,30 10,-10 v -155 l -10,-10 -30,20 Z"
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
  transform: skewX(-4deg);

  &__bar {
    fill: hsla(160, 67%, 24%, 0.1);

    &.active {
      fill: hsla(160, 26%, 10%, 0.7);
    }
  }
}
</style>
