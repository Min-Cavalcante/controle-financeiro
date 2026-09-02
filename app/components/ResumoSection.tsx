'use client'

import { Gasto, Ganho } from './FinanceTracker'
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react'

interface ResumoSectionProps {
  gastos: Gasto[]
  ganhos: Ganho[]
}

const ResumoSection = ({ gastos, ganhos }: ResumoSectionProps) => {
  const totalGanhos = ganhos.reduce((acc, g) => acc + g.valor, 0)
  const totalGastos = gastos.reduce((acc, g) => acc + g.valor, 0)
  const totalGastosPagos = gastos.filter(g => g.pago).reduce((acc, g) => acc + g.valor, 0)
  
  // Saldo considerando apenas gastos pagos
  const saldoComPagos = totalGanhos - totalGastosPagos
  
  // Saldo total (independente se foi pago ou não)
  const saldoTotal = totalGanhos - totalGastos

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Ganhos */}
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-green-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-green-500 p-3 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="text-green-300 text-sm font-medium">Ganhos</span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-1">
          R$ {totalGanhos.toFixed(2)}
        </h3>
        <p className="text-green-200 text-sm">Total do mês</p>
      </div>

      {/* Total Gastos */}
      <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-red-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-red-500 p-3 rounded-xl">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
          <span className="text-red-300 text-sm font-medium">Gastos</span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-1">
          R$ {totalGastos.toFixed(2)}
        </h3>
        <p className="text-red-200 text-sm">Total do mês</p>
      </div>

      {/* Saldo Real (com pagos) */}
      <div className={`bg-gradient-to-br backdrop-blur-md rounded-2xl shadow-xl p-6 border ${
        saldoComPagos >= 0
          ? 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
          : 'from-orange-500/20 to-red-500/20 border-orange-500/30'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${saldoComPagos >= 0 ? 'bg-blue-500' : 'bg-orange-500'}`}>
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <span className={`text-sm font-medium ${saldoComPagos >= 0 ? 'text-blue-300' : 'text-orange-300'}`}>
            Saldo Real
          </span>
        </div>
        <h3 className={`text-3xl font-bold text-white mb-1`}>
          R$ {saldoComPagos.toFixed(2)}
        </h3>
        <p className={`text-sm ${saldoComPagos >= 0 ? 'text-blue-200' : 'text-orange-200'}`}>
          Ganhos - Gastos Pagos
        </p>
      </div>

      {/* Saldo Previsto (total) */}
      <div className={`bg-gradient-to-br backdrop-blur-md rounded-2xl shadow-xl p-6 border ${
        saldoTotal >= 0
          ? 'from-purple-500/20 to-indigo-500/20 border-purple-500/30'
          : 'from-red-500/20 to-pink-500/20 border-red-500/30'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${saldoTotal >= 0 ? 'bg-purple-500' : 'bg-red-500'}`}>
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <span className={`text-sm font-medium ${saldoTotal >= 0 ? 'text-purple-300' : 'text-red-300'}`}>
            Saldo Previsto
          </span>
        </div>
        <h3 className={`text-3xl font-bold text-white mb-1`}>
          R$ {saldoTotal.toFixed(2)}
        </h3>
        <p className={`text-sm ${saldoTotal >= 0 ? 'text-purple-200' : 'text-red-200'}`}>
          Ganhos - Todos Gastos
        </p>
      </div>
    </div>
  )
}

export default ResumoSection
