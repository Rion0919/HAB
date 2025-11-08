import type { Transaction } from '../../types'

interface HistoryListProps {
  transactions: Transaction[]
  deleteData: (id: string) => void
}

export const HistoryListComponent = ({transactions, deleteData}: HistoryListProps) => {
  return (
    <div>
      <h2>履歴</h2>
      <ul>
        {transactions.map((t: Transaction) => (
          <li key={t.id}>
            {new Date(t.date).toLocaleDateString()} - {t.type === 'expense' ? '支出' : '収入'} - {t.category} - {t.amount}円
            <button onClick={() => deleteData(t.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
