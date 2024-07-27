<template>
  <div class="keyboard">
    <div class="keyboard__line">
      <div class="keyboard__row clear" title="Clear all" @click="emitButtonClicked('ac')">AC</div>
      <div class="keyboard__row enter" title="Add number" @click="emitButtonClicked('enter')">
        <img alt="return" class="icon" :src="arrowReturn" />
        <img alt="return" class="icon" :src="arrowReturn" />
        <div class="text">enter</div>
      </div>
      <div class="keyboard__row clear" title="Clear number" @click="emitButtonClicked('c')">C</div>
    </div>
    <div class="keyboard__line">
      <div class="keyboard__row swap" title="Swap" @click="emitButtonClicked('swap')">
        <img alt="swap" class="icon" :src="swap" />
      </div>
      <div class="keyboard__row digit" id="key-7" @click="emitButtonClicked('7')">7</div>
      <div class="keyboard__row digit" id="key-8" @click="emitButtonClicked('8')">8</div>
      <div class="keyboard__row digit" id="key-9" @click="emitButtonClicked('9')">9</div>
      <div class="keyboard__row operator" title="Divide" @click="emitButtonClicked('divide')">
        <img alt="division" class="icon" :src="division" />
      </div>
    </div>
    <div class="keyboard__line">
      <div class="keyboard__row option" title="Percent" @click="emitButtonClicked('percent')">
        <img alt="percent" class="icon" :src="percent" />
      </div>
      <div class="keyboard__row digit" id="key-4" @click="emitButtonClicked('4')">4</div>
      <div class="keyboard__row digit" id="key-5" @click="emitButtonClicked('5')">5</div>
      <div class="keyboard__row digit" id="key-6" @click="emitButtonClicked('6')">6</div>
      <div class="keyboard__row operator" title="Multiply" @click="emitButtonClicked('multiply')">
        <img alt="multiplication" class="icon" :src="multiplication" />
      </div>
    </div>
    <div class="keyboard__line">
      <div class="keyboard__row power" title="Power" @click="emitButtonClicked('xy')">
        <img alt="xy" class="icon" :src="xy" />
      </div>
      <div class="keyboard__row digit" id="key-1" @click="emitButtonClicked('1')">1</div>
      <div class="keyboard__row digit" id="key-2" @click="emitButtonClicked('2')">2</div>
      <div class="keyboard__row digit" id="key-3" @click="emitButtonClicked('3')">3</div>
      <div class="keyboard__row operator" title="Subtract" @click="emitButtonClicked('subtract')">
        <img alt="soustraction" class="icon" :src="soustraction" />
      </div>
    </div>
    <div class="keyboard__line">
      <div
        class="keyboard__row digit plusminus"
        title="Negative number"
        @click="emitButtonClicked('plusminus')"
      >
        <img alt="addition" class="icon" :src="plusminus" />
      </div>
      <div class="keyboard__row zero" id="key-0" @click="emitButtonClicked('0')">0</div>
      <div class="keyboard__row digit" @click="emitButtonClicked('coma')">•</div>
      <div class="keyboard__row operator" title="Add" @click="emitButtonClicked('add')">
        <img alt="addition" class="icon" :src="addition" />
      </div>
    </div>
  </div>
</template>

<script setup>
import addition from '@/assets/images/addition.svg'
import soustraction from '@/assets/images/soustraction.svg'
import multiplication from '@/assets/images/multiplication.svg'
import division from '@/assets/images/division.svg'
import plusminus from '@/assets/images/plusminus.svg'
import swap from '@/assets/images/swap.svg'
import percent from '@/assets/images/percent.svg'
import xy from '@/assets/images/xy.svg'
import arrowReturn from '@/assets/images/return.svg'

const emit = defineEmits(['buttonClicked'])

const emitButtonClicked = (key) => {
  emit('buttonClicked', key)
}
</script>

<style scoped lang="scss">
.keyboard {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px 48px 28px 48px;

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
</style>
