import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/api'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    accountNumber: '',
    pin: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signup(formData.name, formData.accountNumber, formData.pin)
      if (result.message === 'Account created successfully') {
        navigate('/login')
      } else {
        setError(result.message || 'Signup failed')
      }
    } catch (err) {
      setError('Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="bg-blue-950 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-blue-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-sky-300">Sign Up</h1>
        {error && <div className="mb-4 p-3 bg-red-100/10 text-red-300 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-blue-700 rounded-md bg-blue-900 text-slate-100 shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-blue-700 rounded-md bg-blue-900 text-slate-100 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">PIN</label>
            <input
              type="password"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-blue-700 rounded-md bg-blue-900 text-slate-100 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 text-slate-950 py-2 rounded-md hover:bg-sky-400 disabled:bg-slate-600"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-300">
          Already have an account?{' '}
          <a href="/login" className="text-red-400 hover:text-red-300 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup
