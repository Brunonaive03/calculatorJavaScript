class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(this.currentOperand === "0" && !(number === "0" || number === ",")) {
            this.currentOperand = number

        }
        else if (((number !== "," || !(this.currentOperand.includes(",") || this.currentOperand === "")) && !(this.currentOperand === "0" && number === "0")) || (currentOperand === "0" && number === "," ) ) {
        this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand !== "") {

            if (this.previousOperand !== "") {
                this.compute()
            }
            this.operation = operation
            this.previousOperand = this.currentOperand
            this.currentOperand = ""
        }

    }

    compute() {
        let computation, prev, cur

        if (this.previousOperand.includes(",")) {
            prev = parseFloat(this.previousOperand.replace(",", "."))
        }
        else {
            prev = parseFloat(this.previousOperand)
        }

        if (this.currentOperand.includes(",")) {
            cur = parseFloat(this.currentOperand.replace(",", "."))
        }
        else {
            cur = parseFloat(this.currentOperand)
        }
        

        if(!(isNaN(prev) || isNaN(cur))) {
            switch (this.operation) {
                case "+":
                    computation = prev + cur
                    break

                case "-":
                    computation = prev - cur
                    break
                          
                case "*":
                    computation = prev * cur
                    break

                case "÷":
                    computation = prev / cur
                    break
                
                default:
                    return
            }
            console.log(computation)

            if (computation.toString().includes(".")) {
                computation = computation.toString().replace(".", ",")
            }


            this.currentOperand = computation
            this.operation = undefined
            this.previousOperand = ""
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        console.log(stringNumber)
        const intDigits = parseFloat(stringNumber.split(",")[0])
        const decDigits = stringNumber.split(",")[1]
        let integerDisplay

        if(isNaN(intDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = intDigits.toLocaleString("pt-BR")
        }
        
        if(decDigits != null) {
            return `${integerDisplay},${decDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ""
        }
        console.log(this.previousOperandTextElement.innerText)
    }
}

const numberButtons = document.querySelectorAll("[data-numero]")
const operationButtons = document.querySelectorAll("[data-operacao]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-anterior-resultado]")
const currentOperandTextElement = document.querySelector("[data-atual-resultado]")

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()      
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()   
    })

})

equalsButton.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()   
})

allClearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()   
})

deleteButton.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()   
})