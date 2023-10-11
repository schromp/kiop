interface Term {
  freeVariables(): string[] // TODO: abstraction implementation throws up questions how reduce works on abstractions
}

class Variable implements Term {
  varname: string;

  freeVariables(): string[] {
    return [this.varname]
  }

  constructor(varname: string) {
    this.varname = varname
  }

}

class Abstraction implements Term {
  header: string;
  body: Term;

  freeVariables(): string[] {
    return this.body.freeVariables().filter((element) => element !== this.header)
  }

  constructor(header: string, body: Term) {
    this.header = header
    this.body = body
  }
}

class Application implements Term {
  left: Term;
  right: Term;

  reduce() {
    // TODO: implementation

    var result: Term;

    if (this.left instanceof Application) this.left.reduce()
    if (this.right instanceof Application) this.right.reduce()

    if (this.left instanceof Abstraction && this.right instanceof Variable) {
      result = this.left.body // FIX: replace the variables in body - beta reduction
    }


    // if left abstraction and right variable
    // reduce to body and replace header var

    return result;
  }

  freeVariables(): string[] {
    return this.left.freeVariables().concat(this.right.freeVariables())
  }

  constructor(left: Term, right: Term) {
    this.left = left;
    this.right = right;
  }
}

const varia = new Variable("y")

const abs = new Abstraction("x", varia)

const app = new Application(varia, abs)

console.log(abs.freeVariables())