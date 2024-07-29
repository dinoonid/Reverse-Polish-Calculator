import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Calculator from '../CalculatorPolishReverse.vue'

describe('At initialisation', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should initialize settings with default values', () => {
    const instance = wrapper.vm
    expect(instance.entry).toBe('')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    expect(instance.operationInProgress).toBe(false)
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should set entry to 2 when a calculator is enabled', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    instance.handleButtonClick('2')
    expect(instance.entry).toBe('2')
  })
})

describe('On click of digits ', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should entry remain 0 when button (0) is clicked and entry is initially 0', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    instance.handleButtonClick('0')
    expect(instance.entry).toBe('0')
  })

  it('Should update entry to 2 when button (2) is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    instance.handleButtonClick('2')
    expect(instance.entry).toBe('2')
  })

  it('Should update entry to 24 when button (2) is clicked followed by button (4)', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    instance.handleButtonClick('2')
    expect(instance.entry).toBe('2')
    instance.handleButtonClick('4')
    expect(instance.entry).toBe('24')
  })

  it('Should update entry to 6,2 when button (6) is clicked followed by button (,) and followed by button (2)', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    instance.handleButtonClick('6')
    expect(instance.entry).toBe('6')
    instance.handleButtonClick('coma')
    expect(instance.entry).toBe('6,')
    instance.handleButtonClick('2')
    expect(instance.entry).toBe('6,2')
  })

  it('Should update entry to 0,5 when button (,) is clicked followed by button (5)', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    instance.handleButtonClick('coma')
    expect(instance.entry).toBe('0,')
    instance.handleButtonClick('5')
    expect(instance.entry).toBe('0,5')
  })

  it('Should entry remain 3,8 when button (,) is clicked and entry already contains a comma', () => {
    const instance = wrapper.vm
    instance.entry = '3,8'
    instance.handleButtonClick('coma')
    expect(instance.entry).toBe('3,8')
  })

  it('Should entry not contain more than 12 digits', () => {
    const instance = wrapper.vm
    instance.entry = '222244446666'
    instance.concatMode = true
    instance.handleButtonClick('8')
    expect(instance.entry).toBe('222244446666')
  })

  it('Should entry not contain more than 12 digits plus one comma', () => {
    const instance = wrapper.vm
    instance.entry = '2222,44446666'
    instance.concatMode = true
    instance.handleButtonClick('8')
    expect(instance.entry).toBe('2222,44446666')
  })

  it('Should entry not contain more than 12 digits plus one comma and one plus/minus sign', () => {
    const instance = wrapper.vm
    instance.entry = '-2222,44446666'
    instance.concatMode = true
    instance.handleButtonClick('8')
    expect(instance.entry).toBe('-2222,44446666')
  })
})

describe('On click of clear buttons', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should click of (CA) button reset all settings to their initial values', () => {
    const instance = wrapper.vm
    instance.entry = '60'
    instance.entryList = ['20', '40']
    instance.concatMode = true
    instance.operationInProgress = true
    instance.hasEntryError = true
    instance.handleButtonClick('clearall')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual([])
    expect(instance.concatMode).toBe(false)
    expect(instance.operationInProgress).toBe(false)
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should click of (C) button reset entry, concatMode, operationInProgress and hasEntryError to their initial values', () => {
    const instance = wrapper.vm
    instance.entry = '60'
    instance.entryList = ['20', '40']
    instance.concatMode = true
    instance.operationInProgress = true
    instance.hasEntryError = true
    instance.handleButtonClick('clear')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.concatMode).toBe(false)
    expect(instance.operationInProgress).toBe(false)
    expect(instance.hasEntryError).toBe(false)
  })
})

describe('behavior of concatMode property', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should concatMode remain false when concatMode is false and button (0) is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('0')
    expect(instance.entry).toBe('0')
    expect(instance.concatMode).toBe(false)
  })

  it('Should set concatMode to true when concatMode is false and button (,) is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('coma')
    expect(instance.entry).toBe('0,')
    expect(instance.concatMode).toBe(true)
  })

  it('Should set concatMode to true when concatMode is false and button (2) is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    expect(instance.concatMode).toBe(false)
    instance.handleButtonClick('2')
    expect(instance.entry).toBe('2')
    expect(instance.concatMode).toBe(true)
  })

  it('Should concatMode remain true when concatMode is true and button (4) is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '2'
    instance.concatMode = true
    instance.handleButtonClick('4')
    expect(instance.entry).toBe('24')
    expect(instance.concatMode).toBe(true)
  })
})

