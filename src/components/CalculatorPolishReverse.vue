<template>
  <div class="calc">
    <div class="calc__wrapper">
      <div class="calc__wrapper__screen">
        <div class="calc__container__screen">
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
        </div>
      </div>
      <div class="calc__wrapper__keyboard">
        <div class="calc__container__keyboard">
          <img alt="screw" class="calc__keyboard__screw" :src="screw" />
          <img alt="screw" class="calc__keyboard__screw" :src="screw" />
          <img alt="screw" class="calc__keyboard__screw" :src="screw" />
          <img alt="screw" class="calc__keyboard__screw" :src="screw" />
          <!-- <p>entryList = {{ entryList }}</p> -->
          <div class="calc__keyboard">
            <div class="calc__keyboard__line">
              <div class="calc__keyboard__row clear" title="Clear all" @click="resetAll">AC</div>
              <div class="calc__keyboard__row enter" title="Add number" @click="processEnterClick">
                <img alt="return" class="icon" :src="arrowReturn" />
                <img alt="return" class="icon" :src="arrowReturn" />
                <div class="text">enter</div>
              </div>
              <div class="calc__keyboard__row clear" title="Clear number" @click="reset">C</div>
            </div>
            <div class="calc__keyboard__line">
              <div class="calc__keyboard__row swap" title="Swap" @click="processSwap">
                <img alt="swap" class="icon" :src="swap" />
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
              <div class="calc__keyboard__row operator" title="Divide" @click="process('divide')">
                <img alt="division" class="icon" :src="division" />
              </div>
            </div>
            <div class="calc__keyboard__line">
              <div class="calc__keyboard__row option" title="Percent" @click="process('percent')">
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
              <div
                class="calc__keyboard__row operator"
                title="Multiply"
                @click="process('multiply')"
              >
                <img alt="multiplication" class="icon" :src="multiplication" />
              </div>
            </div>
            <div class="calc__keyboard__line">
              <div class="calc__keyboard__row power" title="Power" @click="process('power')">
                <img alt="xy" class="icon" :src="xy" />
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
              <div
                class="calc__keyboard__row operator"
                title="Subtract"
                @click="process('subtract')"
              >
                <img alt="soustraction" class="icon" :src="soustraction" />
              </div>
            </div>
            <div class="calc__keyboard__line">
              <div
                class="calc__keyboard__row digit plusminus"
                title="Negative number"
                @click="togglePositiveNegative"
              >
                <img alt="addition" class="icon" :src="plusminus" />
              </div>
              <div class="calc__keyboard__row zero" id="key-0" @click="processDigitClick('0')">
                0
              </div>
              <div class="calc__keyboard__row digit" @click="processComaClick">,</div>
              <div class="calc__keyboard__row operator" title="Add" @click="process('add')">
                <img alt="addition" class="icon" :src="addition" />
              </div>
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
import swap from '@/assets/images/swap.svg'
import percent from '@/assets/images/percent.svg'
import xy from '@/assets/images/xy.svg'
import arrowReturn from '@/assets/images/return.svg'
import screw from '@/assets/images/screw.svg'

let entry = ref('0')
let entryList = ref([])
let concatMode = ref(false)
let operationInProgress = ref(false)
let hasEntryError = ref(false)

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

const nextEntry = computed(() => {
  const entryListLength = entryList.value.length
  if (entryListLength > 0) return entryList.value[0]
  else return '0'
})

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
    box-shadow: -12px 12px 24px rgba(0, 0, 0, 0.1);
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
  }

  &__screen {
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

  &__keyboard {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 28px 48px 28px 48px;

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
      box-shadow: -4px 4px 4px 0px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      user-select: none;

      &.clear {
        color: #ffffff;
        font-size: 20px;
        background-color: hsl(0, 80%, 68%);

        &:hover {
          background-color: hsl(0, 80%, 64%);
        }
      }

      &.digit {
        color: #ffffff;
        background-color: hsl(34, 100%, 50%);

        &:hover {
          background-color: hsl(34, 100%, 48%);
        }
      }

      &.operator {
        color: #ffffff;
        background-color: hsl(0, 0%, 40%);

        &:hover {
          background-color: hsl(0, 0%, 32%);
        }

        .icon {
          width: 30px;
          height: 30px;
        }
      }

      &.plusminus {
        background-color: #ffffff;

        &:hover {
          background-color: hsl(212, 50%, 99%);
        }

        .icon {
          width: 38px;
          height: 38px;
        }
      }

      &.option {
        background-color: #ffffff;

        &:hover {
          background-color: hsl(212, 50%, 99%);
        }

        .icon {
          width: 36px;
          height: 36px;
        }
      }

      &.swap {
        background-color: #ffffff;

        &:hover {
          background-color: hsl(212, 50%, 99%);
        }

        .icon {
          width: 32px;
          height: auto;
        }
      }

      &.power {
        background-color: #ffffff;

        &:hover {
          background-color: hsl(212, 50%, 99%);
        }

        .icon {
          width: 24px;
          height: 24px;
        }
      }

      &.zero {
        color: #ffffff;
        background-color: hsl(34, 100%, 50%);
        width: 144px;

        &:hover {
          background-color: hsl(34, 100%, 48%);
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
          width: 32px;
          height: 32px;
          transform: translateY(-50%);

          &:nth-child(1) {
            right: 24px;
          }

          &:nth-child(2) {
            left: 24px;
            transform: scaleX(-1) translateY(-50%);
          }
        }
      }
    }
  }
}
</style>
