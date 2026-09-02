'use client'

import { useState } from 'react'
import { Gasto } from './FinanceTracker'
import { ShoppingCart, Plus, Trash2, Edit2, X, Check, CreditCard } from 'lucide-react'

interface GastosSectionProps {
  gastos: Gasto[]
  adicionarGasto: (gasto: Omit<Gasto, 'id'>) => void
  removerGasto: (id: string) => void
  alterarGasto: (id: string, gasto: Partial<Gasto>) => void
}

const categorias = [
  'Meu Cartão',
  'Cartão - Gui',
  'Cartão - Carla',
  'Cartão - Diana',
  'Dinheiro',
  'PIX',
  'Outros'
]

const GastosSection = ({ gastos, adicionarGasto, removerGasto, alterarGasto }: GastosSectionProps) => {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [categoria, setCategoria] = useState(categorias[0])
  const [data, setData] = useState('')
  const [editandoId, setEditandoId] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!descricao || !valor) return

    adicionarGasto({
  descricao,
  valor: parseFloat(valor),
  categoria,
  pago: false,
  data: data || new Date().toISOString().split('T')[0] // Usa data atual se vazio
})

    setDescricao('')
    setValor('')
    setData('')
  }

  const iniciarEdicao = (gasto: Gasto) => {
    setEditandoId(gasto.id)
  }

  const cancelarEdicao = () => {
    setEditandoId(null)
  }

  const salvarEdicao = (id: string) => {
    setEditandoId(null)
  }

  const togglePago = (id: string, pago: boolean) => {
    alterarGasto(id, { pago: !pago })
  }

  const totalGastos = gastos.reduce((acc, g) => acc + g.valor, 0)
  const totalPagos = gastos.filter(g => g.pago).reduce((acc, g) => acc + g.valor, 0)
  const totalPendentes = totalGastos - totalPagos

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-red-500 to-pink-500 p-2 rounded-lg">
          <ShoppingCart className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Gastos</h2>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-1">Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Conta de luz, Supermercado"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
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
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-200 mb-1">
            Categoria / Forma de Pagamento
          </label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-800">
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Adicionar Gasto
        </button>
      </form>

      {/* Totais */}
      <div className="space-y-2 mb-4">
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-red-200 font-medium">Total de Gastos:</span>
            <span className="text-xl font-bold text-red-300">
              R$ {totalGastos.toFixed(2)}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3">
            <div className="text-center">
              <span className="text-xs text-orange-200 block">Pagos</span>
              <span className="text-lg font-bold text-orange-300">
                R$ {totalPagos.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
            <div className="text-center">
              <span className="text-xs text-yellow-200 block">Pendentes</span>
              <span className="text-lg font-bold text-yellow-300">
                R$ {totalPendentes.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Gastos */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {gastos.length === 0 ? (
          <p className="text-center text-purple-300 py-8">Nenhum gasto registrado</p>
        ) : (
          gastos.map((gasto) => (
            <div
              key={gasto.id}
              className={`border rounded-lg p-4 transition-all ${
                gasto.pago
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-white/10 border-white/20 hover:bg-white/15'
              }`}
            >
              {editandoId === gasto.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={gasto.descricao}
                    onChange={(e) => alterarGasto(gasto.id, { descricao: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      step="0.01"
                      value={gasto.valor}
                      onChange={(e) => alterarGasto(gasto.id, { valor: parseFloat(e.target.value) })}
                      className="px-3 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                      type="date"
                      value={gasto.data}
                      onChange={(e) => alterarGasto(gasto.id, { data: e.target.value })}
                      className="px-3 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <select
                    value={gasto.categoria}
                    onChange={(e) => alterarGasto(gasto.id, { categoria: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {categorias.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-800">
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => salvarEdicao(gasto.id)}
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
                      <h3 className={`font-semibold ${gasto.pago ? 'text-green-300 line-through' : 'text-white'}`}>
                        {gasto.descricao}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <CreditCard className="w-3 h-3 text-purple-300" />
                        <p className="text-xs text-purple-300">{gasto.categoria}</p>
                      </div>
                      {gasto.data && (
  <p className="text-xs text-purple-300 mt-1">
    {new Date(gasto.data + 'T00:00:00').toLocaleDateString('pt-BR')}
  </p>
)}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => togglePago(gasto.id, gasto.pago)}
                        className={`p-2 rounded-lg transition-all ${
                          gasto.pago
                            ? 'bg-green-500/20 hover:bg-green-500/30'
                            : 'bg-yellow-500/20 hover:bg-yellow-500/30'
                        }`}
                        title={gasto.pago ? 'Marcar como não pago' : 'Marcar como pago'}
                      >
                        <Check className={`w-4 h-4 ${gasto.pago ? 'text-green-300' : 'text-yellow-300'}`} />
                      </button>
                      <button
                        onClick={() => iniciarEdicao(gasto)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4 text-blue-300" />
                      </button>
                      <button
                        onClick={() => removerGasto(gasto.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-red-300" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xl font-bold ${gasto.pago ? 'text-green-400' : 'text-red-400'}`}>
                      R$ {gasto.valor.toFixed(2)}
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

export default GastosSection
