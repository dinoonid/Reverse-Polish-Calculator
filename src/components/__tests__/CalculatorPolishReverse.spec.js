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
  })
})

describe('On click of digits ', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should entry must be 2 when "2" is clicked', () => {
    const instance = wrapper.vm
    expect(instance.entry).toBe('0')
    instance.updateEntry('2')
    expect(instance.entry).toBe('2')
  })

  it('Should entry must be 24 when "2" "4" are clicked', () => {
    const instance = wrapper.vm
    expect(instance.entry).toBe('0')
    instance.updateEntry('2')
    expect(instance.entry).toBe('2')
    instance.updateEntry('4')
    expect(instance.entry).toBe('24')
  })

  it('Should entry must be 6,2 when "6" "," "2" are clicked', () => {
    const instance = wrapper.vm
    expect(instance.entry).toBe('0')
    instance.updateEntry('6')
    expect(instance.entry).toBe('6')
    instance.updateEntry(',')
    expect(instance.entry).toBe('6,')
    instance.updateEntry('2')
    expect(instance.entry).toBe('6,2')
  })

  it('Should entry must be 0,5 when "," "5" are clicked', () => {
    const instance = wrapper.vm
    expect(instance.entry).toBe('0')
    instance.updateEntry(',')
    expect(instance.entry).toBe('0,')
    instance.updateEntry('5')
    expect(instance.entry).toBe('0,5')
  })

  it('Should entry must be 3,48 when "3" "," "8" "," are clicked', () => {
    const instance = wrapper.vm
    instance.updateEntry('3')
    expect(instance.entry).toBe('3')
    instance.updateEntry(',')
    expect(instance.entry).toBe('3,')
    instance.updateEntry('8')
    expect(instance.entry).toBe('3,8')
    instance.updateEntry(',')
    expect(instance.entry).toBe('3,8')
  })

  it('Should entry must not contain more than 12 digits', () => {
    const instance = wrapper.vm
    instance.entry = '22224444666'
    instance.updateEntry('6')
    expect(instance.entry).toBe('222244446666')
    instance.updateEntry('0')
    expect(instance.entry).toBe('222244446666')
  })

  it('Should entry must not contain more than 12 digits plus decimal point', () => {
    const instance = wrapper.vm
    instance.entry = '2222,4444666'
    instance.updateEntry('6')
    expect(instance.entry).toBe('2222,44446666')
    instance.updateEntry('0')
    expect(instance.entry).toBe('2222,44446666')
  })

  // it('Should entry must not contain more than 12 digits plus decimal point and plusminus', () => {
  //   const instance = wrapper.vm
  //   instance.entry = '-2222,4444666'
  //   instance.updateEntry('6')
  //   expect(instance.entry).toBe('-2222,44446666')
  //   instance.updateEntry('0')
  //   expect(instance.entry).toBe('-2222,44446666')
  // })
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
    instance.resetAll()
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual([])
  })

  it('Should click of clear must be initialized entry', () => {
    const instance = wrapper.vm
    instance.entry = '60'
    instance.entryList = ['20', '40']
    instance.reset()
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
  })

  it('Should click of clear must activate concatMode', () => {
    const instance = wrapper.vm
    instance.entry = '60'
    instance.pushEntry()
    instance.reset()
    instance.updateEntry('6')
    instance.updateEntry('8')
    expect(instance.entry).toBe('68')
  })

  it('Should click of clear all must activate concatMode', () => {
    const instance = wrapper.vm
    instance.entry = '60'
    instance.pushEntry()
    instance.resetAll()
    instance.updateEntry('6')
    instance.updateEntry('8')
    expect(instance.entry).toBe('68')
  })
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
    instance.pushEntry()
    expect(instance.entryList).toEqual(['24'])
  })

  it('Should push clean entry in entryList when click of enter', () => {
    const instance = wrapper.vm
    instance.entry = '2,00'
    instance.pushEntry()
    expect(instance.entryList).toEqual(['2'])
  })

  it('Should push a entry negative in entryList at click of enter when entry is negative number', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.togglePositiveNegative()
    instance.pushEntry()
    expect(instance.entryList).toEqual(['-24'])
  })

  it('Should push a entry negative in entryList at click of enter when entry is floating number', () => {
    const instance = wrapper.vm
    instance.entry = '24,8'
    instance.pushEntry()
    expect(instance.entryList).toEqual(['24,8'])
  })

  it('Should push a entry negative in entryList at click of enter when entry is negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '24,8'
    instance.togglePositiveNegative()
    instance.pushEntry()
    expect(instance.entryList).toEqual(['-24,8'])
  })

  it('Should delete decimal point in last position of entry on push entry in entryList', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.updateEntry(',')
    instance.pushEntry()
    expect(instance.entryList).toEqual(['24'])
  })

  it('Should not change entry when click of enter', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.pushEntry()
    expect(instance.entry).toBe('24')
  })

  it('Should replace entry with the new digit when a digit button is clicked after an entry in entryList', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.pushEntry()
    expect(instance.entryList).toEqual(['24'])
    expect(instance.entry).toBe('24')
    instance.updateEntry('8')
    expect(instance.entry).toBe('8')
  })

  it('Should concat decimal point with current entry when a decimal point button is clicked after a click in enter', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.pushEntry()
    instance.updateEntry(',')
    expect(instance.entry).toBe('24,')
  })

  it('Should not concat entry with the digit clicked when entry lenght is already 12 digits after an entry in entryList', () => {
    const instance = wrapper.vm
    instance.entry = '222244446666'
    instance.pushEntry()
    expect(instance.entryList).toEqual(['222244446666'])
    expect(instance.entry).toBe('222244446666')
    instance.updateEntry('8')
    expect(instance.entry).toBe('8')
  })

  it('Should not change entry at "," clicked when entry lenght is already 12 digits after an entry in entryList', () => {
    const instance = wrapper.vm
    instance.entry = '222244446666'
    instance.pushEntry()
    expect(instance.entryList).toEqual(['222244446666'])
    expect(instance.entry).toBe('222244446666')
    instance.updateEntry(',')
    expect(instance.entry).toBe('222244446666')
  })
})

