import { ATM } from './atm'

describe('ATM', () => {
  it('should return correct solutions for a given withdrawal ammount', () => {
    const bills = [100, 50, 20, 10]
    const billAmmounts = [10, 10, 10, 10]
    const initialVariation = new Array(4).fill(0)
    const withdrawAmmount = 300
    const result = ATM.solutions(bills, billAmmounts, initialVariation, withdrawAmmount, 0)

    const totals: number[] = new Array(result.length).fill(0)
    let grandTotal = 0
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < bills.length; j++) {
        totals[i] += result[i][j] * bills[j]
      }
      grandTotal += totals[i]
    }
    expect(grandTotal / result.length).toEqual(withdrawAmmount)

    var foundHigherBillsConfiguration = false
    var foundLowerBillsConfiguration = false

    for (let i = 0; i < result.length; i++) {
      if (areEquals(result[i], [2, 2, 0, 0])) {
        foundHigherBillsConfiguration = true
      } else if (areEquals(result[i], [1, 3, 2, 1])) {
        foundLowerBillsConfiguration = true
      }
      if (foundHigherBillsConfiguration && foundLowerBillsConfiguration) {
        break
      }
    }

    expect(foundHigherBillsConfiguration && foundLowerBillsConfiguration).toBeTruthy()
  })

  it('should return two configurations: one with more higher bills, another with more lower bills', () => {
    const bills = [10, 20, 50, 100, 200]
    const billAmmounts = [10, 10, 10, 10, 10]
    const atm = new ATM(bills, billAmmounts)
    const configurations = atm.getConfigurations(300)
    const higherBills = summation(configurations.moreHigherBills)
    const lowerBills = summation(configurations.moreLowerBills)
    expect(higherBills).toBeLessThan(lowerBills)
  })

  function summation (array: number[]): number {
    return array.reduce((a: number, b: number) => a + b, 0)
  }

  function areEquals (arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) {
      return false
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false
      }
    }

    return true
  }
})
