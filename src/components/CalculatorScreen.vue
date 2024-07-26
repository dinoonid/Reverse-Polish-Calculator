<template>
  <div class="calc__screen">
    <div class="calc__screen__dots">
      <div
        v-for="n in 33"
        :key="`dot-${n}`"
        class="calc__screen__dot"
        :class="{ active: n < entryList.length }"
      ></div>
    </div>
    <div class="calc__screen__secondary" id="secondary-field">
      {{ nextEntry }}
    </div>
    <div class="calc__screen__primary" id="primary-field" :class="{ error: hasEntryError }">
      {{ entry }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['entry', 'entryList', 'hasEntryError'])

const nextEntry = computed(() => {
  const entryListLength = props.entryList.length
  if (entryListLength > 0) return props.entryList[0]
  else return '0'
})
</script>

<style scoped lang="scss">
.calc__screen {
  position: relative;
  color: hsla(160, 30%, 30%);
  font-size: 18px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 1px;
  background: linear-gradient(210deg, hsl(160, 23%, 90%), hsl(160, 23%, 68%));
  border: 1px solid hsla(160, 67%, 24%, 0.3);
  box-shadow: -4px 4px 8px inset rgba(0, 0, 0, 0.3);
  padding: 8px 28px 12px 28px;

  &__dots {
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
  }

  &__dot {
    background-color: hsla(160, 67%, 24%, 0.2);
    width: 6px;
    height: 6px;
    border-radius: 6px;

    &.active {
      position: relative;
      background-color: hsla(160, 30%, 30%);
    }
  }

  &__primary {
    position: relative;
    font-size: 42px;
    font-family: 'Fragment Mono', monospace;
    line-height: 42px;
    text-align: right;

    &.error {
      color: hsl(0, 80%, 50%, 0.7);
    }
  }

  &__secondary {
    font-size: 24px;
    font-family: 'Fragment Mono', monospace;
    line-height: 24px;
    text-align: left;
    margin-bottom: 16px;
  }
}
</style>
