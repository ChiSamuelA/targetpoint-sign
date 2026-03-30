'use client'

import { useState } from 'react'
import Image from 'next/image'
import TemplatePicker from '@/components/TemplatePicker'
import SignatureForm from '@/components/SignatureForm'
import SignaturePreview from '@/components/SignaturePreview'
import type { SignatureData } from '@/types/signature'

const defaultData: SignatureData = {
  fullName: '',
  role: '',
  phone: '',
  email: '',
  photoBase64: null,
  templateId: 'classic',
  products: {
    weExport: true,
    tripnbusiness: true,
    weXperience: true,
  },
}

export default function Home() {
  const [data, setData] = useState<SignatureData>(defaultData)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-950 to-purple-800 shadow-xl">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-4">
          <Image
            src="/targetpoint.png"
            alt="Target Point"
            width={160}
            height={44}
            className="object-contain"
            priority
          />
          <div className="h-8 w-px bg-purple-700" />
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight leading-tight">
              Signature Generator
            </h1>
            <p className="text-purple-300 text-xs">Build your professional email signature</p>
          </div>
        </div>
      </header>

      {/* Template picker sits between header and the two-column layout */}
      <TemplatePicker data={data} onChange={setData} />

      <main className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          <SignatureForm data={data} onChange={setData} />
          <div className="xl:sticky xl:top-8">
            <SignaturePreview data={data} />
          </div>
        </div>
      </main>
    </div>
  )
}
