import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Calculator from '../CalculatorPolishReverse.vue'

describe('On click of multiply button', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should remove the first item from entryList after multiplication operation when the multiplication button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '6'
    instance.entryList = ['2']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('12')
    expect(instance.entryList).toEqual([])
  })

  it('Should deactivate concatMode and add multiplication result to entryList when a digit button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '6'
    instance.entryList = ['2']
    instance.concatMode = true
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('12')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('6')
    expect(instance.entry).toBe('6')
    expect(instance.entryList).toEqual(['12'])
    expect(instance.concatMode).toBe(true)
    instance.handleButtonClick('4')
    expect(instance.entry).toBe('64')
    expect(instance.entryList).toEqual(['12'])
    expect(instance.concatMode).toBe(true)
  })

  it('Should add multiplication result to entryList, set entry to 0, and deactivate concatMode when the comma button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '6'
    instance.entryList = ['2']
    instance.concatMode = true
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('12')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('coma')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['12'])
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('4')
    expect(instance.entry).toBe('4')
    expect(instance.entryList).toEqual(['12'])
    expect(instance.concatMode).toBe(true)
    instance.handleButtonClick('8')
    expect(instance.entry).toBe('48')
    expect(instance.entryList).toEqual(['12'])
    expect(instance.concatMode).toBe(true)
  })

  it('Should deactivate concatMode and add multiplication result to entryList after multiplication with a floating number when a digit button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '2,5'
    instance.entryList = ['3']
    instance.concatMode = true
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('7,5')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('6')
    expect(instance.entry).toBe('6')
    expect(instance.entryList).toEqual(['7,5'])
    expect(instance.concatMode).toBe(true)
    instance.handleButtonClick('4')
    expect(instance.entry).toBe('64')
    expect(instance.entryList).toEqual(['7,5'])
    expect(instance.concatMode).toBe(true)
  })

  it('Should add multiplication result with a floating number to entryList, set entry to 0, and deactivate concatMode after multiplication operation when the comma button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '2,5'
    instance.entryList = ['3']
    instance.concatMode = true
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('7,5')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('coma')
    expect(instance.entry).toBe('7,5')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('4')
    expect(instance.entry).toBe('4')
    expect(instance.entryList).toEqual(['7,5'])
    expect(instance.concatMode).toBe(true)
    instance.handleButtonClick('8')
    expect(instance.entry).toBe('48')
    expect(instance.entryList).toEqual(['7,5'])
    expect(instance.concatMode).toBe(true)
  })

  it('Clicking the multiplication button has no effect when entryList is empty', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('24')
  })

  it('Should set entry to the result of multiplying the current entry to the first item in entryList when the multiplication button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '2'
    instance.entryList = ['3']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('6')
  })

  it('Should set entry to the result of multiplying a floating number to the first item in entryList when the multiplication button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '4,2'
    instance.entryList = ['3']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('12,6')
  })

  it('Should set entry to the result of multiplying a negative floating number to the first item in entryList when the multiplication button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '-4,2'
    instance.entryList = ['3']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('-12,6')
  })

  it('Should correctly multiply a negative floating number to a positive floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-2,4'
    instance.entryList = ['2,2']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('-5,28')
  })

  it('Should not have more than 12 digits after the multiplication operation with an integer number', () => {
    const instance = wrapper.vm
    instance.entry = '999999999999'
    instance.entryList = ['999999999999']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('9.999999999+')
  })

  it('Should set errorEntry to true if the result of multiplying an integer number exceeds 12 digits', () => {
    const instance = wrapper.vm
    instance.entry = '999999999999'
    instance.entryList = ['999999999999']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('9.999999999+')
    expect(instance.hasEntryError).toBe(true)
  })

  it('Should not have more than 12 digits after the multiplication operation with an floating number', () => {
    const instance = wrapper.vm
    instance.entry = '9,99999999999'
    instance.entryList = ['9,99999999999']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('99,9999999998')
  })

  it('Should not have more than 12 digits after the multiplication operation with an negative Integer number', () => {
    const instance = wrapper.vm
    instance.entry = '-999999999999'
    instance.entryList = ['-999999999999']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('9.999999999+')
  })

  it('Should set errorEntry to true if the result of multiplying an negative Integer number exceeds 12 digits', () => {
    const instance = wrapper.vm
    instance.entry = '-999999999999'
    instance.entryList = ['-999999999999']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('9.999999999+')
    expect(instance.hasEntryError).toBe(true)
  })

  it('Should not have more than 12 digits after the multiplication operation with an negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-9,99999999999'
    instance.entryList = ['-9,99999999999']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('99,9999999998')
  })

  it('Should set entry to the clean result after multiplying two positive floating numbers', () => {
    const instance = wrapper.vm
    instance.entry = '0,2'
    instance.entryList = ['0,1']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('0,02')
  })

  it('Should set entry to the clean result after multiplying two negative floating numbers', () => {
    const instance = wrapper.vm
    instance.entry = '-0,2'
    instance.entryList = ['-0,1']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('0,02')
  })

  it('Should set entry to the clean result after multiplying a positive floating number to a negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-0,2'
    instance.entryList = ['0,1']
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('-0,02')
  })
})
