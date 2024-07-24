import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Calculator from '../CalculatorPolishReverse.vue'

describe('On click of subtract button', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should remove the first item from entryList after substraction operation when the substraction button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '4'
    instance.entryList = ['6']
    instance.process('subtract')
    expect(instance.entry).toBe('2')
    expect(instance.entryList).toEqual([])
  })

  it('Should deactivate concatMode and add substraction result to entryList when a digit button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '4'
    instance.entryList = ['6']
    instance.concatMode = true
    instance.process('subtract')
    expect(instance.entry).toBe('2')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.processDigitClick('6')
    expect(instance.entry).toBe('6')
    expect(instance.entryList).toEqual(['2'])
    expect(instance.concatMode).toBe(true)
    instance.processDigitClick('4')
    expect(instance.entry).toBe('64')
    expect(instance.entryList).toEqual(['2'])
    expect(instance.concatMode).toBe(true)
  })

  it('Should add substraction result to entryList, set entry to 0, and deactivate concatMode when the comma button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '4'
    instance.entryList = ['6']
    instance.concatMode = true
    instance.process('subtract')
    expect(instance.entry).toBe('2')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.processComaClick()
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['2'])
    expect(instance.concatMode).toBe(false)
    instance.processDigitClick('4')
    expect(instance.entry).toBe('4')
    expect(instance.entryList).toEqual(['2'])
    expect(instance.concatMode).toBe(true)
    instance.processDigitClick('8')
    expect(instance.entry).toBe('48')
    expect(instance.entryList).toEqual(['2'])
    expect(instance.concatMode).toBe(true)
  })

  it('Should deactivate concatMode and add substraction result to entryList after substraction with a floating number when a digit button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '2,5'
    instance.entryList = ['6']
    instance.concatMode = true
    instance.process('subtract')
    expect(instance.entry).toBe('3,5')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.processDigitClick('6')
    expect(instance.entry).toBe('6')
    expect(instance.entryList).toEqual(['3,5'])
    expect(instance.concatMode).toBe(true)
    instance.processDigitClick('4')
    expect(instance.entry).toBe('64')
    expect(instance.entryList).toEqual(['3,5'])
    expect(instance.concatMode).toBe(true)
  })

  it('Should add substraction result with a floating number to entryList, set entry to 0, and deactivate concatMode after substraction operation when the comma button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '2,5'
    instance.entryList = ['6']
    instance.concatMode = true
    instance.process('subtract')
    expect(instance.entry).toBe('3,5')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.processComaClick()
    expect(instance.entry).toBe('3,5')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.processDigitClick('4')
    expect(instance.entry).toBe('4')
    expect(instance.entryList).toEqual(['3,5'])
    expect(instance.concatMode).toBe(true)
    instance.processDigitClick('8')
    expect(instance.entry).toBe('48')
    expect(instance.entryList).toEqual(['3,5'])
    expect(instance.concatMode).toBe(true)
  })

  it('Clicking the substraction button has no effect when entryList is empty', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.process('subtract')
    expect(instance.entry).toBe('24')
  })

  it('Should set entry to the result of subtracting the current entry to the first item in entryList when the substraction button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '2'
    instance.entryList = ['6']
    instance.process('subtract')
    expect(instance.entry).toBe('4')
  })

  it('Should set entry to the result of subtracting a floating number to the first item in entryList when the substraction button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '4,2'
    instance.entryList = ['6']
    instance.process('subtract')
    expect(instance.entry).toBe('1,8')
  })

  it('Should set entry to the result of subtracting a negative floating number to the first item in entryList when the substraction button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '-4,2'
    instance.entryList = ['6']
    instance.process('subtract')
    expect(instance.entry).toBe('10,2')
  })

  it('Should correctly subtract a positive floating number to a postive floating number', () => {
    const instance = wrapper.vm
    instance.entry = '4,4'
    instance.entryList = ['2,6']
    instance.process('subtract')
    expect(instance.entry).toBe('-1,8')
  })

  it('Should correctly subtract a positive floating number to a negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-2,4'
    instance.entryList = ['2,2']
    instance.process('subtract')
    expect(instance.entry).toBe('4,6')
  })

  it('Should correctly subtract a negative floating number to a positive floating number', () => {
    const instance = wrapper.vm
    instance.entry = '2,4'
    instance.entryList = ['-2,2']
    instance.process('subtract')
    expect(instance.entry).toBe('-4,6')
  })

  it('Should set entry to the clean result after subtracting two positive floating numbers', () => {
    const instance = wrapper.vm
    instance.entry = '3,2'
    instance.entryList = ['7,4']
    instance.process('subtract')
    expect(instance.entry).toBe('4,2')
  })

  it('Should set entry to the clean result after subtracting two negative floating numbers', () => {
    const instance = wrapper.vm
    instance.entry = '-3,2'
    instance.entryList = ['-7,4']
    instance.process('subtract')
    expect(instance.entry).toBe('-4,2')
  })

  it('Should set entry to the clean result after subtracting a positive floating number to a negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-3,2'
    instance.entryList = ['7,4']
    instance.process('subtract')
    expect(instance.entry).toBe('10,6')
  })
})
