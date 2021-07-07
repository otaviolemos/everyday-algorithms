import { InvalidParamError } from './invalid-param-error'

export class ATM {
  private readonly bills: number[]
  private readonly billAmmounts: number[]

  constructor (bills: number[], billAmounts: number[]) {
    if (!ATM.isDescending(bills)) {
      throw new InvalidParamError()
    }
    this.bills = bills.sort((a, b) => b - a)
    this.billAmmounts = billAmounts
  }

  public getConfigurations (amount: number): Configurations {
    const billsCopy = [...this.bills]
    const billAmountsCopy = [...this.billAmmounts]
    const initialVariation = new Array(5).fill(0)
    const allSolutions = ATM.solutions(billsCopy, billAmountsCopy, initialVariation, amount, 0)
    const configurations: Configurations = {
      moreHigherBills: allSolutions[0],
      moreLowerBills: allSolutions[allSolutions.length - 1]
    }
    return configurations
  }

  public static solutions (bills: number[], amounts: number[], variation: number[], amount: number, position: number):
  number[][] {
    const list: number[][] = []
    const value: number = ATM.compute(bills, variation)
    if (value < amount) {
      for (let i = position; i < bills.length; i++) {
        if (amounts[i] > variation[i]) {
          const newvariation: number[] = [...variation]
          newvariation[i]++
          const newList = ATM.solutions(bills, amounts, newvariation, amount, i)
          if (newList != null) {
            list.push(...newList)
          }
        }
      }
    } else if (value === amount) {
      list.push(ATM.myCopy(variation))
    }
    return list
  }

  private static compute (bills: number[], variation: number[]): number {
    var ret: number = 0
    for (let i = 0; i < variation.length; i++) {
      ret += bills[i] * variation[i]
    }
    return ret
  }

  public static myCopy (ar: number[]): number[] {
    var ret: number[] = []
    for (let i = 0; i < ar.length; i++) {
      ret[i] = ar[i]
    }
    return ret
  }

  private static isDescending (array: number[]): boolean {
    return array.every(function (x, i) {
      return i === 0 || x < array[i - 1]
    })
  }
}

export interface Configurations {
  moreHigherBills: number[]
  moreLowerBills: number[]
}
