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

// Logos are served from the deployed Vercel URL so Outlook can fetch them
// as normal hosted images — base64 logos are unreliable in Outlook Desktop.
// The profile photo (photoBase64) remains base64 since it is user-uploaded.
const HOSTED_BASE = 'https://targetpoint-sign.vercel.app'

export async function getInlineImages(): Promise<SignatureImages> {
  return {
    targetpoint:   `${HOSTED_BASE}/targetpoint.png`,
    weExport:      `${HOSTED_BASE}/we-export.png`,
    tripnbusiness: `${HOSTED_BASE}/tripnbusiness.png`,
    weXperience:   `${HOSTED_BASE}/we-xperience.png`,
  }
}

export function getPreviewImages(): SignatureImages {
  return {
    targetpoint:   '/targetpoint.png',
    weExport:      '/we-export.png',
    tripnbusiness: '/tripnbusiness.png',
    weXperience:   '/we-xperience.png',
  }
}
