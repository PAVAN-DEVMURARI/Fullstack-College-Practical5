import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const toggleSign = () => {
    if (display !== '0') {
      if (display.charAt(0) === '-') {
        setDisplay(display.slice(1))
      } else {
        setDisplay('-' + display)
      }
    }
  }

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="operation-display">
          {previousValue !== null && operation && (
            <span>{previousValue} {operation}</span>
          )}
        </div>
        <div className="display-value">{display}</div>
      </div>
      
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button className="key key-clear" onClick={clear}>AC</button>
            <button className="key key-backspace" onClick={handleBackspace}>⌫</button>
            <button className="key key-sign" onClick={toggleSign}>±</button>
          </div>
          
          <div className="digit-keys">
            <button className="key key-0" onClick={() => inputNumber(0)}>0</button>
            <button className="key key-dot" onClick={inputDecimal}>.</button>
            
            <button className="key key-1" onClick={() => inputNumber(1)}>1</button>
            <button className="key key-2" onClick={() => inputNumber(2)}>2</button>
            <button className="key key-3" onClick={() => inputNumber(3)}>3</button>
            
            <button className="key key-4" onClick={() => inputNumber(4)}>4</button>
            <button className="key key-5" onClick={() => inputNumber(5)}>5</button>
            <button className="key key-6" onClick={() => inputNumber(6)}>6</button>
            
            <button className="key key-7" onClick={() => inputNumber(7)}>7</button>
            <button className="key key-8" onClick={() => inputNumber(8)}>8</button>
            <button className="key key-9" onClick={() => inputNumber(9)}>9</button>
          </div>
        </div>
        
        <div className="operator-keys">
          <button className="key key-divide" onClick={() => performOperation('/')}>÷</button>
          <button className="key key-multiply" onClick={() => performOperation('*')}>×</button>
          <button className="key key-subtract" onClick={() => performOperation('-')}>−</button>
          <button className="key key-add" onClick={() => performOperation('+')}>+</button>
          <button className="key key-equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
