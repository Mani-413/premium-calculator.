import React, { useState, useEffect } from 'react'
import './index.css'

const API_BASE = import.meta.env.VITE_API_BASE || 'https://eleven-corners-smell.loca.lt/api/calculator'

function App() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('0')
  const [history, setHistory] = useState([])
  const [mode, setMode] = useState('standard') // standard, scientific

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/history`)
      if (res.ok) {
        const data = await res.json()
        setHistory(data)
      }
    } catch (err) {
      console.error("Failed to fetch history:", err)
    }
  }

  const handleAction = async (value) => {
    if (value === '=') {
      try {
        const res = await fetch(`${API_BASE}/calculate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ expression })
        })
        const data = await res.json()
        if (data.status === 'success') {
          setResult(data.result.toString())
          fetchHistory()
        } else {
          setResult('Error')
        }
      } catch (err) {
        setResult('Error')
      }
    } else if (value === 'C') {
      setExpression('')
      setResult('0')
    } else if (value === 'CE') {
      setExpression(prev => prev.slice(0, -1))
    } else {
      // Prevent multiple operators
      const lastChar = expression.slice(-1)
      const operators = ['+', '-', '*', '/', '.', '^']
      if (operators.includes(value) && operators.includes(lastChar)) return
      
      setExpression(prev => prev + value)
    }
  }

  const clearHistory = async () => {
    try {
      await fetch(`${API_BASE}/history`, { method: 'DELETE' })
      setHistory([])
    } catch (err) {
      console.error("Failed to clear history:", err)
    }
  }

  const keys = mode === 'standard' 
    ? ['C', 'CE', '/', '*', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '.', '0', '=']
    : ['sin', 'cos', 'tan', 'log', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '(', ')', 'PI', 'E', 'C', '=']

  return (
    <div className="animate-in">
      <div className="calculator-container">
        <div className="main-calc">
          <div className="scientific-toggle">
            <button 
              className={`tab ${mode === 'standard' ? 'active' : ''}`}
              onClick={() => setMode('standard')}
            >Standard</button>
            <button 
              className={`tab ${mode === 'scientific' ? 'active' : ''}`}
              onClick={() => setMode('scientific')}
            >Scientific</button>
          </div>

          <div className="display">
            <div className="expression">{expression}</div>
            <div className="result">{result}</div>
          </div>

          <div className={`keypad ${mode === 'scientific' ? 'scientific' : ''}`}>
            {mode === 'standard' ? (
              <>
                <button onClick={() => handleAction('C')} className="btn accent">C</button>
                <button onClick={() => handleAction('CE')} className="btn accent">CE</button>
                <button onClick={() => handleAction('/')} className="btn operator">÷</button>
                <button onClick={() => handleAction('*')} className="btn operator">×</button>
                <button onClick={() => handleAction('7')} className="btn">7</button>
                <button onClick={() => handleAction('8')} className="btn">8</button>
                <button onClick={() => handleAction('9')} className="btn">9</button>
                <button onClick={() => handleAction('-')} className="btn operator">−</button>
                <button onClick={() => handleAction('4')} className="btn">4</button>
                <button onClick={() => handleAction('5')} className="btn">5</button>
                <button onClick={() => handleAction('6')} className="btn">6</button>
                <button onClick={() => handleAction('+')} className="btn operator">+</button>
                <button onClick={() => handleAction('1')} className="btn">1</button>
                <button onClick={() => handleAction('2')} className="btn">2</button>
                <button onClick={() => handleAction('3')} className="btn">3</button>
                <button onClick={() => handleAction('.')} className="btn">.</button>
                <button onClick={() => handleAction('0')} className="btn">0</button>
                <button onClick={() => handleAction('=')} className="btn equal">=</button>
              </>
            ) : (
              <>
                <button onClick={() => handleAction('sin(')} className="btn operator">sin</button>
                <button onClick={() => handleAction('cos(')} className="btn operator">cos</button>
                <button onClick={() => handleAction('tan(')} className="btn operator">tan</button>
                <button onClick={() => handleAction('log10(')} className="btn operator">log</button>
                <button onClick={() => handleAction('log(')} className="btn operator">ln</button>
                
                <button onClick={() => handleAction('asin(')} className="btn operator">asin</button>
                <button onClick={() => handleAction('acos(')} className="btn operator">acos</button>
                <button onClick={() => handleAction('atan(')} className="btn operator">atan</button>
                <button onClick={() => handleAction('^')} className="btn operator">xʸ</button>
                <button onClick={() => handleAction('sqrt(')} className="btn operator">√</button>

                <button onClick={() => handleAction('7')} className="btn">7</button>
                <button onClick={() => handleAction('8')} className="btn">8</button>
                <button onClick={() => handleAction('9')} className="btn">9</button>
                <button onClick={() => handleAction('/')} className="btn operator">÷</button>
                <button onClick={() => handleAction('(')} className="btn operator">(</button>
                
                <button onClick={() => handleAction('4')} className="btn">4</button>
                <button onClick={() => handleAction('5')} className="btn">5</button>
                <button onClick={() => handleAction('6')} className="btn">6</button>
                <button onClick={() => handleAction('*')} className="btn operator">×</button>
                <button onClick={() => handleAction(')')} className="btn operator">)</button>
                
                <button onClick={() => handleAction('1')} className="btn">1</button>
                <button onClick={() => handleAction('2')} className="btn">2</button>
                <button onClick={() => handleAction('3')} className="btn">3</button>
                <button onClick={() => handleAction('-')} className="btn operator">−</button>
                <button onClick={() => handleAction('pi')} className="btn operator">π</button>
                
                <button onClick={() => handleAction('0')} className="btn">0</button>
                <button onClick={() => handleAction('.')} className="btn">.</button>
                <button onClick={() => handleAction('+')} className="btn operator">+</button>
                <button onClick={() => handleAction('e')} className="btn operator">e</button>
                <button onClick={() => handleAction('abs(')} className="btn operator">abs</button>

                <button onClick={() => handleAction('C')} className="btn accent">C</button>
                <button onClick={() => handleAction('CE')} className="btn accent">CE</button>
                <button onClick={() => handleAction('=')} className="btn primary" style={{ gridColumn: 'span 3' }}>=</button>
              </>
            )}
          </div>
        </div>

        <div className="history-panel">
          <div className="history-title">
            <span>History</span>
            <button 
              onClick={clearHistory}
              style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}
            >Clear</button>
          </div>
          <div className="history-list">
            {history.map((item, i) => (
              <div 
                key={i} 
                className="history-item"
                onClick={() => {
                  const expr = item.split('=')[0].trim()
                  setExpression(expr)
                }}
              >
                {item}
              </div>
            ))}
            {history.length === 0 && (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '2rem' }}>
                No history yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
