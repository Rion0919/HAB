import { icons } from '../../composable/iconComposable'

type Props = {
  icon: keyof typeof icons;
  color: string;
  setIcon: React.Dispatch<React.SetStateAction<keyof typeof icons>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
};

const colors = ["#000", "#E53E3E", "#3182CE", "#38A169", "#D69E2E"];

export default function IconPickerDialog({
  icon,
  color,
  setIcon,
  setColor,
  onClose
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-80">
        <h2 className="text-lg mb-2">アイコンを選ぶ</h2>

        {/* Icon List */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {Object.entries(icons).map(([key, Icon]) => (
            <button
              key={key}
              onClick={() => setIcon(key as keyof typeof icons)}
              className={`p-2 rounded border ${
                icon === key ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <Icon color={color} />
            </button>
          ))}
        </div>

        {/* Color List */}
        <h3 className="text-md mb-1">色を選ぶ</h3>
        <div className="flex gap-2 mb-4">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="w-6 h-6 rounded-full border border-gray-300"
              style={{ backgroundColor: c }}
            ></button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
}