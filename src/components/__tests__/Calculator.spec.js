import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Calculator from '../CalculatorPolishReverse.vue'

describe('At initialisation', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should data must be initialized', () => {
    const instance = wrapper.vm
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual([])
    expect(instance.hasEntryError).toBe(false)
    expect(instance.concatMode).toBe(false)
    expect(instance.operationInProgress).toBe(false)
  })
})

describe('On click of digits ', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should entry must be 2 when "0" and then "2" is clicked', () => {
    const instance = wrapper.vm
    expect(instance.entry).toBe('0')
    instance.processDigitClick('2')
    expect(instance.entry).toBe('2')
  })

  it('Should entry must be 24 when "2" "4" are clicked', () => {
    const instance = wrapper.vm
    expect(instance.entry).toBe('0')
    instance.processDigitClick('2')
    expect(instance.entry).toBe('2')
    instance.processDigitClick('4')
    expect(instance.entry).toBe('24')
  })

  it('Should entry must be 6,2 when "6" "," "2" are clicked', () => {
    const instance = wrapper.vm
    expect(instance.entry).toBe('0')
    instance.processDigitClick('6')
    expect(instance.entry).toBe('6')
    instance.processComaClick()
    expect(instance.entry).toBe('6,')
    instance.processDigitClick('2')
    expect(instance.entry).toBe('6,2')
  })

  it('Should entry must be 0,5 when button "," and button "5" are clicked', () => {
    const instance = wrapper.vm
    expect(instance.entry).toBe('0')
    instance.processComaClick()
    expect(instance.entry).toBe('0,')
    instance.processDigitClick('5')
    expect(instance.entry).toBe('0,5')
  })

  it('Should entry must be 3,48 when "3" "," "8" "," are clicked', () => {
    const instance = wrapper.vm
    instance.processDigitClick('3')
    expect(instance.entry).toBe('3')
    instance.processComaClick()
    expect(instance.entry).toBe('3,')
    instance.processDigitClick('8')
    expect(instance.entry).toBe('3,8')
    instance.processComaClick()
    expect(instance.entry).toBe('3,8')
  })

  it('Should entry must not contain more than 12 digits', () => {
    const instance = wrapper.vm
    instance.entry = '222244446666'
    instance.concatMode = true
    instance.processDigitClick('8')
    expect(instance.entry).toBe('222244446666')
  })

  it('Should entry must not contain more than 12 digits plus decimal point', () => {
    const instance = wrapper.vm
    instance.entry = '2222,44446666'
    instance.concatMode = true
    instance.processDigitClick('8')
    expect(instance.entry).toBe('2222,44446666')
  })

  it('Should entry must not contain more than 12 digits plus decimal point and plusminus', () => {
    const instance = wrapper.vm
    instance.entry = '-2222,44446666'
    instance.concatMode = true
    instance.processDigitClick('8')
    expect(instance.entry).toBe('-2222,44446666')
  })
})

describe('On click of clear buttons', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should click of clear all must be initialized all', () => {
    const instance = wrapper.vm
    instance.entry = '60'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.operationInProgress = true
    instance.resetAll()
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual([])
    expect(instance.hasEntryError).toBe(false)
    expect(instance.operationInProgress).toBe(false)
  })

  it('Should click of clear must be initialized entry and initialized hasEntryError', () => {
    const instance = wrapper.vm
    instance.entry = '60'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.operationInProgress = true
    instance.reset()
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
    expect(instance.operationInProgress).toBe(false)
  })

  it('Should click of clear must activate concatMode', () => {
    const instance = wrapper.vm
    instance.entry = '60'
    instance.processEnterClick()
    instance.reset()
    instance.processDigitClick('6')
    instance.processDigitClick('8')
    expect(instance.entry).toBe('68')
  })

  it('Should click of clear all must activate concatMode', () => {
    const instance = wrapper.vm
    instance.entry = '60'
    instance.processEnterClick()
    instance.resetAll()
    instance.processDigitClick('6')
    instance.processDigitClick('8')
    expect(instance.entry).toBe('68')
  })
})

