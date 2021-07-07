import { ATM } from './atm'
import { InvalidParamError } from './invalid-param-error'

describe('ATM', () => {
  it('should return correct solutions for a given withdrawal amount', () => {
    const bills = [100, 50, 20, 10]
    const billAmounts = [10, 10, 10, 10]
    const initialVariation = new Array(4).fill(0)
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
    const unoreredBills = [200, 100, 50, 20, 10]
    const billAmounts = [10, 10, 10, 10]
    expect(() => {
      const a = new ATM(unoreredBills, billAmounts)
      console.log(a)
    }).toThrow(InvalidParamError)
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
