import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Calculator from '../CalculatorPolishReverse.vue'

describe('On click of divide button', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should remove the first item from entryList after division operation when the division button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '6'
    instance.entryList = ['24']
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('4')
    expect(instance.entryList).toEqual([])
  })

  it('Should deactivate concatMode and add division result to entryList when a digit button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '6'
    instance.entryList = ['24']
    instance.concatMode = true
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('4')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('6')
    expect(instance.entry).toBe('6')
    expect(instance.entryList).toEqual(['4'])
    expect(instance.concatMode).toBe(true)
    instance.handleButtonClick('4')
    expect(instance.entry).toBe('64')
    expect(instance.entryList).toEqual(['4'])
    expect(instance.concatMode).toBe(true)
  })

  it('Should add division result to entryList, set entry to 0, and deactivate concatMode when the comma button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '6'
    instance.entryList = ['24']
    instance.concatMode = true
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('4')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('coma')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['4'])
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('4')
    expect(instance.entry).toBe('4')
    expect(instance.entryList).toEqual(['4'])
    expect(instance.concatMode).toBe(true)
    instance.handleButtonClick('8')
    expect(instance.entry).toBe('48')
    expect(instance.entryList).toEqual(['4'])
    expect(instance.concatMode).toBe(true)
  })

  it('Should deactivate concatMode and add division result to entryList after division with a floating number when a digit button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '2,5'
    instance.entryList = ['24']
    instance.concatMode = true
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('9,6')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('6')
    expect(instance.entry).toBe('6')
    expect(instance.entryList).toEqual(['9,6'])
    expect(instance.concatMode).toBe(true)
    instance.handleButtonClick('4')
    expect(instance.entry).toBe('64')
    expect(instance.entryList).toEqual(['9,6'])
    expect(instance.concatMode).toBe(true)
  })

  it('Should add division result with a floating number to entryList, set entry to 0, and deactivate concatMode after division operation when the comma button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '2,5'
    instance.entryList = ['24']
    instance.concatMode = true
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('9,6')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('coma')
    expect(instance.entry).toBe('9,6')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('4')
    expect(instance.entry).toBe('4')
    expect(instance.entryList).toEqual(['9,6'])
    expect(instance.concatMode).toBe(true)
    instance.handleButtonClick('8')
    expect(instance.entry).toBe('48')
    expect(instance.entryList).toEqual(['9,6'])
    expect(instance.concatMode).toBe(true)
  })

  it('Clicking the division button has no effect when entryList is empty', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('24')
  })

  it('Should set entry to the result of dividing the current entry to the first item in entryList when the division button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '2'
    instance.entryList = ['24']
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('12')
  })

  it('Should set entry to the result of dividing a floating number to the first item in entryList when the division button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '4,5'
    instance.entryList = ['24']
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('5,33333333333')
  })

  it('Should set entry to the result of dividing a negative floating number to the first item in entryList when the division button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '-4,5'
    instance.entryList = ['27']
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('-6')
  })

  it('Should correctly divide a negative floating number to a positive floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-2,2'
    instance.entryList = ['6,6']
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('-3')
  })

  it('Should set entry to the clean result after dividing two positive floating numbers', () => {
    const instance = wrapper.vm
    instance.entry = '0,022'
    instance.entryList = ['0,099']
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('4,5')
  })

  it('Should set entry to the clean result after dividing two negative floating numbers', () => {
    const instance = wrapper.vm
    instance.entry = '-0,022'
    instance.entryList = ['-0,099']
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('4,5')
  })

  it('Should set entry to the clean result after dividing a positive floating number to a negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-0,022'
    instance.entryList = ['0,099']
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('-4,5')
  })

  it('Should set entry to the clean result after dividing 0 to 0', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    instance.entryList = ['0']
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('NaN')
  })

  it('Should set entry to the clean result after dividing a positive number to 0', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    instance.entryList = ['78']
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('∞')
  })

  it('Should set entry to the clean result after dividing a negative number to 0', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    instance.entryList = ['-78']
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('∞')
  })

  it('Should set entry to the clean result after dividing 0 to a number', () => {
    const instance = wrapper.vm
    instance.entry = '78'
    instance.entryList = ['0']
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('0')
  })
})
