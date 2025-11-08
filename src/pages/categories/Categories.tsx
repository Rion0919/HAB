import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { Category } from '../../types'
import { Link } from 'react-router-dom'
/**
 * カテゴリー管理画面
 * このページでカテゴリーの新規追加、および編集を行います。
 */

function Categories() {
  const [categories, setCategories] = useState<Category[]>([])

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
    fetchCategories()
  }, [])

  return (
    <>
      <h1>カテゴリー管理画面</h1>
      <Link to="./create">カテゴリー新規作成</Link>
      <p>カテゴリー一覧</p>
      <p>収入</p>
      <ul>
        {categories.map(
          (category) =>
            category.type === 'income' && (
              <>
                <li key={category.id}>
                  {category.name}
                  <Link to={`/category/${category.id}`}>詳細</Link>
                  <Link to={`/category/edit/${category.id}`}>編集</Link>
                </li>
              </>
            ),
        )}
      </ul>
      <p>支出</p>
      <ul>
        {categories.map(
          (category) =>
            category.type === 'expense' && (
              <>
                <li key={category.id}>
                  {category.name}
                  <Link to={`/category/${category.id}`}>詳細</Link>
                  <Link to={`/category/edit/${category.id}`}>編集</Link>
                </li>
              </>
            ),
        )}
      </ul>
    </>
  )
}

export default Categories