describe('behavior of hasEntryError property', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should set hasEntryError to false and reset entry when clicking the (enter) button', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.handleButtonClick('enter')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should set hasEntryError to false and reset entry when clicking the (,) button', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.handleButtonClick('coma')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should set hasEntryError to false and reset entry when clicking a digit button', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.handleButtonClick('5')
    expect(instance.entry).toBe('5')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should set hasEntryError to false and reset entry when clicking the (±) button', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.handleButtonClick('plusminus')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should set hasEntryError to false and reset entry when clicking the (+) button', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.handleButtonClick('add')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should set hasEntryError to false and reset entry when clicking the (-) button', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.handleButtonClick('subtract')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should set hasEntryError to false and reset entry when clicking the (×) button', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.handleButtonClick('multiply')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should set hasEntryError to false and reset entry when clicking the (÷) button', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.handleButtonClick('divide')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should set hasEntryError to false and reset entry when clicking the swap button', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.handleButtonClick('swap')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should set hasEntryError to false and reset entry when clicking the (%) button', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.handleButtonClick('percent')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })

  it('Should set hasEntryError to false and reset entry when clicking the (xʸ) button', () => {
    const instance = wrapper.vm
    instance.entry = '99999999999+'
    instance.entryList = ['20', '40']
    instance.hasEntryError = true
    instance.handleButtonClick('power')
    expect(instance.entry).toBe('0')
    expect(instance.entryList).toEqual(['20', '40'])
    expect(instance.hasEntryError).toBe(false)
  })
})

describe('behavior of (±) button', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should click of (±) button toggle the sign of the number between positive and negative', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.handleButtonClick('plusminus')
    expect(instance.entry).toBe('-24')
    instance.handleButtonClick('plusminus')
    expect(instance.entry).toBe('24')
  })

  it('Should not toggle the negative sign when entry is 0 upon clicking the (±) button', () => {
    const instance = wrapper.vm
    instance.entry = '0'
    instance.handleButtonClick('plusminus')
    expect(instance.entry).toBe('0')
  })
})

describe('behavior of (enter) button', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Should add a new entry at the beginning of entryList when clicking the (enter) button', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.handleButtonClick('enter')
    expect(instance.entryList).toEqual(['24'])
  })

  it('Should add a cleaned version of entry to entryList when clicking the (enter) button', () => {
    const instance = wrapper.vm
    instance.entry = '2,00'
    instance.handleButtonClick('enter')
    expect(instance.entryList).toEqual(['2'])
  })

  it('Should add a negative entry to entryList when clicking the (enter) button if entry is a negative number', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.handleButtonClick('plusminus')
    instance.handleButtonClick('enter')
    expect(instance.entryList).toEqual(['-24'])
  })

  it('Should push a entry negative in entryList at clicking the (enter) button when entry is floating number', () => {
    const instance = wrapper.vm
    instance.entry = '24,8'
    instance.handleButtonClick('enter')
    expect(instance.entryList).toEqual(['24,8'])
  })

  it('Should add a negative floating-point entry to entryList when clicking the (enter) button if entry is a negative floating-point number', () => {
    const instance = wrapper.vm
    instance.entry = '24,8'
    instance.handleButtonClick('plusminus')
    instance.handleButtonClick('enter')
    expect(instance.entryList).toEqual(['-24,8'])
  })

  it('Should remove trailing comma from entry before adding it to entryList when the trailing character is a comma', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.handleButtonClick('coma')
    instance.handleButtonClick('enter')
    expect(instance.entryList).toEqual(['24'])
  })

  it('Should not change entry when clicking the (enter) button', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.handleButtonClick('enter')
    expect(instance.entry).toBe('24')
  })

  it('Should replace entry with the new digit when a digit button is clicked after adding entry to entryList', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.handleButtonClick('enter')
    expect(instance.entryList).toEqual(['24'])
    expect(instance.entry).toBe('24')
    instance.handleButtonClick('8')
    expect(instance.entry).toBe('8')
  })

  it('Should concatenate a coma with the current entry when (,) button is clicked after adding entry to entryList', () => {
    const instance = wrapper.vm
    instance.entry = '24'
    instance.handleButtonClick('enter')
    instance.handleButtonClick('coma')
    expect(instance.entry).toBe('24,')
  })

  it('Should not concatenate a digit to entry when its length is already 12 digits after adding entry to entryList', () => {
    const instance = wrapper.vm
    instance.entry = '222244446666'
    instance.handleButtonClick('enter')
    expect(instance.entryList).toEqual(['222244446666'])
    expect(instance.entry).toBe('222244446666')
    instance.handleButtonClick('8')
    expect(instance.entry).toBe('8')
  })

  it('Should not change entry when clicking the (,) button if entry length is already 12 digits after adding entry to entryList', () => {
    const instance = wrapper.vm
    instance.entry = '222244446666'
    instance.handleButtonClick('enter')
    expect(instance.entryList).toEqual(['222244446666'])
    expect(instance.entry).toBe('222244446666')
    instance.handleButtonClick('coma')
    expect(instance.entry).toBe('222244446666')
  })
})

