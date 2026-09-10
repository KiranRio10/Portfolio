import React, { useState } from 'react'
import { BookOpen, PlusCircle, ArrowUpRight, ArrowDownLeft, AlertCircle, CheckCircle, Search } from 'lucide-react'
import { sound } from '../../utils/sound'
import { triggerConfetti } from '../../utils/confetti'

export default function KhaataBookSandbox() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ramesh Verma', phone: '98480xxxxx', balance: 4500, overdue: true, lastUpdated: '34 days ago' },
    { id: 2, name: 'Ananya Sharma', phone: '98765xxxxx', balance: 1200, overdue: false, lastUpdated: '4 days ago' },
    { id: 3, name: 'Vikram Patel', phone: '91234xxxxx', balance: 0, overdue: false, lastUpdated: 'Yesterday' }
  ])
  const [selectedCustomerId, setSelectedCustomerId] = useState(1)
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('CREDIT') // 'CREDIT' (you gave loan) or 'PAYMENT' (customer repaid)
  const [searchTerm, setSearchTerm] = useState('')

  const handleTransaction = (e) => {
    e.preventDefault()
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return

    const num = Number(amount)
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === selectedCustomerId) {
          const newBal = type === 'CREDIT' ? c.balance + num : Math.max(0, c.balance - num)
          return {
            ...c,
            balance: newBal,
            lastUpdated: 'Just now',
            overdue: newBal > 0 ? c.overdue : false
          }
        }
        return c
      })
    )

    setAmount('')
    sound.playSuccess()
    if (type === 'PAYMENT') triggerConfetti()
  }

  const totalOutstanding = customers.reduce((acc, curr) => acc + curr.balance, 0)
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-gray-950/90 border border-emerald-500/30 rounded-2xl p-5 text-gray-100 font-sans shadow-xl">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-mono tracking-wide text-emerald-300">
              LIVE SIMULATION: ATOMIC CREDIT LEDGER
            </h4>
            <p className="text-xs text-gray-400">
              Simulate customer credit issuance, debt settlement & real-time overdue ledger math
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-gray-400 block uppercase">Net Credit Owed</span>
          <span className="text-lg font-mono font-bold text-emerald-400">
            ₹{totalOutstanding.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Accounts Panel */}
        <div className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800 flex flex-col">
          <div className="flex items-center space-x-2 mb-3 bg-gray-950 px-2.5 py-1.5 rounded-lg border border-gray-800">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customer account..."
              className="w-full bg-transparent text-xs font-mono text-gray-200 placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {filteredCustomers.map((cust) => {
              const isSelected = cust.id === selectedCustomerId
              return (
                <div
                  key={cust.id}
                  onClick={() => {
                    setSelectedCustomerId(cust.id)
                    sound.playClick()
                  }}
                  className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      : 'bg-gray-950/50 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-gray-200">{cust.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      {cust.phone} • {cust.lastUpdated}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-emerald-300">
                      ₹{cust.balance.toLocaleString()}
                    </div>
                    {cust.overdue && cust.balance > 0 ? (
                      <span className="text-[9px] font-mono text-rose-400 flex items-center space-x-0.5 justify-end">
                        <AlertCircle className="w-2.5 h-2.5 mr-0.5" />
                        <span>OVERDUE</span>
                      </span>
                    ) : cust.balance === 0 ? (
                      <span className="text-[9px] font-mono text-gray-500">SETTLED</span>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Panel: Add Transaction */}
        <div className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">
              Record Transaction
            </span>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  setType('CREDIT')
                  sound.playClick()
                }}
                className={`py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition ${
                  type === 'CREDIT'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
                    : 'bg-gray-950 text-gray-400 border border-gray-800'
                }`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>GIVE CREDIT (+)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setType('PAYMENT')
                  sound.playClick()
                }}
                className={`py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition ${
                  type === 'PAYMENT'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    : 'bg-gray-950 text-gray-400 border border-gray-800'
                }`}
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>RECEIVE (–)</span>
              </button>
            </div>

            <form onSubmit={handleTransaction} className="space-y-3">
              <div>
                <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">
                  Amount in Rupees (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-cyan-300 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <button
                type="submit"
                data-cursor-text="POST"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-mono font-bold tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>POST TO KHAATA LEDGER</span>
              </button>
            </form>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-800 text-[11px] font-mono text-gray-400 flex items-center space-x-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Updates local ledger store with atomic balance recalculation.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