describe('At hasEntryError activate', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should desactivate hasEntryError, reset entry when click to button "enter"', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.processEnterClick()
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should desactivate hasEntryError, reset entry when click to button ","', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.processComaClick()
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should desactivate hasEntryError, set entry with digit value when click to a digit button', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.processDigitClick('5')
    expect(instance.entry).toBe('5')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should desactivate hasEntryError, reset entry when click to button plusminus', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.togglePositiveNegative()
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should desactivate hasEntryError, reset entry when click to button add', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.process('add')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should desactivate hasEntryError, reset entry when click to button subtract', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.process('subtract')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should desactivate hasEntryError, reset entry when click to button multiply', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.process('multiply')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should desactivate hasEntryError, reset entry when click to button divide', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.process('divide')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  // Ajouter les tests pour toutes les autres touches
})

describe('On click of plusminus button', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should click of plusminus must be toggle the sign of the number to switch between positive and negative', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.togglePositiveNegative()
    expect(instance.entry).toBe('-24')
    instance.togglePositiveNegative()
    expect(instance.entry).toBe('24')
  })

  it('Should not toggle negative sign when the entry is "0" upon clicking the plus-minus button', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    instance.togglePositiveNegative()
    expect(instance.entry).toBe('0')
  })

  it('Should not toggle negative sign when the entry is "0," upon clicking the plus-minus button', () => {
    const instance = wrapper.vm
    instance.entry = '0,'
    instance.togglePositiveNegative()
    expect(instance.entry).toBe('0,')
  })
})

describe('On click of enter button', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should push entry in entryList when click of enter', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.processEnterClick()
    expect(instance.entryList).toEqual(['24'])
  })

  it('Should push clean entry in entryList when click of enter', () => {
    const instance = wrapper.vm
    instance.entry = '2,00'
    instance.processEnterClick()
    expect(instance.entryList).toEqual(['2'])
  })

  it('Should push a entry negative in entryList at click of enter when entry is negative number', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.togglePositiveNegative()
    instance.processEnterClick()
    expect(instance.entryList).toEqual(['-24'])
  })

  it('Should push a entry negative in entryList at click of enter when entry is floating number', () => {
    const instance = wrapper.vm
    instance.entry = '24,8'
    instance.processEnterClick()
    expect(instance.entryList).toEqual(['24,8'])
  })

  it('Should push a entry negative in entryList at click of enter when entry is negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '24,8'
    instance.togglePositiveNegative()
    instance.processEnterClick()
    expect(instance.entryList).toEqual(['-24,8'])
  })

  it('Should delete decimal point in last position of entry on push entry in entryList', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.processComaClick()
    instance.processEnterClick()
    expect(instance.entryList).toEqual(['24'])
  })

  it('Should not change entry when click of enter', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.processEnterClick()
    expect(instance.entry).toBe('24')
  })

  it('Should replace entry with the new digit when a digit button is clicked after an entry in entryList', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.processEnterClick()
    expect(instance.entryList).toEqual(['24'])
    expect(instance.entry).toBe('24')
    instance.processDigitClick('8')
    expect(instance.entry).toBe('8')
  })

  it('Should concat decimal point with current entry when a decimal point button is clicked after a click in enter', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.processEnterClick()
    instance.processComaClick()
    expect(instance.entry).toBe('24,')
  })

  it('Should not concat entry with the digit clicked when entry lenght is already 12 digits after an entry in entryList', () => {
    const instance = wrapper.vm
    instance.entry = '222244446666'
    instance.processEnterClick()
    expect(instance.entryList).toEqual(['222244446666'])
    expect(instance.entry).toBe('222244446666')
    instance.processDigitClick('8')
    expect(instance.entry).toBe('8')
  })

  it('Should not change entry at click to button "," when entry length is already 12 digits after an entry in entryList', () => {
    const instance = wrapper.vm
    instance.entry = '222244446666'
    instance.processEnterClick()
    expect(instance.entryList).toEqual(['222244446666'])
    expect(instance.entry).toBe('222244446666')
    instance.processComaClick()
    expect(instance.entry).toBe('222244446666')
  })
})
