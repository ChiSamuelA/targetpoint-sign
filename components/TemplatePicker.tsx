'use client'

import { cn } from '@/lib/utils'
import type { SignatureData } from '@/types/signature'

interface Props {
  data: SignatureData
  onChange: (data: SignatureData) => void
}

const TEMPLATES: {
  id: SignatureData['templateId']
  name: string
  tagline: string
}[] = [
  { id: 'classic', name: 'Classic', tagline: 'Bold purple banner' },
  { id: 'light',   name: 'Light',   tagline: 'White + purple accents' },
  { id: 'bold',    name: 'Bold',    tagline: 'Split dark / light cols' },
  { id: 'mono',    name: 'Mono',    tagline: 'Minimal, thin strip' },
]

export default function TemplatePicker({ data, onChange }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-2">
      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-3">
        Choose Template
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TEMPLATES.map(({ id, name, tagline }) => {
          const active = data.templateId === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange({ ...data, templateId: id })}
              className={cn(
                'flex flex-col items-start p-4 rounded-xl border-2 bg-white text-left',
                'transition-all hover:shadow-sm cursor-pointer',
                active
                  ? 'border-[#7f51ff] shadow-sm shadow-purple-100'
                  : 'border-gray-100 hover:border-gray-200'
              )}
            >
              <span
                className={cn(
                  'text-sm font-semibold leading-tight',
                  active ? 'text-[#7f51ff]' : 'text-gray-800'
                )}
              >
                {name}
              </span>
              <span className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                {tagline}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
