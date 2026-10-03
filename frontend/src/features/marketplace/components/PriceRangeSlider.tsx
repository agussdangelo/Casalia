import { formatPrice } from '@/shared/utils/formatPrice'
import type { PriceRange } from '../types'

interface PriceRangeSliderProps {
  bounds: PriceRange
  value: PriceRange
  step: number
  onChange: (range: PriceRange) => void
}

function PriceRangeSlider({ bounds: [lowest, highest], value: [min, max], step, onChange }: PriceRangeSliderProps) {
  const percent = (price: number) =>
    highest === lowest ? 0 : ((price - lowest) / (highest - lowest)) * 100

  return (
    <div>
      <div className="relative h-4">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#dcd2c9]" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-clay"
          style={{ left: `${percent(min)}%`, right: `${100 - percent(max)}%` }}
        />
        {}
        <input
          type="range"
          className="price-range-input"
          aria-label="Precio mínimo"
          min={lowest}
          max={highest}
          step={step}
          value={min}
          onChange={(e) => onChange([Math.min(Number(e.target.value), max - step), max])}
        />
        <input
          type="range"
          className="price-range-input"
          aria-label="Precio máximo"
          min={lowest}
          max={highest}
          step={step}
          value={max}
          onChange={(e) => onChange([min, Math.max(Number(e.target.value), min + step)])}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-ink">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>
    </div>
  )
}

export default PriceRangeSlider