describe('On click of add button', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Clicking the "+" button should have no effect when entryList is empty', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.add()
    expect(instance.entry).toBe('24')
  })

  it('Should set entry with the result of adding current entry to the first item in entryList when the "+" button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.pushEntry()
    expect(instance.entryList).toEqual(['24'])
    instance.add()
    expect(instance.entry).toBe('48')
  })

  it('Should set entry with the result of adding flotting number to the first item in entryList when the "+" button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '14,2'
    instance.pushEntry()
    expect(instance.entryList).toEqual(['14,2'])
    instance.add()
    expect(instance.entry).toBe('28,4')
  })

  it('Should set entry with the result of adding negative flotting number to the first item in entryList when the "+" button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '-14,2'
    instance.pushEntry()
    expect(instance.entryList).toEqual(['-14,2'])
    instance.add()
    expect(instance.entry).toBe('-28,4')
  })

  it('Entry should not contain more than 12 digits after the addition operation with Integer number', () => {
    const instance = wrapper.vm
    instance.entry = '999999999999'
    instance.entryList = ['999999999999']
    instance.add()
    expect(instance.entry).toBe('19999999999+')
  })

  it('Entry should not contain more than 12 digits after the addition operation with floating number', () => {
    const instance = wrapper.vm
    instance.entry = '9,99999999999'
    instance.entryList = ['9,99999999999']
    instance.add()
    expect(instance.entry).toBe('19,999999999+')
  })

  it('Entry should not contain more than 12 digits after the addition operation with negative Integer number', () => {
    const instance = wrapper.vm
    instance.entry = '-999999999999'
    instance.entryList = ['-999999999999']
    instance.add()
    expect(instance.entry).toBe('-19999999999+')
  })

  it('Entry should not contain more than 12 digits after the addition operation with negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-9,99999999999'
    instance.entryList = ['-9,99999999999']
    instance.add()
    expect(instance.entry).toBe('-19,999999999+')
  })

  it('Should push clean result in entry after the addition operation with positive floating number', () => {
    const instance = wrapper.vm
    instance.entry = '0,2'
    instance.entryList = ['0,1']
    instance.add()
    expect(instance.entry).toBe('0,3')
  })

  it('Should push clean result in entry after the addition operation with negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-0,2'
    instance.entryList = ['-0,1']
    instance.add()
    expect(instance.entry).toBe('-0,3')
  })
})
