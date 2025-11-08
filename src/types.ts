

/**
 * 収支データ
 */
export type Transaction = {
  /** 収支ID（自動採番） */
  id: string

  /** 収支種別（収入か支出か） */
  type: "income" | "expense"

  /** 金額 */
  amount: number

  /** カテゴリー */
  category: string

  /** 日付 */
  date: string

  /** メモ */
  note?: string
}

/**
 * カテゴリデータ
 */
export type Category = {
  /** 自動採番ID（Supabaseが生成） */
  id: string

  /** カテゴリ名（例: "食費", "給与"） */
  name: string

  /** カテゴリの種類 "income" または "expense" */
  type: "income" | "expense"
}