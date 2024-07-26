<template>
  <div class="calc">
    <div class="calc__wrapper">
      <div class="calc__wrapper__screen">
        <div class="calc__container__screen">
          <Screen :entry="entry" :entry-list="entryList" :has-entry-error="hasEntryError" />
        </div>
      </div>
      <div class="calc__wrapper__keyboard">
        <div class="calc__container__keyboard">
          <img alt="screw" class="calc__container__screw" :src="screw" />
          <img alt="screw" class="calc__container__screw" :src="screw" />
          <img alt="screw" class="calc__container__screw" :src="screw" />
          <img alt="screw" class="calc__container__screw" :src="screw" />

          <Keyboard @button-clicked="handleButtonClick" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import screw from '@/assets/images/screw.svg'
import Screen from '@/components/CalculatorScreen.vue'
import Keyboard from '@/components/CalculatorKeyboard.vue'

let entry = ref('0')
let entryList = ref([])
let concatMode = ref(false)
let operationInProgress = ref(false)
let hasEntryError = ref(false)

const operations = {
  ac: () => resetAll(),
  c: () => reset(),
  enter: () => processEnterClick(),
  add: () => process('add'),
  subtract: () => process('subtract'),
  multiply: () => process('multiply'),
  divide: () => process('divide'),
  percent: () => process('percent'),
  xy: () => process('power'),
  swap: () => processSwap(),
  plusminus: () => togglePositiveNegative(),
  coma: () => processComaClick()
}

const handleButtonClick = (key) => {
  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) processDigitClick(key)
  else operations[key]()
}

const processDigitClick = (digit) => {
  if (handleEntryError()) {
    entry.value = digit
    return
  }
  if (digit === '0' && entry.value === '0') return
  if (concatMode.value) {
    if (isEntryUnderLimit()) entry.value = entry.value += digit
  } else {
    if (operationInProgress.value) handleEntryList('add')
    entry.value = digit
    concatMode.value = true
  }
  operationInProgress.value = false
}

const processComaClick = () => {
  if (handleEntryError()) return
  if (entry.value.includes(',')) return
  if (isEntryUnderLimit()) {
    if (operationInProgress.value) {
      handleEntryList('add')
      entry.value = '0'
      concatMode.value = false
    } else {
      entry.value += ','
      concatMode.value = true
    }
  }
  operationInProgress.value = false
}

const isEntryUnderLimit = () => {
  let entryCopy = entry.value
  entryCopy = entryCopy.replace(/[,-]/g, '')
  return entryCopy.length < 12
}

const processEnterClick = () => {
  if (handleEntryError()) return
  concatMode.value = false
  handleEntryList('add')
}

const handleEntryList = (process) => {
  if (entry.value.endsWith(',')) entry.value = entry.value.slice(0, -1)
  entry.value = cleanNumberString(entry.value)
  if (process === 'add') entryList.value.unshift(entry.value)
  if (process === 'replace') entryList.value[0] = entry.value
}

const resetAll = () => {
  entry.value = '0'
  entryList.value = []
  concatMode.value = false
  hasEntryError.value = false
  operationInProgress.value = false
}

const reset = () => {
  entry.value = '0'
  concatMode.value = false
  hasEntryError.value = false
  operationInProgress.value = false
}

const handleEntryError = () => {
  if (hasEntryError.value) {
    reset()
    return true
  }
  return false
}

const processSwap = () => {
  if (handleEntryError()) return
  if (entryList.value.length > 0) {
    const tempFirstEntryListElement = entryList.value[0]
    handleEntryList('replace')
    entry.value = tempFirstEntryListElement
  }
}

const togglePositiveNegative = () => {
  if (handleEntryError()) return
  if (entry.value === '0' || entry.value === '0,') return
  if (entry.value[0] === '-') entry.value = entry.value.slice(1)
  else entry.value = `-${entry.value}`
}

const process = (type) => {
  if (handleEntryError()) return
  if (entryList.value.length > 0) {
    entry.value = formatResult(safeProcess(entry.value, entryList.value[0], type))
    shiftEntryList()
    operationInProgress.value = true
    concatMode.value = false
  }
}

const safeProcess = (operand1, operand2, type) => {
  const value1 = parseNumber(operand1)
  const value2 = parseNumber(operand2)
  const processList = {
    add: value1 + value2,
    multiply: value1 * value2,
    subtract: value2 - value1,
    divide: (value2 * 1000000000000) / (value1 * 1000000000000),
    percent: (value1 * value2) / 100,
    power: Math.pow(value2, value1)
  }
  return processList[type]
}

const shiftEntryList = () => {
  entryList.value.shift()
}

const cleanNumberString = (numStr) => {
  return String(parseNumber(numStr)).replace('.', ',')
}

const parseNumber = (value) => {
  return parseFloat(value.replace(',', '.'))
}

const formatResult = (value) => {
  if (value === Infinity || value === -Infinity || Number.isNaN(value)) {
    hasEntryError.value = true
    return Number.isNaN(value) ? 'NaN' : '∞'
  }
  const isInteger = Number.isInteger(value)
  const isNegative = value < 0
  let factor = Math.pow(10, 15)
  let copyValue = String(Math.round(value * factor) / factor)
  const cleanStr = copyValue.replace(/[^0-9]/g, '')
  if (cleanStr.length <= 12) return cleanNumberString(copyValue)
  if (!isInteger) return cleanNumberString(copyValue.slice(0, isNegative ? 14 : 13))
  hasEntryError.value = true
  return `${copyValue.slice(0, isNegative ? 12 : 11)}+`
}
</script>

<style scoped lang="scss">
.calc {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  width: 100vw;
  height: 100vh;

  &__wrapper {
    box-shadow: -12px 16px 20px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    border: 1px solid #959da566;
    overflow: hidden;

    &__screen {
      background: linear-gradient(210deg, hsl(0, 0%, 60%), hsl(0, 0%, 0%));
      padding: 16px 16px 0 16px;
    }

    &__keyboard {
      background: linear-gradient(225deg, #ffffff, hsl(212, 12%, 85%));
      padding: 0 16px 16px 16px;
    }
  }

  &__container {
    &__screen {
      position: relative;
      background-color: hsl(0, 0%, 30%);
      border-radius: 16px 16px 0 0;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-bottom: none;
      overflow: hidden;
      padding: 16px 16px 32px 16px;
    }

    &__keyboard {
      position: relative;
      background-color: #ffffff;
      border-radius: 0 0 16px 16px;
      border: 1px solid hsl(212, 12%, 80%);
      border-top: none;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(225deg, #ffffff, hsl(212, 12%, 94%));
      }
    }

    &__screw {
      position: absolute;
      width: 12px;
      height: 12px;

      &:nth-child(1) {
        bottom: 10px;
        right: 10px;
        transform: rotate(-45deg);
      }

      &:nth-child(2) {
        bottom: 10px;
        left: 10px;
        transform: rotate(45deg);
      }

      &:nth-child(3) {
        bottom: 419px;
        left: 10px;
        transform: rotate(-45deg);
      }

      &:nth-child(4) {
        bottom: 419px;
        right: 10px;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
