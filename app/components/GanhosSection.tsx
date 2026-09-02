'use client'

import { useState } from 'react'
import { Ganho } from './FinanceTracker'
import { TrendingUp, Plus, Trash2, Edit2, X, Check } from 'lucide-react'

interface GanhosSectionProps {
  ganhos: Ganho[]
  adicionarGanho: (ganho: Omit<Ganho, 'id'>) => void
  removerGanho: (id: string) => void
  alterarGanho: (id: string, ganho: Partial<Ganho>) => void
}

const GanhosSection = ({ ganhos, adicionarGanho, removerGanho, alterarGanho }: GanhosSectionProps) => {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [data, setData] = useState('')
  const [editandoId, setEditandoId] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!descricao || !valor || !data) return

    adicionarGanho({
      descricao,
      valor: parseFloat(valor),
      data
    })

    setDescricao('')
    setValor('')
    setData('')
  }

  const iniciarEdicao = (ganho: Ganho) => {
    setEditandoId(ganho.id)
  }

  const cancelarEdicao = () => {
    setEditandoId(null)
  }

  const salvarEdicao = (id: string) => {
    setEditandoId(null)
  }

  const totalGanhos = ganhos.reduce((acc, g) => acc + g.valor, 0)

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-2 rounded-lg">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Ganhos</h2>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-1">Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Salário, Comissão, Hora Extra"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Adicionar Ganho
        </button>
      </form>

      {/* Total */}
      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-green-200 font-medium">Total de Ganhos:</span>
          <span className="text-2xl font-bold text-green-300">
            R$ {totalGanhos.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Lista de Ganhos */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {ganhos.length === 0 ? (
          <p className="text-center text-purple-300 py-8">Nenhum ganho registrado</p>
        ) : (
          ganhos.map((ganho) => (
            <div
              key={ganho.id}
              className="bg-white/10 border border-white/20 rounded-lg p-4 hover:bg-white/15 transition-all"
            >
              {editandoId === ganho.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={ganho.descricao}
                    onChange={(e) => alterarGanho(ganho.id, { descricao: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      step="0.01"
                      value={ganho.valor}
                      onChange={(e) => alterarGanho(ganho.id, { valor: parseFloat(e.target.value) })}
                      className="px-3 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="date"
                      value={ganho.data}
                      onChange={(e) => alterarGanho(ganho.id, { data: e.target.value })}
                      className="px-3 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => salvarEdicao(ganho.id)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Salvar
                    </button>
                    <button
                      onClick={cancelarEdicao}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{ganho.descricao}</h3>
                      <p className="text-sm text-purple-300">
                        {new Date(ganho.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => iniciarEdicao(ganho)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4 text-blue-300" />
                      </button>
                      <button
                        onClick={() => removerGanho(ganho.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-red-300" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-green-400">
                      R$ {ganho.valor.toFixed(2)}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default GanhosSection
