import { useState } from 'react'
import { icons } from '../../composable/iconComposable'
import { HexColorPicker } from 'react-colorful'

type Props = {
  color: string
  icon: string
  setIcon: React.Dispatch<React.SetStateAction<keyof typeof icons>>
  setColor: React.Dispatch<React.SetStateAction<string>>
  onClose: () => void
}
// style={{
//   cursor: 'pointer',
//   padding: '0.5rem',
//   borderRadius: '8px',
//   border: icon === key ? '2px solid #4f46e5' : '1px solid #ccc',
// }}

export const IconSelectorLayout = ({ color, icon, setIcon, setColor, onClose }: Props) => {
  type IconKey = keyof typeof icons

  const [open, setOpen] = useState(false)

  return (
    <>
      <div style={{ border: 'solid black 1px', borderRadius: '10px', maxWidth: '530px' }}>
        <div style={{ marginBottom: '1rem', padding: '12px' }}>
          <label>アイコンを選択：</label>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginTop: '0.5rem',
              maxWidth: '530px',
              border: 'solid pink 1px',
            }}
          >
            {(Object.keys(icons) as IconKey[]).map((key) => {
              const Icon = icons[key]
              return (
                <div
                  key={key}
                  onClick={() => setIcon(key)}
                  style={{
                    cursor: 'pointer',
                    padding: '3px',
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
        <div style={{ marginBottom: '1rem', padding: '12px' }}>
          <label>カラーを選択：</label>
          <HexColorPicker color={color} onChange={setColor} />
        </div>
        <button onClick={onClose} style={{ margin: '12px' }}>
          OK
        </button>
      </div>
    </>
  )
}
