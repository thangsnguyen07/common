interface Condition {
  [key: string]: any
}

export abstract class AbstractConditionBuilder {
  public abstract getConditions(): any[]

  protected pushCondition(column: string, condition: any) {
    const conditionMap: Condition = {}

    conditionMap[column] = condition

    this.getConditions().push(conditionMap)
  }

  protected removeCondition(columns: string[]) {
    const conditions = this.getConditions()

    conditions.filter((conditionObject) => {
      for (const col of columns) {
        if (conditionObject.hasOwnProperty(col)) {
          return false
        }
      }

      return true
    })

    return conditions
  }

  public add(column: string, condition: any): AbstractConditionBuilder {
    this.pushCondition(column, condition)

    return this
  }

  public remove(columns: string[]): AbstractConditionBuilder {
    this.removeCondition(columns)

    return this
  }

  public equal(column: string, value: any): AbstractConditionBuilder {
    if (value) {
      this.pushCondition(column, { equals: value })
    }

    return this
  }

  public notEqual(column: string, value: any): AbstractConditionBuilder {
    if (value) {
      this.pushCondition(column, { not: value })
    }

    return this
  }

  public in(column: string, values: any[]): AbstractConditionBuilder {
    if (values) {
      this.pushCondition(column, { in: values })
    }

    return this
  }

  public range(column: string, from?: any, to?: any) {
    if (from && to) {
      this.pushCondition(column, { gte: from, lte: to })
    }

    return this
  }

  public contains(column: string, value?: any): AbstractConditionBuilder {
    if (value) {
      this.pushCondition(column, { contains: value })
    }

    return this
  }

  public has(column: string, value?: any): AbstractConditionBuilder {
    if (value) {
      this.pushCondition(column, { has: value })
    }

    return this
  }
}

export class AndConditionBuilder extends AbstractConditionBuilder {
  private conditions = []

  public getConditions() {
    return this.conditions
  }
}

export class OrConditionBuilder extends AbstractConditionBuilder {
  private conditions = []

  public getConditions() {
    return this.conditions
  }
}

export class NotConditionBuilder extends AbstractConditionBuilder {
  private conditions = []

  public getConditions() {
    return this.conditions
  }
}
