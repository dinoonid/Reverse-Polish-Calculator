<template>
  <div class="keyboard">
    <div class="keyboard__line" v-for="(line, index) in keyList" :key="`line${index}`">
      <CalculatorKey
        v-for="key in line"
        :key="`key${key.action}`"
        :key-option="key"
        @button-clicked="emitButtonClicked"
        @enableCalculator="emitEnableCalculator"
      />
    </div>
  </div>
</template>

<script setup>
import CalculatorKey from '@/components/CalculatorKey.vue'
import swap from '@/assets/images/swap-arrow.svg'

const emit = defineEmits(['buttonClicked', 'enableCalculator'])

const keyList = [
  [
    {
      key: 'AC',
      type: 'clearall',
      action: 'clearall',
      title: 'Clear all or Enable calculator',
      option: {
        key: 'ON',
        type: 'enable'
      }
    },
    {
      key: 'enter',
      type: 'enter',
      action: 'enter',
      title: 'Push number'
    },
    {
      key: 'C',
      type: 'clear',
      action: 'clear',
      title: 'Clear number'
    }
  ],
  [
    {
      key: '↕',
      type: 'option',
      action: 'swap',
      title: 'Swap',
      icon: swap
    },
    {
      key: '7',
      type: 'digit',
      action: '7'
    },
    {
      key: '8',
      type: 'digit',
      action: '8'
    },
    {
      key: '9',
      type: 'digit',
      action: '9'
    },
    {
      key: '÷',
      type: 'operator',
      action: 'divide',
      title: 'Divide'
    }
  ],
  [
    {
      key: '%',
      type: 'option',
      action: 'percent',
      title: 'Percentage'
    },
    {
      key: '4',
      type: 'digit',
      action: '4'
    },
    {
      key: '5',
      type: 'digit',
      action: '5'
    },
    {
      key: '6',
      type: 'digit',
      action: '6'
    },
    {
      key: '×',
      type: 'operator',
      action: 'multiply',
      title: 'Multiply'
    }
  ],
  [
    {
      key: 'xʸ',
      type: 'option',
      action: 'power',
      title: 'Power'
    },
    {
      key: '1',
      type: 'digit',
      action: '1'
    },
    {
      key: '2',
      type: 'digit',
      action: '2'
    },
    {
      key: '3',
      type: 'digit',
      action: '3'
    },
    {
      key: '-',
      type: 'operator',
      action: 'subtract',
      title: 'Subtract'
    }
  ],
  [
    {
      key: '±',
      type: 'option',
      action: 'plusminus',
      title: 'Negative number'
    },
    {
      key: '0',
      type: 'zero',
      action: '0'
    },
    {
      key: '•',
      type: 'digit',
      action: 'coma'
    },
    {
      key: '+',
      type: 'operator',
      action: 'add',
      title: 'Add'
    }
  ]
]

let isCalculatorActived = false

const emitButtonClicked = (key) => {
  if (isCalculatorActived) emit('buttonClicked', key)
}

const emitEnableCalculator = (status) => {
  isCalculatorActived = status
  emit('enableCalculator', status)
}
</script>

<style scoped lang="scss">
.keyboard {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 110px;
    width: 1px;
    height: 100%;
    background-color: hsl(220, 30%, 30%, 0.08);
  }

  &::after {
    left: 370px;
  }

  &__line {
    display: flex;
    align-items: center;
    gap: 16px;
    max-width: 424px;
  }
}
</style>
