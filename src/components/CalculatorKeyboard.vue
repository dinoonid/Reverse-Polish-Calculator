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
      title: 'Swap'
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
      type: 'option',
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
      type: 'option',
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
      type: 'option',
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
      type: 'option',
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
    top: 28px;
    left: 110px;
    width: 1px;
    height: 384px;
    background-color: #ffffff;
    border-left: 1px solid hsl(220, 30%, 30%, 0.2);
    box-sizing: content-box;
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
