<template>
  <div class="calc">
    <div class="calc__wrapper">
      <div class="calc__container">
        <!-- <p>entryList = {{ entryList }}</p> -->
        <div class="calc__screen">
          <div class="calc__screen__dots">
            <div
              v-for="n in 33"
              :key="`dot-${n}`"
              class="calc__screen__dot"
              :class="{ active: n < entryList.length }"
            ></div>
          </div>
          <div class="calc__screen__secondary">
            {{ nextEntry }}
          </div>
          <div class="calc__screen__primary" id="entry">
            {{ entry }}
          </div>
          <p class="calc__screen__desc">
            CALCULATOR | <span class="calc__screen__info">Polish reverse</span> |
          </p>
        </div>
        <div class="calc__keyboard">
          <div class="calc__keyboard__line">
            <div class="calc__keyboard__row clear" @click="resetAll">AC</div>
            <div class="calc__keyboard__row enter" @click="pushEntry">
              <img alt="return" class="icon" :src="arrowReturn" />
              Enter
            </div>
            <div class="calc__keyboard__row clear" @click="reset">C</div>
          </div>
          <div class="calc__keyboard__line">
            <div class="calc__keyboard__row power">
              <img alt="xy" class="icon" :src="xy" />
            </div>
            <div class="calc__keyboard__row digit" id="key-7" @click="updateEntry('7')">7</div>
            <div class="calc__keyboard__row digit" @click="updateEntry('8')">8</div>
            <div class="calc__keyboard__row digit" @click="updateEntry('9')">9</div>
            <div class="calc__keyboard__row operator" @click="divide">
              <img alt="division" class="icon" :src="division" />
            </div>
          </div>
          <div class="calc__keyboard__line">
            <div class="calc__keyboard__row option">
              <img alt="percent" class="icon" :src="percent" />
            </div>
            <div class="calc__keyboard__row digit" @click="updateEntry('4')">4</div>
            <div class="calc__keyboard__row digit" @click="updateEntry('5')">5</div>
            <div class="calc__keyboard__row digit" @click="updateEntry('6')">6</div>
            <div class="calc__keyboard__row operator" @click="multiply">
              <img alt="multiplication" class="icon" :src="multiplication" />
            </div>
          </div>
          <div class="calc__keyboard__line">
            <div class="calc__keyboard__row factorial">
              <img alt="factorial" class="icon" :src="factorial" />
            </div>
            <div class="calc__keyboard__row digit" @click="updateEntry('1')">1</div>
            <div class="calc__keyboard__row digit" @click="updateEntry('2')">2</div>
            <div class="calc__keyboard__row digit" @click="updateEntry('3')">3</div>
            <div class="calc__keyboard__row operator" @click="subtract">
              <img alt="soustraction" class="icon" :src="soustraction" />
            </div>
          </div>
          <div class="calc__keyboard__line">
            <div class="calc__keyboard__row digit plusminus" @click="togglePositiveNegative">
              <img alt="addition" class="icon" :src="plusminus" />
            </div>
            <div class="calc__keyboard__row zero" @click="updateEntry('0')">0</div>
            <div class="calc__keyboard__row digit" @click="updateEntry(',')">,</div>
            <div class="calc__keyboard__row operator" @click="add">
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
let concatMode = ref(true)

const updateEntry = (value) => {
  // console.log('value == ', value)
  // console.log('AV entry.value == ', entry.value)

  let entryCopy = entry.value
  entryCopy = entryCopy.replace(/[,-]/g, '')

  if (value === ',' && entry.value.includes(',')) return

  if (entry.value === '0' && value !== ',') entry.value = value
  else {
    if (entryCopy.length < 12) {
      if (concatMode.value) {
        entry.value = entry.value += value
      } else {
        if (value === ',') {
          entry.value += value
        } else {
          entry.value = value
        }
        concatMode.value = true
      }
    } else {
      if (!concatMode.value) {
        if (value !== ',') {
          entry.value = value
          concatMode.value = true
        }
      }
    }
  }
}

const pushEntry = () => {
  concatMode.value = false
  if (entry.value.endsWith(',')) entry.value = entry.value.slice(0, -1)
  entry.value = cleanNumberString(entry.value)
  entryList.value.push(entry.value)
}

const cleanNumberString = (numStr) => {
  return String(parseNumber(numStr)).replace('.', ',')
}

const resetAll = () => {
  entry.value = '0'
  entryList.value = []
  concatMode.value = true
}

const reset = () => {
  entry.value = '0'
  concatMode.value = true
}

