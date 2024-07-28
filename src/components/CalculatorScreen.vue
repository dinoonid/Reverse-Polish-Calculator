<template>
  <div class="screen">
    <div class="screen__dots">
      <div
        v-for="n in 33"
        :key="`dot-${n}`"
        class="screen__dot"
        :class="{ active: n < entryList.length }"
      ></div>
    </div>
    <div class="screen__secondary__container">
      <Digits :digits="digitsSecondary" :entry="nextEntry" />
    </div>
    <div class="screen__primary__container" :class="{ error: hasEntryError }">
      <Digits :digits="digitsPrimary" :entry="entry" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Digits from '@/components/CalculatorDigits.vue'

const props = defineProps(['entry', 'entryList', 'hasEntryError'])

const digitsPrimary = {
  digitWidth: 30,
  digitCount: 13
}

const digitsSecondary = {
  digitWidth: 20,
  digitCount: 13
}

const nextEntry = computed(() => {
  const entryListLength = props.entryList.length
  if (entryListLength > 0) return props.entryList[0]
  else return ''
})
</script>

<style scoped lang="scss">
.screen {
  position: relative;
  color: hsla(160, 20%, 30%);
  font-size: 18px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 1px;
  background: linear-gradient(210deg, hsl(160, 23%, 90%), hsl(160, 23%, 68%));
  border: 1px solid hsla(160, 67%, 24%, 0.3);
  box-shadow: -4px 4px 8px inset rgba(0, 0, 0, 0.3);
  padding: 8px 28px 16px 28px;

  &__digital {
    width: 68px;
    height: auto;
  }

  &__dots {
    display: flex;
    flex-direction: row-reverse;
    gap: 6px;
    border-bottom: 1px solid hsla(160, 67%, 24%, 0.16);
    padding-bottom: 4px;
    margin-bottom: 12px;
  }

  &__dot {
    background-color: hsla(160, 67%, 24%, 0.1);
    width: 6px;
    height: 6px;
    border-radius: 6px;

    &.active {
      position: relative;
      background-color: hsla(160, 26%, 10%, 0.7);
    }
  }

  &__primary__container {
    border-top: 1px solid hsla(160, 67%, 24%, 0.16);
    padding-top: 12px;

    &.error .digits ::v-deep(.digit) .digit__bar.active {
      fill: hsl(0, 80%, 50%, 0.7) !important;
    }
  }

  &__secondary__container {
    margin-bottom: 8px;
  }
}
</style>
