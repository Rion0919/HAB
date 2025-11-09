import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import type { Transaction, Category } from './types'
// import { HistoryListComponent } from './components/history/HistoryListComponent'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'
import { routes } from "./routes"
// import Categories from './pages/categories/Categories'

function AppRouter() {
  const element = useRoutes(routes)
  return element
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [amount, setAmount] = useState<number>(0)
  const [categoryId, setCategoryId] = useState<string>('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [note, setNote] = useState<string>('')

  /**
   * Supabaseから全ての取引データを取得してstateにセット
   */
  const fetchTransactions = async (): Promise<void> => {
    const { data, error } = await supabase.from('transactions').select('*').order('date', { ascending: false })
    if (error) {
      console.error('取引データ取得エラー', error)
      return
    }
    setTransactions(data || [])
  }

  /**
   * Supabaseからカテゴリデータを取得
   */
  const fetchCategories = async (): Promise<void> => {
    const { data, error } = await supabase.from('categories').select('*')
    if (error) {
      console.error('カテゴリ取得エラー:', error)
      return
    }
    setCategories(data || [])
  }

  useEffect(() => {
    fetchTransactions()
    fetchCategories()
  }, [])

  /**
   * 新しい収支情報を追加
   */
  const handleAdd = async (): Promise<void> => {
    if (!categoryId || amount <= 0) return
    const selectedCategory = categories.find((c) => c.id === categoryId)
    if (!selectedCategory) return

    const { error } = await supabase.from('transactions').insert([
      {
        type: selectedCategory.type,
        amount,
        category: selectedCategory.name,
        date: new Date().toISOString(),
        note,
      },
    ])
    if (error) {
      console.error('データ追加エラー:', error)
      return
    }

    setAmount(0)
    setCategoryId('')
    fetchTransactions()
    setNote('')
  }

  /**
   * データ削除
   */
  const deleteData = async (id: string): Promise<void> => {
    const { data, error } = await supabase.from('transactions').delete().eq('id', id)
    console.log('データを削除しました：', data)
    fetchTransactions()
    if (error) {
      console.error('データ削除エラー', error)
      return
    }
  }

  // カテゴリを選択肢として表示（typeごとにフィルタリング）
  const filteredCategories = categories.filter((c) => c.type === type)

  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
    // <div style={{ padding: '2rem' }}>
    //   <h1>家計簿（カテゴリ付き）</h1>

    //   {/* 収入/支出切替 */}
    //   <div style={{ marginBottom: '1rem' }}>
    //     <label>
    //       <input type="radio" value="expense" checked={type === 'expense'} onChange={() => setType('expense')} /> 支出
    //     </label>
    //     <label style={{ marginLeft: '1rem' }}>
    //       <input type="radio" value="income" checked={type === 'income'} onChange={() => setType('income')} /> 収入
    //     </label>
    //   </div>

    //   {/* 金額とカテゴリ選択 */}
    //   <div style={{ marginBottom: '1rem' }}>
    //     <input
    //       type="number"
    //       min={0}
    //       value={amount}
    //       onChange={(e) => setAmount(Number(e.target.value))}
    //       placeholder="金額"
    //     />
    //     <select value={categoryId ?? ''} onChange={(e) => setCategoryId(e.target.value)}>
    //       <option value="" disabled>
    //         カテゴリ選択
    //       </option>
    //       {filteredCategories.map((c) => (
    //         <option key={c.id} value={c.id}>
    //           {c.name}
    //         </option>
    //       ))}
    //     </select>
    //     <button onClick={handleAdd}>追加</button>
    //   </div>

    //   {/* メモ */}
    //   <h2>メモ</h2>
    //   <input type="text" name="note" id="note" value={note} onChange={(e) => setNote(e.target.value)} />

    //   {/* 取引一覧 */}
    //   <HistoryListComponent transactions={transactions} deleteData={deleteData} />
    // </div>
  )
}

export default App