const togglePositiveNegative = () => {
  if (entry.value === '0' || entry.value === '0,') return
  if (entry.value[0] === '-') entry.value = entry.value.slice(1)
  else entry.value = `-${entry.value}`
}

const nextEntry = computed(() => {
  const entryListLength = entryList.value.length
  if (entryListLength > 0) return entryList.value[entryListLength - 1]
  else return 0
})

const add = () => {
  if (entryList.value.length > 0) {
    entry.value = formatResult(safeAdd(entry.value, entryList.value[0]))
  }
}

const multiply = () => {
  if (entryList.value.length > 0) {
    console.log('multiply')
    entry.value = formatResult(safeMultiply(entry.value, entryList.value[0]))
  }
}

const subtract = () => {
  if (entryList.value.length > 0) {
    console.log('subtract')
    // entry.value = formatResult(safeAdd(entry.value, entryList.value[0]))
  }
}

const divide = () => {
  if (entryList.value.length > 0) {
    console.log('divide')
    // entry.value = formatResult(safeAdd(entry.value, entryList.value[0]))
  }
}

const parseNumber = (value) => {
  return parseFloat(value.replace(',', '.'))
}

const safeAdd = (operand1, operand2) => {
  const operand1Value = parseNumber(operand1)
  const operand2Value = parseNumber(operand2)
  const result = operand1Value + operand2Value
  return result
}

const safeMultiply = (operand1, operand2) => {
  const operand1Value = parseNumber(operand1)
  const operand2Value = parseNumber(operand2)
  const result = operand1Value * operand2Value
  return result
}

const formatResult = (value) => {
  const isInteger = Number.isInteger(value)
  const isNegative = value < 0
  let copyValue = String(value)
  const cleanStr = copyValue.replace(/[^0-9]/g, '')
  const cleanStrLength = cleanStr.length
  if (isInteger) {
    if (cleanStrLength > 12) copyValue = `${copyValue.slice(0, isNegative ? 12 : 11)}+`
  } else {
    if (cleanStrLength > 12) {
      if (isNegative) {
        const newValue = copyValue.slice(0, 13)
        const cleanNb = cleanNumberString(newValue)
        if (cleanNb.length < 13) copyValue = `${cleanNb}`
        else copyValue = `${cleanNb}+`
      } else {
        const newValue = copyValue.slice(0, 12)
        const cleanNb = cleanNumberString(newValue)
        if (cleanNb.length < 12) copyValue = `${cleanNb}`
        else copyValue = `${cleanNb}+`
      }
    } else {
      copyValue = cleanNumberString(copyValue)
    }
  }
  return copyValue
}

const evaluatePolishNotation = (expression) => {
  const stack = []
  const tokens = expression.split(' ')
  const tokensLength = tokens.length

  for (let i = 0; i < tokensLength; i++) {
    const token = tokens[i]

    if (['+', '-', '*', '/'].includes(token)) {
      // console.log('stack', stack)
      const operand1 = stack.pop()
      const operand2 = stack.pop()

      let result

      switch (token) {
        case '+':
          result = operand1 + operand2
          break
        case '-':
          result = operand2 - operand1
          break
        case '*':
          result = operand1 * operand2
          break
        case '/':
          result = operand2 / operand1
          break
      }

      stack.push(result)
    } else {
      stack.push(parseFloat(token))
    }
  }

  return stack[0]
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
    color: hsla(160, 60%, 20%);
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
        background-color: hsla(160, 60%, 20%, 0.8);
        box-shadow: 0px 0px 1px 1px hsl(160, 100%, 50%, 0.6);
      }
    }

    &__primary {
      position: relative;
      font-size: 44px;
      font-family: 'Fragment Mono', monospace;
      line-height: 44px;
      text-align: right;
      text-shadow: 0px 0px 2px hsl(160, 100%, 50%, 0.8);
    }

    &__secondary {
      font-size: 24px;
      font-family: 'Fragment Mono', monospace;
      line-height: 24px;
      text-align: left;
      text-shadow: 0px 0px 1px hsl(160, 100%, 50%, 0.8);
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
        color: #ffffff;
        background-color: hsl(212, 100%, 76%);
        font-size: 24px;
        line-height: 24px;
        letter-spacing: 1px;
        width: 224px;

        &:hover {
          background-color: hsl(212, 100%, 72%);
        }

        .icon {
          width: 44px;
          height: 44px;
          padding: 4px 12px 0 0;
        }
      }
    }
  }
}
</style>
