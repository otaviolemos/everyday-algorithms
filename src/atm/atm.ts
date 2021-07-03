export class ATM {
  private readonly bills: number[]
  private readonly billAmmounts: number[]

  constructor (bills: number[], billAmmounts: number[]) {
    this.bills = bills.sort((a, b) => b - a)
    this.billAmmounts = billAmmounts
  }

  public getConfigurations (ammount: number): Configurations {
    const billsCopy = [...this.bills]
    const billAmmountsCopy = [...this.billAmmounts]
    const initialVariation = new Array(5).fill(0)
    const allSolutions = ATM.solutions(billsCopy, billAmmountsCopy, initialVariation, ammount, 0)
    const configurations: Configurations = {
      moreHigherBills: allSolutions[0],
      moreLowerBills: allSolutions[allSolutions.length - 1]
    }
    return configurations
  }

  public static solutions (bills: number[], ammounts: number[], variation: number[], ammount: number, position: number):
  number[][] {
    const list: number[][] = []
    const value: number = ATM.compute(bills, variation)
    if (value < ammount) {
      for (let i = position; i < bills.length; i++) {
        if (ammounts[i] > variation[i]) {
          const newvariation: number[] = [...variation]
          newvariation[i]++
          const newList = ATM.solutions(bills, ammounts, newvariation, ammount, i)
          if (newList != null) {
            list.push(...newList)
          }
        }
      }
    } else if (value === ammount) {
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
}

export interface Configurations {
  moreHigherBills: number[]
  moreLowerBills: number[]
}
