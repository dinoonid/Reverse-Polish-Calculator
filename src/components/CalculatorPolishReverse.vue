<template>
  <div class="calc">
    <div class="calc__wrapper">
      <div class="calc__container">
        <p>entryList = {{ entryList }}</p>
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
          <p class="calc__screen__desc">
            CALCULATOR | <span class="calc__screen__info">Polish reverse</span> |
          </p>
        </div>
        <div class="calc__keyboard">
          <div class="calc__keyboard__line">
            <div class="calc__keyboard__row clear" @click="resetAll">AC</div>
            <div class="calc__keyboard__row enter" @click="processEnterClick">
              <img alt="return" class="icon" :src="arrowReturn" />
              <div class="text">enter</div>
            </div>
            <div class="calc__keyboard__row clear" @click="reset">C</div>
          </div>
          <div class="calc__keyboard__line">
            <div class="calc__keyboard__row power disabled">
              <img alt="xy" class="icon" :src="xy" />
            </div>
            <div class="calc__keyboard__row digit" id="key-7" @click="processDigitClick('7')">
              7
            </div>
            <div class="calc__keyboard__row digit" id="key-8" @click="processDigitClick('8')">
              8
            </div>
            <div class="calc__keyboard__row digit" id="key-9" @click="processDigitClick('9')">
              9
            </div>
            <div class="calc__keyboard__row operator disabled" @click="process('divide')">
              <img alt="division" class="icon" :src="division" />
            </div>
          </div>
          <div class="calc__keyboard__line">
            <div class="calc__keyboard__row option disabled">
              <img alt="percent" class="icon" :src="percent" />
            </div>
            <div class="calc__keyboard__row digit" id="key-4" @click="processDigitClick('4')">
              4
            </div>
            <div class="calc__keyboard__row digit" id="key-5" @click="processDigitClick('5')">
              5
            </div>
            <div class="calc__keyboard__row digit" id="key-6" @click="processDigitClick('6')">
              6
            </div>
            <div class="calc__keyboard__row operator" @click="process('multiply')">
              <img alt="multiplication" class="icon" :src="multiplication" />
            </div>
          </div>
          <div class="calc__keyboard__line">
            <div class="calc__keyboard__row factorial disabled">
              <img alt="factorial" class="icon" :src="factorial" />
            </div>
            <div class="calc__keyboard__row digit" id="key-1" @click="processDigitClick('1')">
              1
            </div>
            <div class="calc__keyboard__row digit" id="key-2" @click="processDigitClick('2')">
              2
            </div>
            <div class="calc__keyboard__row digit" id="key-3" @click="processDigitClick('3')">
              3
            </div>
            <div class="calc__keyboard__row operator" @click="process('subtract')">
              <img alt="soustraction" class="icon" :src="soustraction" />
            </div>
          </div>
          <div class="calc__keyboard__line">
            <div class="calc__keyboard__row digit plusminus" @click="togglePositiveNegative">
              <img alt="addition" class="icon" :src="plusminus" />
            </div>
            <div class="calc__keyboard__row zero" id="key-0" @click="processDigitClick('0')">0</div>
            <div class="calc__keyboard__row digit" @click="processComaClick">,</div>
            <div class="calc__keyboard__row operator" @click="process('add')">
              <img alt="addition" class="icon" :src="addition" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import addition from '@/assets/images/addition.svg'
import soustraction from '@/assets/images/soustraction.svg'
import multiplication from '@/assets/images/multiplication.svg'
import division from '@/assets/images/division.svg'
import plusminus from '@/assets/images/plusminus.svg'
import factorial from '@/assets/images/factorial.svg'
import percent from '@/assets/images/percent.svg'
import xy from '@/assets/images/xy.svg'
import arrowReturn from '@/assets/images/return.svg'

let entry = ref('0')
let entryList = ref([])
let concatMode = ref(false)
let operationInProgress = ref(false)
let hasEntryError = ref(false)

const processDigitClick = (digit) => {
  if (hasEntryError.value) {
    reset()
    entry.value = digit
    return
  }

  if (digit === '0' && entry.value === '0') return

  if (concatMode.value) {
    if (isEntryUnderLimit()) {
      entry.value = entry.value += digit
    }
  } else {
    if (operationInProgress.value) addEntryToEntryList()
    entry.value = digit
    concatMode.value = true
  }
  operationInProgress.value = false
}