describe('behavior of swap button', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Clicking the swap button has no effect when entryList is empty', () => {
    const instance = wrapper.vm
    instance.entry = '60'
    instance.entryList = []
    instance.handleButtonClick('swap')
    expect(instance.entry).toBe('60')
    expect(instance.entryList).toEqual([])
  })

  it('Should swap entry with the first item from entryList when the swap button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '60'
    instance.entryList = ['20', '40']
    instance.handleButtonClick('swap')
    expect(instance.entry).toBe('20')
    expect(instance.entryList).toEqual(['60', '40'])
  })
})

describe('behavior of (%) button', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Clicking the percent button has no effect when entryList is empty', () => {
    const instance = wrapper.vm
    instance.entry = '60'
    instance.entryList = []
    instance.handleButtonClick('percent')
    expect(instance.entry).toBe('60')
    expect(instance.entryList).toEqual([])
  })

  it('Should set entry to the result after percentage calculation', () => {
    const instance = wrapper.vm
    instance.entry = '50'
    instance.entryList = ['500']
    instance.handleButtonClick('percent')
    expect(instance.entry).toBe('250')
  })

  it('Should remove the first item from entryList after percentage calculation when the percent button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '50'
    instance.entryList = ['500']
    instance.handleButtonClick('percent')
    expect(instance.entry).toBe('250')
    expect(instance.entryList).toEqual([])
  })

  it('Should set entry to the result after percentage calculation of two positive floating numbers', () => {
    const instance = wrapper.vm
    instance.entry = '10,2'
    instance.entryList = ['362,4']
    instance.handleButtonClick('percent')
    expect(instance.entry).toBe('36,9648')
  })

  it('Should set entry to the result after percentage calculation of two negative floating numbers', () => {
    const instance = wrapper.vm
    instance.entry = '-10,2'
    instance.entryList = ['-362,4']
    instance.handleButtonClick('percent')
    expect(instance.entry).toBe('36,9648')
  })

  it('Should set entry to the result after percentage calculation of positive floating number and a negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-10,2'
    instance.entryList = ['362,4']
    instance.handleButtonClick('percent')
    expect(instance.entry).toBe('-36,9648')
  })

  it('Should set entry to the result after percentage calculation of negative floating number and a positive floating number', () => {
    const instance = wrapper.vm
    instance.entry = '10,2'
    instance.entryList = ['-362,4']
    instance.handleButtonClick('percent')
    expect(instance.entry).toBe('-36,9648')
  })
})

describe('behavior of (xʸ) button', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  it('Clicking the (xʸ) button has no effect when entryList is empty', () => {
    const instance = wrapper.vm
    instance.entry = '60'
    instance.entryList = []
    instance.handleButtonClick('power')
    expect(instance.entry).toBe('60')
    expect(instance.entryList).toEqual([])
  })

  it('Should set entry to the result after power calculation', () => {
    const instance = wrapper.vm
    instance.entry = '3'
    instance.entryList = ['2']
    instance.handleButtonClick('power')
    expect(instance.entry).toBe('8')
  })

  it('Should remove the first item from entryList after power calculation when the (xʸ) button is clicked', () => {
    const instance = wrapper.vm
    instance.entry = '5'
    instance.entryList = ['4']
    instance.handleButtonClick('power')
    expect(instance.entry).toBe('1024')
    expect(instance.entryList).toEqual([])
  })

  it('Should set entry to the result after power calculation of two negative numbers', () => {
    const instance = wrapper.vm
    instance.entry = '2'
    instance.entryList = ['4']
    instance.handleButtonClick('power')
    expect(instance.entry).toBe('16')
  })

  it('Should set entry to the result after power calculation of two negative numbers', () => {
    const instance = wrapper.vm
    instance.entry = '-2'
    instance.entryList = ['-4']
    instance.handleButtonClick('power')
    expect(instance.entry).toBe('0,0625')
  })

  it('Should set entry to the result after power calculation of two positive floating numbers', () => {
    const instance = wrapper.vm
    instance.entry = '2,4'
    instance.entryList = ['4,8']
    instance.handleButtonClick('power')
    expect(instance.entry).toBe('43,1498181431')
  })

  it('Should set entry to the result after power calculation of two negative floating numbers', () => {
    const instance = wrapper.vm
    instance.entry = '-2,4'
    instance.entryList = ['-4,8']
    instance.handleButtonClick('power')
    expect(instance.entry).toBe('NaN')
  })

  it('Should set entry to the result after power calculation of positive floating number and a negative floating number', () => {
    const instance = wrapper.vm
    instance.entry = '-2,4'
    instance.entryList = ['4,8']
    instance.handleButtonClick('power')
    expect(instance.entry).toBe('0,0231750687')
  })

  it('Should set entry to the result after power calculation of negative floating number and a positive floating number', () => {
    const instance = wrapper.vm
    instance.entry = '2,4'
    instance.entryList = ['-4,8']
    instance.handleButtonClick('percent')
    expect(instance.entry).toBe('-0,1152')
  })
})
