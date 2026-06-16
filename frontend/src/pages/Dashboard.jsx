import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkBalance, deposit, withdraw } from '../services/api'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      navigate('/login')
      return
    }
    const userData = JSON.parse(storedUser)
    setUser(userData)
    fetchBalance(userData.accountNumber)
  }, [])

  const fetchBalance = async (accountNumber) => {
    try {
      const result = await checkBalance(accountNumber)
      setBalance(result.balance)
    } catch (err) {
      setError('Failed to fetch balance')
    }
  }

  const handleDeposit = async (e) => {
    e.preventDefault()
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount')
      return
    }
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await deposit(user.accountNumber, Number(amount))
      if (result.message) {
        setMessage(result.message)
        setBalance(result.balance)
        setAmount('')
      }
    } catch (err) {
      setError('Deposit failed')
    } finally {
      setLoading(false)
    }
  }

  const handleWithdraw = async (e) => {
    e.preventDefault()
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount')
      return
    }
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await withdraw(user.accountNumber, Number(amount))
      if (result.message) {
        setMessage(result.message)
        setBalance(result.balance)
        setAmount('')
      } else {
        setError(result.message || 'Withdrawal failed')
      }
    } catch (err) {
      setError('Withdrawal failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-red-600 text-white p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">ATM Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-700 px-4 py-2 rounded hover:bg-red-800"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Account Information</h2>
          <p className="text-gray-600 mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="text-gray-600 mb-2"><strong>Account Number:</strong> {user.accountNumber}</p>
          <p className="text-2xl font-bold text-red-600"><strong>Balance:</strong> ${balance.toFixed(2)}</p>
        </div>

        {message && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">{message}</div>}
        {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Deposit</h3>
            <form onSubmit={handleDeposit} className="space-y-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
              >
                {loading ? 'Processing...' : 'Deposit'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Withdraw</h3>
            <form onSubmit={handleWithdraw} className="space-y-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
              >
                {loading ? 'Processing...' : 'Withdraw'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
