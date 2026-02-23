import './App.css'
import { useState } from 'react'

function App() {
  const [amountDue, setAmountDue] = useState('')
  const [amountReceived, setAmountReceived] = useState('')
  const [changeDue, setChangeDue] = useState(0)
  const [twenties, setTwenties] = useState(0)
  const [tens, setTens] = useState(0)
  const [fives, setFives] = useState(0)
  const [ones, setOnes] = useState(0)
  const [quarters, setQuarters] = useState(0)
  const [dimes, setDimes] = useState(0)
  const [nickels, setNickels] = useState(0)
  const [pennies, setPennies] = useState(0)
  const [alertVariant, setAlertVariant] = useState('')

  const resetDenominations = () => {
    setTwenties(0)
    setTens(0)
    setFives(0)
    setOnes(0)
    setQuarters(0)
    setDimes(0)
    setNickels(0)
    setPennies(0)
  }

  const calculate = () => {
    const parsedDue = Number.parseFloat(amountDue || '0')
    const parsedReceived = Number.parseFloat(amountReceived || '0')

    const amountDueCents = Number.isFinite(parsedDue)
      ? Math.round(parsedDue * 100)
      : 0
    const amountReceivedCents = Number.isFinite(parsedReceived)
      ? Math.round(parsedReceived * 100)
      : 0

    const deltaCents = amountReceivedCents - amountDueCents
    setChangeDue(deltaCents / 100)

    if (deltaCents < 0) {
      setAlertVariant('danger')
      resetDenominations()
      return
    }

    setAlertVariant('success')
    let remainder = deltaCents

    const nextTwenties = Math.floor(remainder / 2000)
    remainder %= 2000
    const nextTens = Math.floor(remainder / 1000)
    remainder %= 1000
    const nextFives = Math.floor(remainder / 500)
    remainder %= 500
    const nextOnes = Math.floor(remainder / 100)
    remainder %= 100
    const nextQuarters = Math.floor(remainder / 25)
    remainder %= 25
    const nextDimes = Math.floor(remainder / 10)
    remainder %= 10
    const nextNickels = Math.floor(remainder / 5)
    remainder %= 5
    const nextPennies = remainder

    setTwenties(nextTwenties)
    setTens(nextTens)
    setFives(nextFives)
    setOnes(nextOnes)
    setQuarters(nextQuarters)
    setDimes(nextDimes)
    setNickels(nextNickels)
    setPennies(nextPennies)
  }

  const formattedChangeDue = Math.abs(changeDue).toFixed(2)

  const denominationCards = [
    { label: 'Twenties', testId: 'twenties', value: twenties },
    { label: 'Tens', testId: 'tens', value: tens },
    { label: 'Fives', testId: 'fives', value: fives },
    { label: 'Ones', testId: 'ones', value: ones },
    { label: 'Quarters', testId: 'quarters', value: quarters },
    { label: 'Dimes', testId: 'dimes', value: dimes },
    { label: 'Nickels', testId: 'nickels', value: nickels },
    { label: 'Pennies', testId: 'pennies', value: pennies },
  ]

  return (
    <div className="container py-4 app-shell">
      <header className="mb-4">
        <h1 className="mb-1 d-flex align-items-center gap-2">
          <i className="bi bi-calculator" aria-hidden="true"></i>
          <span>Change Calculator</span>
        </h1>
        <p className="text-muted mb-0">
          Enter the amount due and amount received to calculate change.
        </p>
      </header>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card panel-modern">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="amountDue" className="form-label">
                  <i className="bi bi-receipt-cutoff me-2" aria-hidden="true"></i>
                  <span>How much is due?</span>
                </label>
                <input
                  id="amountDue"
                  data-testid="amountDue"
                  type="number"
                  step="0.01"
                  min="0"
                  className="form-control"
                  value={amountDue}
                  onChange={(event) => setAmountDue(event.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="amountReceived" className="form-label">
                  <i className="bi bi-cash-coin me-2" aria-hidden="true"></i>
                  <span>How much was received?</span>
                </label>
                <input
                  id="amountReceived"
                  data-testid="amountReceived"
                  type="number"
                  step="0.01"
                  min="0"
                  className="form-control"
                  value={amountReceived}
                  onChange={(event) => setAmountReceived(event.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary w-100"
                data-testid="calculate"
                onClick={calculate}
              >
                Calculate
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          {alertVariant === 'success' && (
            <div className="alert alert-success" role="alert">
              The total change due is ${formattedChangeDue}
            </div>
          )}

          {alertVariant === 'danger' && (
            <div className="alert alert-danger" role="alert">
              Additional money owed is ${formattedChangeDue}
            </div>
          )}

          <div className="row row-cols-2 row-cols-md-4 g-3">
            {denominationCards.map((card) => (
              <div className="col" key={card.testId}>
                <div className="card h-100 denom-card">
                  <div className="card-body text-center">
                    <h2 className="h6 card-title d-flex align-items-center justify-content-center gap-2">
                      <i className="bi bi-cash-stack" aria-hidden="true"></i>
                      <span>{card.label}</span>
                    </h2>
                    <p
                      className="display-6 mb-0 denom-value"
                      data-testid={card.testId}
                    >
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
