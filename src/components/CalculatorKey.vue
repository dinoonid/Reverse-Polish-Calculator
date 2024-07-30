<template>
  <div
    class="key"
    :class="keyOption.type"
    :title="keyOption.title ? keyOption.title : ''"
    @click="emitButtonClicked(keyOption.action)"
    @mousedown="handleMouseDown(keyOption.action, $event)"
    @mouseup="handleMouseUpLeave(keyOption.action, $event)"
    @mouseleave="handleMouseUpLeave(keyOption.action, $event)"
  >
    <div class="key__content">
      <img v-if="keyOption.icon" :src="keyOption.icon" />
      <span v-else>{{ keyOption.key }}</span>
      <span
        v-if="keyOption.option"
        class="key__secondary"
        :class="{ active: isCalculatorActived }"
        >{{ keyOption.option.key }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps(['keyOption'])
const emit = defineEmits(['buttonClicked', 'enableCalculator'])

let holdTimeout
let isCalculatorActived = ref(false)

const emitButtonClicked = (key) => {
  emit('buttonClicked', key)
}

const handleMouseDown = (action, event) => {
  event.currentTarget.classList.add('animate')
  if (action === 'clearall') {
    holdTimeout = setTimeout(() => {
      isCalculatorActived.value = !isCalculatorActived.value
      emit('enableCalculator', isCalculatorActived.value)
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
  background: linear-gradient(210deg, hsl(220, 30%, 92%) 0%, hsl(220, 30%, 100%) 90%);
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

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #7a8eb8;
    font-size: 28px;
    font-weight: 400;
    line-height: 64px;
    text-align: center;
    text-shadow: 0 0 4px #ffffff;
    text-shadow:
      1px -1px 1px #ffffff,
      1px -1px 1px #ffffff,
      1px -1px 1px #ffffff,
      1px -1px 1px #ffffff,
      0 0 1px #ffffff,
      0 0 1px #ffffff,
      0 0 1px #ffffff,
      0 0 1px #ffffff;
  }

  &.animate {
    width: 62px;
    height: 62px;
    margin: 0 1px;
    box-shadow:
      0px 0px 0px 2px hsl(220, 30%, 30%, 0.14),
      -2px 4px 6px 0px hsl(220, 30%, 30%, 0.1);

    .key__content {
      transform: scale(0.94);
    }
  }

  &.clear {
    .key__content {
      color: hsl(26, 100%, 60%);
      font-size: 24px;
    }
  }

  &.clearall {
    .key__content {
      color: hsl(26, 100%, 60%);
      font-size: 22px;
      padding-bottom: 9px;
    }
  }

  &.option {
    .key__content {
      color: #33cccc;
    }
  }

  &.operator {
    .key__content {
      color: #33cccc;
      font-size: 38px;
      font-weight: 300;
    }
  }

  &.zero {
    width: 144px;
    &.animate {
      width: 142px;
    }
  }

  &.enter {
    width: 224px;
    .key__content {
      color: #33cccc;
      font-size: 30px;
      font-weight: 300;
      letter-spacing: 1px;
      padding-bottom: 4px;
    }

    &.animate {
      width: 222px;
    }
  }

  &__secondary {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #7a8eb8;
    font-size: 13px;
    font-weight: 700;
    line-height: 13px;
    width: 64px;
    text-align: center;
    letter-spacing: 1px;
    padding-top: 26px;

    &.active {
      color: #33cccc;
    }
  }
}
</style>
