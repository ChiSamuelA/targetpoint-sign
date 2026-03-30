import type { SignatureData, SignatureImages } from '@/types/signature'
import { buildClassic } from './templates/classic'
import { buildLight }   from './templates/light'
import { buildBold }    from './templates/bold'
import { buildMono }    from './templates/mono'

// ── Template router ────────────────────────────────────────────────────────────
export function buildSignatureHTML(data: SignatureData, images: SignatureImages): string {
  switch (data.templateId) {
    case 'light':  return buildLight(data, images)
    case 'bold':   return buildBold(data, images)
    case 'mono':   return buildMono(data, images)
    default:       return buildClassic(data, images)
  }
}

// ── Image utilities (unchanged) ────────────────────────────────────────────────
export async function fetchImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url)
  const blob = await response.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export async function getInlineImages(): Promise<SignatureImages> {
  const [targetpoint, weExport, tripnbusiness, weXperience] = await Promise.all([
    fetchImageAsBase64('/targetpoint.png'),
    fetchImageAsBase64('/we-export.png'),
    fetchImageAsBase64('/tripnbusiness.png'),
    fetchImageAsBase64('/we-xperience.png'),
  ])
  return { targetpoint, weExport, tripnbusiness, weXperience }
}

export function getPreviewImages(): SignatureImages {
  return {
    targetpoint:   '/targetpoint.png',
    weExport:      '/we-export.png',
    tripnbusiness: '/tripnbusiness.png',
    weXperience:   '/we-xperience.png',
  }
}
