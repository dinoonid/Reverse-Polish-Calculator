<template>
  <div
    class="key"
    :class="keyOption.type"
    @click="emitButtonClicked(keyOption.action)"
    @mousedown="handleMouseDown(keyOption.action, $event)"
    @mouseup="handleMouseUpLeave(keyOption.action, $event)"
    @mouseleave="handleMouseUpLeave(keyOption.action, $event)"
  >
    <span>{{ keyOption.key }}</span>
    <span v-if="keyOption.option" class="key__start">{{ keyOption.option.key }}</span>
  </div>
</template>

<script setup>
defineProps(['keyOption'])
const emit = defineEmits(['buttonClicked', 'enableCalculator'])

let holdTimeout
let isCalculatorActived = false

const emitButtonClicked = (key) => {
  emit('buttonClicked', key)
}

const handleMouseDown = (action, event) => {
  event.currentTarget.classList.add('animate')
  if (action === 'clearall') {
    holdTimeout = setTimeout(() => {
      isCalculatorActived = !isCalculatorActived
      emit('enableCalculator', isCalculatorActived)
    }, 1000)
  }
}

const handleMouseUpLeave = (action, event) => {
  event.currentTarget.classList.remove('animate')
  if (action === 'clearall') clearTimeout(holdTimeout)
}
</script>

<style scoped lang="scss">
.key {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777777;
  font-size: 28px;
  background: linear-gradient(210deg, hsl(220, 30%, 92%) 0%, hsl(220, 30%, 100%) 90%);
  line-height: 28px;
  text-align: center;
  width: 64px;
  height: 64px;
  border-radius: 64px;
  border: 1px solid #ffffff;
  transition: all 30ms ease-out;
  box-shadow:
    0px 0px 0px 2px hsl(220, 30%, 30%, 0.14),
    -4px 6px 6px 0px hsl(220, 30%, 30%, 0.1);
  cursor: pointer;
  user-select: none;

  &:first-child {
    margin-right: 20px;
    &.animate {
      margin: 0 21px 0 1px;
    }
  }

  &:last-child {
    margin-left: 20px;
    &.animate {
      margin: 0 1px 0 21px;
    }
  }

  &:hover {
    background: hsl(220, 30%, 98%);
  }

  &.animate {
    font-size: 27px;
    width: 62px;
    height: 62px;
    margin: 0 1px;
    box-shadow:
      0px 0px 0px 2px hsl(220, 30%, 30%, 0.14),
      -2px 4px 6px 0px hsl(220, 30%, 30%, 0.1);
  }

  &.clear {
    color: hsl(26, 100%, 60%);
    font-size: 24px;
    &.animate {
      font-size: 23px;
    }
  }

  &.clearall {
    color: hsl(26, 100%, 60%);
    font-size: 22px;
    padding-bottom: 9px;
    &.animate {
      font-size: 21px;
      .key__start {
        font-size: 12px;
      }
    }
  }

  &.option {
    color: #33cccc;
  }

  &.zero {
    width: 144px;

    &.animate {
      width: 142px;
    }
  }

  &.enter {
    position: relative;
    font-size: 26px;
    line-height: 26px;
    letter-spacing: 1px;
    width: 224px;

    &.animate {
      font-size: 25px;
      width: 222px;
    }
  }

  &__start {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #33cccc;
    font-size: 13px;
    width: 64px;
    text-align: center;
    padding-top: 26px;
  }
}
</style>