const processComaClick = () => {
  if (hasEntryError.value) {
    reset()
    return
  }

  if (entry.value.includes(',')) return

  if (isEntryUnderLimit()) {
    if (operationInProgress.value) {
      addEntryToEntryList()
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
  if (hasEntryError.value) {
    reset()
    return
  }
  concatMode.value = false
  addEntryToEntryList()
}

const addEntryToEntryList = () => {
  if (entry.value.endsWith(',')) entry.value = entry.value.slice(0, -1)
  entry.value = cleanNumberString(entry.value)
  entryList.value.unshift(entry.value)
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

const togglePositiveNegative = () => {
  if (hasEntryError.value) {
    reset()
    return
  }
  if (entry.value === '0' || entry.value === '0,') return
  if (entry.value[0] === '-') entry.value = entry.value.slice(1)
  else entry.value = `-${entry.value}`
}

const nextEntry = computed(() => {
  const entryListLength = entryList.value.length
  if (entryListLength > 0) return entryList.value[0]
  else return '0'
})

const process = (type) => {
  if (hasEntryError.value) {
    reset()
    return
  }

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
    divide: value2 / value1
  }
  const result = processList[type]
  return result
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
  const isInteger = Number.isInteger(value)
  const isNegative = value < 0
  let factor = Math.pow(10, 15)
  let copyValue = String(Math.round(value * factor) / factor)
  const cleanStr = copyValue.replace(/[^0-9]/g, '')

  const cleanStrLength = cleanStr.length
  if (isInteger) {
    if (cleanStrLength > 12) {
      copyValue = `${copyValue.slice(0, isNegative ? 12 : 11)}+`
      hasEntryError.value = true
    }
  } else {
    if (cleanStrLength > 12) {
      if (isNegative) {
        const newValue = copyValue.slice(0, 13)
        const cleanNb = cleanNumberString(newValue)
        if (cleanNb.length < 13) copyValue = `${cleanNb}`
        else {
          copyValue = `${cleanNb}+`
          hasEntryError.value = true
        }
      } else {
        const newValue = copyValue.slice(0, 12)
        const cleanNb = cleanNumberString(newValue)
        if (cleanNb.length < 12) copyValue = `${cleanNb}`
        else {
          copyValue = `${cleanNb}+`
          hasEntryError.value = true
        }
      }
    } else {
      copyValue = cleanNumberString(copyValue)
    }
  }
  return copyValue
}
</script>

<style scoped lang="scss">
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
.calc {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  width: 100vw;
  height: 100vh;

  &__wrapper {
    background-color: #ffffff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 24px;
    border: 1px solid rgba(149, 157, 165, 0.4);
    padding: 16px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    border: 1px solid #eeeeee;
    padding: 16px;
  }

  &__screen {
    position: relative;
    color: hsla(160, 30%, 30%);
    font-size: 18px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 1px;
    background-color: hsla(160, 67%, 24%, 0.2);
    border: 1px solid hsla(160, 67%, 24%, 0.2);
    padding: 8px 28px 12px 28px;

    &::before {
      content: '';
      position: absolute;
      top: 50px;
      left: 28px;
      width: calc(100% - 56px);
      height: 1px;
      background-color: hsla(160, 67%, 24%, 0.2);
    }

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
        // box-shadow: 0px 0px 1px 1px hsl(160, 100%, 50%, 0.6);
      }
    }

    &__primary {
      position: relative;
      font-size: 42px;
      font-family: 'Fragment Mono', monospace;
      line-height: 42px;
      text-align: right;
      // text-shadow: 0px 0px 3px hsl(160, 100%, 50%);

      &.error {
        color: hsl(0, 80%, 50%, 0.7);
      }
    }

    &__secondary {
      font-size: 24px;
      font-family: 'Fragment Mono', monospace;
      line-height: 24px;
      text-align: left;
      // text-shadow: 0px 0px 2px hsl(160, 100%, 50%);
      margin-bottom: 16px;
    }

    &__desc {
      position: absolute;
      left: 0;
      bottom: -32px;
      color: #555555;
      font-size: 11px;
      font-weight: 400;
      line-height: 11px;
      user-select: none;
    }

    &__info {
      color: #70b3ff;
      font-size: 11px;
      font-weight: 400;
      font-style: italic;
      line-height: 11px;
      letter-spacing: 1px;
    }
  }

  &__keyboard {
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-top: 1px solid #eeeeee;
    padding: 24px 32px 12px 32px;
    margin-top: 42px;

    &__line {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    &__row {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #bababa;
      font-size: 24px;
      font-weight: normal;
      line-height: 40px;
      text-align: center;
      width: 64px;
      height: 64px;
      border-radius: 64px;
      border: 1px solid rgba(0, 0, 0, 0.14);
      box-shadow: rgba(0, 0, 0, 0.06) 0px 4px 8px 0px;
      cursor: pointer;
      user-select: none;

      &.clear {
        color: #ffffff;
        font-size: 18px;
        background-color: hsl(0, 80%, 68%);

        &:hover {
          background-color: hsl(0, 80%, 64%);
        }
      }

      &.digit {
        color: #ffffff;
        background-color: hsl(34, 100%, 60%);

        &:hover {
          background-color: hsl(34, 100%, 50%);
        }
      }

      &.operator {
        color: #ffffff;
        background-color: hsl(0, 0%, 70%);

        &:hover {
          background-color: hsl(0, 0%, 62%);
        }

        .icon {
          width: 30px;
          height: 30px;
        }
      }

      &.plusminus {
        color: #ffffff;
        background-color: hsl(0, 0%, 70%);

        &:hover {
          background-color: hsl(0, 0%, 62%);
        }

        .icon {
          width: 32px;
          height: 32px;
        }
      }

      &.option {
        color: #ffffff;
        background-color: hsl(0, 0%, 70%);

        &:hover {
          background-color: hsl(0, 0%, 62%);
        }

        .icon {
          width: 30px;
          height: 30px;
        }
      }

      &.factorial {
        color: #ffffff;
        background-color: hsl(0, 0%, 70%);

        &:hover {
          background-color: hsl(0, 0%, 62%);
        }

        .icon {
          width: 26px;
          height: 26px;
        }
      }

      &.power {
        color: #ffffff;
        background-color: hsl(0, 0%, 70%);

        &:hover {
          background-color: hsl(0, 0%, 62%);
        }

        .icon {
          width: 18px;
          height: 18px;
        }
      }

      &.zero {
        color: #ffffff;
        background-color: hsl(34, 100%, 60%);
        width: 144px;

        &:hover {
          background-color: hsl(34, 100%, 50%);
        }
      }

      &.enter {
        position: relative;
        color: #ffffff;
        background-color: hsl(212, 100%, 76%);
        font-size: 24px;
        line-height: 24px;
        letter-spacing: 1px;
        width: 224px;

        &:hover {
          background-color: hsl(212, 100%, 72%);
        }

        .text {
          padding-bottom: 3px;
        }

        .icon {
          position: absolute;
          top: 50%;
          right: 24px;
          width: 32px;
          height: 32px;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
