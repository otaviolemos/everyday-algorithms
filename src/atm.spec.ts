import { ATM } from './atm'

describe('ATM', () => {
  it('should return correct solutions for a given withdrawal ammount', () => {
    const bills = [200, 100, 50, 20, 10].sort((a, b) => b - a)
    const ammounts = [10, 10, 10, 10, 10]
    const initialVariation = new Array(5).fill(0)
    const withdrawAmmount = 180
    const result = ATM.solutions(bills, ammounts, initialVariation, withdrawAmmount, 0)
    expect(result.length).toEqual(25)
    const totals: number[] = new Array(result.length).fill(0)
    let grandTotal = 0
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < bills.length; j++) {
        totals[i] += result[i][j] * bills[j]
      }
      grandTotal += totals[i]
    }
    expect(grandTotal / result.length).toEqual(withdrawAmmount)
  })

  it('should return two configurations: one with higher bills, another with lower bills', () => {
    const bills = [10, 20, 50, 100, 200]
    const billAmmounts = [10, 10, 10, 10, 10]
    const atm = new ATM(bills, billAmmounts)
    const configurations = atm.getConfigurations(300)
    const higherBills = arraySummation(configurations.moreHigherBills)
    const lowerBills = arraySummation(configurations.moreLowerBills)
    expect(higherBills).toBeLessThan(lowerBills)
  })

  function arraySummation (array: number[]): number {
    return array.reduce((a: number, b: number) => a + b, 0)
  }
})
