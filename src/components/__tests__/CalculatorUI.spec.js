import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Calculator from '../CalculatorPolishReverse.vue'

describe('Calculator - At initialisation', () => {
  it('Should entry display 1 when button 1 is clicked', async () => {
    const wrapper = mount(Calculator)
    const primaryField = wrapper.find('#primary-field')
    const secondaryField = wrapper.find('#secondary-field')

    expect(primaryField.text()).toBe('0')
    expect(secondaryField.text()).toBe('0')
  })
})

describe('Calculator - At once click to digit buttons', () => {
  it('Should entry display 0 when button 0 is clicked', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-0')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('0')
  })

  it('Should entry display 1 when button 1 is clicked', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-1')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('1')
  })

  it('Should entry display 2 when button 2 is clicked', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-2')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('2')
  })

  it('Should entry display 3 when button 3 is clicked', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-3')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('3')
  })

  it('Should entry display 4 when button 4 is clicked', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-4')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('4')
  })

  it('Should entry display 5 when button 5 is clicked', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-5')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('5')
  })

  it('Should entry display 6 when button 6 is clicked', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-6')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('6')
  })

  it('Should entry display 7 when button 7 is clicked', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-7')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('7')
  })

  it('Should entry display 8 when button 8 is clicked', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-8')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('8')
  })

  it('Should entry display 9 when button 9 is clicked', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-9')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('9')
  })
})

describe('Calculator - At twice click to digit buttons', () => {
  it('Should entry display 0 when button 0 is clicked twice', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-0')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('0')
  })

  it('Should entry display 1 when button 0 and then button 1 are clicked', async () => {
    const wrapper = mount(Calculator)
    const digitButton0 = wrapper.find('#key-0')
    const digitButton1 = wrapper.find('#key-1')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton0.trigger('click')
    expect(primaryField.text()).toBe('0')
    await digitButton1.trigger('click')
    expect(primaryField.text()).toBe('1')
  })

  it('Should entry display 11 when button 1 is clicked twice', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-1')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('1')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('11')
  })

  it('Should entry display 22 when button 2 is clicked twice', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-2')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('2')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('22')
  })

  it('Should entry display 33 when button 3 is clicked twice', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-3')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('3')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('33')
  })

  it('Should entry display 44 when button 4 is clicked twice', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-4')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('4')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('44')
  })

  it('Should entry display 55 when button 5 is clicked twice', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-5')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('5')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('55')
  })

  it('Should entry display 66 when button 6 is clicked twice', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-6')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('6')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('66')
  })

  it('Should entry display 77 when button 7 is clicked twice', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-7')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('7')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('77')
  })

  it('Should entry display 88 when button 8 is clicked twice', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-8')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('8')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('88')
  })

  it('Should entry display 99 when button 9 is clicked twice', async () => {
    const wrapper = mount(Calculator)
    const digitButton = wrapper.find('#key-9')
    const primaryField = wrapper.find('#primary-field')

    expect(primaryField.text()).toBe('0')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('9')
    await digitButton.trigger('click')
    expect(primaryField.text()).toBe('99')
  })
})
