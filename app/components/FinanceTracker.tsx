'use client'

import { useState, useEffect } from 'react'
import GastosSection from './GastosSection'
import GanhosSection from './GanhosSection'
import ResumoSection from './ResumoSection'
import { Wallet } from 'lucide-react'

export interface Gasto {
  id: string
  descricao: string
  valor: number
  categoria: string
  pago: boolean
  data: string
}

export interface Ganho {
  id: string
  descricao: string
  valor: number
  data: string
}

const FinanceTracker = () => {
  const [mesAno, setMesAno] = useState('')
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [ganhos, setGanhos] = useState<Ganho[]>([])

  useEffect(() => {
    const hoje = new Date()
    const mes = String(hoje.getMonth() + 1).padStart(2, '0')
    const ano = hoje.getFullYear()
    setMesAno(`${ano}-${mes}`)
  }, [])

  useEffect(() => {
    if (mesAno) {
      const gastossalvos = localStorage.getItem(`gastos-${mesAno}`)
      const ganhossalvos = localStorage.getItem(`ganhos-${mesAno}`)
      
      if (gastossalvos) setGastos(JSON.parse(gastossalvos))
      else setGastos([])
      
      if (ganhossalvos) setGanhos(JSON.parse(ganhossalvos))
      else setGanhos([])
    }
  }, [mesAno])

  useEffect(() => {
    if (mesAno && gastos.length >= 0) {
      localStorage.setItem(`gastos-${mesAno}`, JSON.stringify(gastos))
    }
  }, [gastos, mesAno])

  useEffect(() => {
    if (mesAno && ganhos.length >= 0) {
      localStorage.setItem(`ganhos-${mesAno}`, JSON.stringify(ganhos))
    }
  }, [ganhos, mesAno])

  const adicionarGasto = (gasto: Omit<Gasto, 'id'>) => {
    const novoGasto = {
      ...gasto,
      id: Date.now().toString()
    }
    setGastos([...gastos, novoGasto])
  }

  const removerGasto = (id: string) => {
    setGastos(gastos.filter(g => g.id !== id))
  }

  const alterarGasto = (id: string, gastoAtualizado: Partial<Gasto>) => {
    setGastos(gastos.map(g => g.id === id ? { ...g, ...gastoAtualizado } : g))
  }

  const adicionarGanho = (ganho: Omit<Ganho, 'id'>) => {
    const novoGanho = {
      ...ganho,
      id: Date.now().toString()
    }
    setGanhos([...ganhos, novoGanho])
  }

  const removerGanho = (id: string) => {
    setGanhos(ganhos.filter(g => g.id !== id))
  }

  const alterarGanho = (id: string, ganhoAtualizado: Partial<Ganho>) => {
    setGanhos(ganhos.map(g => g.id === id ? { ...g, ...ganhoAtualizado } : g))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Controle Financeiro</h1>
                <p className="text-purple-200">Gerencie seus gastos e ganhos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-white font-medium">Mês/Ano:</label>
              <input
                type="month"
                value={mesAno}
                onChange={(e) => setMesAno(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* Resumo */}
        <ResumoSection gastos={gastos} ganhos={ganhos} />

        {/* Grid de Gastos e Ganhos */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <GanhosSection
            ganhos={ganhos}
            adicionarGanho={adicionarGanho}
            removerGanho={removerGanho}
            alterarGanho={alterarGanho}
          />
          
          <GastosSection
            gastos={gastos}
            adicionarGasto={adicionarGasto}
            removerGasto={removerGasto}
            alterarGasto={alterarGasto}
          />
        </div>
      </div>
    </div>
  )
}

export default FinanceTracker
