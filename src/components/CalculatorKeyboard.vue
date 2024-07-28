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
      <div class="keyboard__row option" title="Divide" @click="emitButtonClicked('divide')">÷</div>
    </div>
    <div class="keyboard__line">
      <div class="keyboard__row option" title="Percent" @click="emitButtonClicked('percent')">
        %
      </div>
      <div class="keyboard__row digit" id="key-4" @click="emitButtonClicked('4')">4</div>
      <div class="keyboard__row digit" id="key-5" @click="emitButtonClicked('5')">5</div>
      <div class="keyboard__row digit" id="key-6" @click="emitButtonClicked('6')">6</div>
      <div class="keyboard__row option" title="Multiply" @click="emitButtonClicked('multiply')">
        ×
      </div>
    </div>
    <div class="keyboard__line">
      <div class="keyboard__row option" title="Power" @click="emitButtonClicked('xy')">xʸ</div>
      <div class="keyboard__row digit" id="key-1" @click="emitButtonClicked('1')">1</div>
      <div class="keyboard__row digit" id="key-2" @click="emitButtonClicked('2')">2</div>
      <div class="keyboard__row digit" id="key-3" @click="emitButtonClicked('3')">3</div>
      <div class="keyboard__row option" title="Subtract" @click="emitButtonClicked('subtract')">
        -
      </div>
    </div>
    <div class="keyboard__line">
      <div
        class="keyboard__row digit option"
        title="Negative number"
        @click="emitButtonClicked('plusminus')"
      >
        ±
      </div>
      <div class="keyboard__row zero" id="key-0" @click="emitButtonClicked('0')">0</div>
      <div class="keyboard__row digit" @click="emitButtonClicked('coma')">•</div>
      <div class="keyboard__row option" title="Add" @click="emitButtonClicked('add')">+</div>
    </div>
  </div>
</template>

<script setup>
import swap from '@/assets/images/swap.svg'
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
  }

  &__row {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #777777;
    font-size: 28px;
    background: linear-gradient(210deg, hsl(220, 30%, 95%), hsl(220, 30%, 100%));
    font-family: 'Urbanis';
    font-weight: normal;
    line-height: 40px;
    text-align: center;
    width: 64px;
    height: 64px;
    border-radius: 64px;
    border: 1px solid #ffffff;
    box-shadow:
      0px 0px 0px 2px hsl(220, 30%, 30%, 0.1),
      -4px 6px 6px 1px hsl(220, 30%, 30%, 0.16);
    cursor: pointer;
    user-select: none;

    &:first-child {
      margin-right: 20px;
    }

    &:last-child {
      margin-left: 20px;
    }

    &:hover {
      background: hsl(220, 30%, 100%);
    }

    &.clear {
      color: hsl(26, 100%, 70%);
      font-size: 24px;
    }

    &.option {
      color: #33cccc;
    }

    &.swap {
      .icon {
        width: 22px;
        height: auto;
      }
    }

    &.zero {
      width: 144px;
    }

    &.enter {
      position: relative;
      color: #777777;
      color: #80aaff;
      font-size: 26px;
      line-height: 26px;
      letter-spacing: 1px;
      width: 224px;

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
