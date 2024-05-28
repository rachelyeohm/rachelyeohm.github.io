
export class Term {
    coefficient: number;
    variable: string;
  
    constructor(coefficient: number, variable: string) {
      this.coefficient = coefficient;
      this.variable = variable;
    }
  
    multiply(multiplier: number): Term {
      return new Term(this.coefficient * multiplier, this.variable);
    }

    copy() : Term{
      return new Term(this.coefficient, this.variable);
    }

    add(term: Term) : Term {
      if (this.variable == term.variable) {
        return new Term(this.coefficient + term.coefficient, this.variable)
      } else {
        return this
      }
      
    }

    addTermToTermArray(terms : Term[]) : Term[] {
      let isVariableInArray = false;
      for (let i = 0; i < terms.length; i++) {
        if (this.variable == terms[i].variable) {
          terms[i] = this.add(terms[i])
          isVariableInArray = true;
        }
      }
      if (!isVariableInArray) {
        terms.push(this)
      }
      return terms
    }
  
    toString(): string {
      const coeffStr = this.coefficient === 1 && this.variable !== '1' ? '' : `${this.coefficient}`;
      const varStr = this.variable === '1' ? '' : this.variable;
      return `${coeffStr}${varStr}`;
    }
  }