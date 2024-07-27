<template>
  <div
    class="digits"
    :style="{ 'justify-content': digits.position === 'end' ? 'flex-end' : 'flex-start' }"
  >
    <Digit
      v-for="n in digits.digitCount"
      :key="`digit-${n}`"
      :digit-width="digits.digitWidth"
      :digit="getDigit[n - 1]"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

import Digit from '@/components/CalculatorDigit.vue'

const props = defineProps(['digits', 'entry'])

const getDigit = computed(() => {
  const countDigit = props.digits.digitCount
  const digitList = new Array(countDigit).fill(null).map(() => ({
    key: 'empty',
    point: false
  }))
  const entryLength = props.entry.length
  let entryCopy = props.entry
  let digitWithComa = -1

  if (props.entry.includes(',')) {
    const indexComa = props.entry.indexOf(',')
    entryCopy = entryCopy.replace(/,/g, '')
    digitWithComa = countDigit - entryLength + indexComa
  }

  const entryCopyLength = entryCopy.length
  for (let i = 0; i < entryCopyLength; i++) {
    const index = countDigit - entryCopyLength + i
    digitList[index].key = entryCopy[i]
    if (digitWithComa === index) digitList[index].point = true
  }
  return digitList
})
</script>

<style scoped lang="scss">
.digits {
  display: flex;
  justify-content: flex-start;
}
</style>
