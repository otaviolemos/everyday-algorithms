import { ATM } from './atm'
import { InvalidParamError } from './invalid-param-error'
import sinon from 'sinon'
import { performance } from 'perf_hooks'

describe('ATM', () => {
  it('should return correct solutions for a given withdrawal amount', () => {
    const bills = [100, 50, 20, 10]
    const billAmounts = [10, 10, 10, 10]
    const initialVariation = new Array(bills.length).fill(0)
    const withdrawalAmount = 300
    const result = ATM.solutions(bills, billAmounts, initialVariation, withdrawalAmount, 0)

    expect(result.some(element => areEquals(element, [2, 2, 0, 0]))).toBeTruthy()
    expect(result.some(element => areEquals(element, [1, 3, 2, 1]))).toBeTruthy()
  })

  it('should return two configurations: one with more higher bills, another with more lower bills', () => {
    const bills = [200, 100, 50, 20, 10]
    const billAmounts = [10, 10, 10, 10, 10]
    const atm = new ATM(bills, billAmounts)
    const configurations = atm.getConfigurations(300)
    const higherBills = summation(configurations.moreHigherBills)
    const lowerBills = summation(configurations.moreLowerBills)
    expect(higherBills).toBeLessThan(lowerBills)
  })

  it('should throw when bills are not in descending order', () => {
    const unoreredBills = [200, 100, 20, 50, 10]
    const billAmounts = [10, 10, 10, 10, 10]
    expect(() => {
      const a = new ATM(unoreredBills, billAmounts)
      console.log(a)
    }).toThrow(InvalidParamError)
  })

  it('should throw when bills and bill amounts are not the same size', () => {
    const bills = [200, 100, 50, 20, 10]
    const billAmounts = [10, 10, 10, 10]
    expect(() => {
      const a = new ATM(bills, billAmounts)
      console.log(a)
    }).toThrow(InvalidParamError)
  })

  test('performance test', () => {
    const bills = [100, 50, 20, 10, 5, 2]
    const billAmounts = [100, 100, 100, 100, 100, 100]
    const initialVariation = new Array(bills.length).fill(0)
    const withdrawalAmount = 4053
    const spy = sinon.spy(ATM, 'solutions')
    const t0 = performance.now()
    const result = ATM.solutions(bills, billAmounts, initialVariation, withdrawalAmount, 0)
    const t1 = performance.now()
    console.log(result)
    console.log(spy.callCount)
    console.log('Time taken to run all solutions: ' + `${t1 - t0}`)
  })

  function summation (array: number[]): number {
    return array.reduce((a: number, b: number) => a + b, 0)
  }

  function areEquals (arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false
    }
    return true
  }
})
