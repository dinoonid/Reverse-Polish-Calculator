import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Calculator from '../CalculatorPolishReverse.vue'

describe('On click of add button', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should remove the first item from entryList after addition operation when the addition button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '20'
    instance.entryList = ['30']
    instance.process('add')
    expect(instance.entry).toBe('50')
    expect(instance.entryList).toEqual([])
  })

  it('Should deactivate concatMode and add addition result to entryList when a digit button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '20'
    instance.entryList = ['30']
    instance.concatMode = true
    instance.process('add')
    expect(instance.entry).toBe('50')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.processDigitClick('6')
    expect(instance.entry).toBe('6')
    expect(instance.entryList).toEqual(['50'])
    expect(instance.concatMode).toBe(true)
    instance.processDigitClick('4')
    expect(instance.entry).toBe('64')
    expect(instance.entryList).toEqual(['50'])
    expect(instance.concatMode).toBe(true)
  })

  it('Should add addition result to entryList, set entry to 0, and deactivate concatMode when the comma button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '20'
    instance.entryList = ['30']
    instance.concatMode = true
    instance.process('add')
    expect(instance.entry).toBe('50')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.processComaClick()
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['50'])
    expect(instance.concatMode).toBe(false)
    instance.processDigitClick('4')
    expect(instance.entry).toBe('4')
    expect(instance.entryList).toEqual(['50'])
    expect(instance.concatMode).toBe(true)
    instance.processDigitClick('8')
    expect(instance.entry).toBe('48')
    expect(instance.entryList).toEqual(['50'])
    expect(instance.concatMode).toBe(true)
  })

  it('Should deactivate concatMode and add addition result to entryList after addition with a floating number when a digit button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '2,5'
    instance.entryList = ['3']
    instance.concatMode = true
    instance.process('add')
    expect(instance.entry).toBe('5,5')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.processDigitClick('6')
    expect(instance.entry).toBe('6')
    expect(instance.entryList).toEqual(['5,5'])
    expect(instance.concatMode).toBe(true)
    instance.processDigitClick('4')
    expect(instance.entry).toBe('64')
    expect(instance.entryList).toEqual(['5,5'])
    expect(instance.concatMode).toBe(true)
  })

  it('Should add addition result with a floating number to entryList, set entry to 0, and deactivate concatMode after addition operation when the comma button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '2,5'
    instance.entryList = ['3']
    instance.concatMode = true
    instance.process('add')
    expect(instance.entry).toBe('5,5')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.processComaClick()
    expect(instance.entry).toBe('5,5')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.processDigitClick('4')
    expect(instance.entry).toBe('4')
    expect(instance.entryList).toEqual(['5,5'])
    expect(instance.concatMode).toBe(true)
    instance.processDigitClick('8')
    expect(instance.entry).toBe('48')
    expect(instance.entryList).toEqual(['5,5'])
    expect(instance.concatMode).toBe(true)
  })

  it('Clicking the addition button has no effect when entryList is empty', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.process('add')
    expect(instance.entry).toBe('24')
  })

  it('Should set entry to the result of adding the current entry to the first item in entryList when the addition button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.processEnterClick()
    expect(instance.entryList).toEqual(['24'])
    instance.process('add')
    expect(instance.entry).toBe('48')
  })

  it('Should set entry to the result of adding a floating number to the first item in entryList when the addition button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '14,2'
    instance.processEnterClick()
    expect(instance.entryList).toEqual(['14,2'])
    instance.process('add')
    expect(instance.entry).toBe('28,4')
  })

  it('Should set entry to the result of adding a negative floating number to the first item in entryList when the addition button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '-14,2'
    instance.processEnterClick()
    expect(instance.entryList).toEqual(['-14,2'])
    instance.process('add')
    expect(instance.entry).toBe('-28,4')
  })

  it('Should correctly add a negative floating number to a positive floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-2,4'
    instance.entryList = ['2,2']
    instance.process('add')
    expect(instance.entry).toBe('-0,2')
  })

  it('Should not have more than 12 digits after the addition operation with an integer number', () => {
    const instance = wrapper.vm
    instance.entry = '999999999999'
    instance.entryList = ['999999999999']
    instance.process('add')
    expect(instance.entry).toBe('19999999999+')
  })

  it('Should set errorEntry to true if the result of adding an integer number exceeds 12 digits', () => {
    const instance = wrapper.vm
    instance.entry = '999999999999'
    instance.entryList = ['999999999999']
    instance.process('add')
    expect(instance.entry).toBe('19999999999+')
    expect(instance.hasEntryError).toBe(true)
  })

  it('Should not have more than 12 digits after the addition operation with an floating number', () => {
    const instance = wrapper.vm
    instance.entry = '9,99999999999'
    instance.entryList = ['9,99999999999']
    instance.process('add')
    expect(instance.entry).toBe('19,999999999+')
  })

  it('Should set errorEntry to true if the result of adding an floating number exceeds 12 digits', () => {
    const instance = wrapper.vm
    instance.entry = '9,99999999999'
    instance.entryList = ['9,99999999999']
    instance.process('add')
    expect(instance.entry).toBe('19,999999999+')
    expect(instance.hasEntryError).toBe(true)
  })

  it('Should not have more than 12 digits after the addition operation with an negative Integer number', () => {
    const instance = wrapper.vm
    instance.entry = '-999999999999'
    instance.entryList = ['-999999999999']
    instance.process('add')
    expect(instance.entry).toBe('-19999999999+')
  })

  it('Should set errorEntry to true if the result of adding an negative Integer number exceeds 12 digits', () => {
    const instance = wrapper.vm
    instance.entry = '-999999999999'
    instance.entryList = ['-999999999999']
    instance.process('add')
    expect(instance.entry).toBe('-19999999999+')
    expect(instance.hasEntryError).toBe(true)
  })

  it('Should not have more than 12 digits after the addition operation with an negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-9,99999999999'
    instance.entryList = ['-9,99999999999']
    instance.process('add')
    expect(instance.entry).toBe('-19,999999999+')
  })

  it('Should set errorEntry to true if the result of adding an negative floating number exceeds 12 digits', () => {
    const instance = wrapper.vm
    instance.entry = '-9,99999999999'
    instance.entryList = ['-9,99999999999']
    instance.process('add')
    expect(instance.entry).toBe('-19,999999999+')
    expect(instance.hasEntryError).toBe(true)
  })

  it('Should set entry to the clean result after adding two positive floating number', () => {
    const instance = wrapper.vm
    instance.entry = '0,2'
    instance.entryList = ['0,1']
    instance.process('add')
    expect(instance.entry).toBe('0,3')
  })

  it('Should set entry to the clean result after adding two negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-0,2'
    instance.entryList = ['-0,1']
    instance.process('add')
    expect(instance.entry).toBe('-0,3')
  })

  it('Should set entry to the clean result after adding a positive floating number to a negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-0,2'
    instance.entryList = ['0,1']
    instance.process('add')
    expect(instance.entry).toBe('-0,1')
  })
})
