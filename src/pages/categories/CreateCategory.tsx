import { useState } from 'react'
import { icons } from '../../composable/iconComposable'
import { HexColorPicker } from 'react-colorful'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

function CreateCategory() {
  type IconKey = keyof typeof icons
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [type, setType] = useState('-')
  const [color, setColor] = useState('#4f46e5')
  const [icon, setIcon] = useState<IconKey>('tag')
  const IconComponent = icons[icon]

  /**
   * カテゴリーデータ登録
   */
  const handleSubmit = async (): Promise<void> => {
    console.log({ name, type, icon, color })
    if (name.trim() === '' || type === '-') {
      alert('カテゴリー名または収支区分が未設定です。')
      return
    }
    const { error } = await supabase.from('categories').insert([
      {
        name,
        type,
        icon,
        iconColor: color,
      },
    ])
    if (error) {
      console.error('カテゴリーデータ追加エラー：', error)
      return
    }
    alert(
      `以下のカテゴリーを新規追加しました。\n名前: ${name}\n種別: ${type}\nアイコン: ${icon}\n色: ${color}`,
    )
    goBack()
  }

  /**
   * 一覧画面に戻る
   */
  const goBack = () => {
    navigate('/category')
  }

  return (
    <>
      <h1>カテゴリー新規作成</h1>

      <div>
        <form action="#">
          <label htmlFor="categoryName">カテゴリー名</label>
          <input type="text" name="categoryName" id="categoryName" onChange={(e) => setName(e.target.value)} />
          <label htmlFor="type">収支区分</label>
          <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
            <option value="-">-</option>
            <option value="income">収入</option>
            <option value="expense">支出</option>
          </select>
        </form>
        {/* アイコン選択 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>アイコンを選択：</label>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {(Object.keys(icons) as IconKey[]).map((key) => {
              const Icon = icons[key]
              return (
                <div
                  key={key}
                  onClick={() => setIcon(key)}
                  style={{
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: icon === key ? '2px solid #4f46e5' : '1px solid #ccc',
                  }}
                >
                  <Icon size={24} color={color} />
                </div>
              )
            })}
          </div>
        </div>

        {/* カラー選択 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>カラーを選択：</label>
          <HexColorPicker color={color} onChange={setColor} />
        </div>

        {/* プレビュー */}
        <div style={{ marginBottom: '1rem' }}>
          <p>プレビュー：</p>
          <IconComponent size={40} color={color} />
        </div>

        {/* 作成ボタン */}
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            backgroundColor: color,
            color: '#fff',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          作成
        </button>
      </div>
    </>
  )
}

export default CreateCategory
