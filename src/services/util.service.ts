import { Injectable } from '@nestjs/common'

@Injectable()
export class UtilService {
  public getEnumValues<T>(enumObj: T): Array<T[keyof T]> {
    return Object.keys(enumObj).map((key) => enumObj[key as keyof T])
  }

  public getEnumKeys<T>(enumObj: T): Array<keyof T> {
    return Object.keys(enumObj) as Array<keyof T>
  }

  public arraysEqual<T>(...arrays: T[][]): boolean {
    if (arrays.length < 2) {
      // If there are less than two arrays, they are considered equal.
      return true
    }

    const sortedArrays = arrays.map((arr) => [...arr].sort())

    const firstArray = sortedArrays[0]

    for (let i = 0; i < firstArray.length; i++) {
      for (let j = 1; j < sortedArrays.length; j++) {
        const currentArray = sortedArrays[j]
        if (
          i >= currentArray.length ||
          JSON.stringify(firstArray[i]) !== JSON.stringify(currentArray[i])
        ) {
          return false
        }
      }
    }

    // If all elements are equal up to the length of the first array,
    // and the lengths of all arrays are the same, they are equal.
    return true
  }
}
