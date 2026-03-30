export interface SignatureData {
  fullName: string
  role: string
  phone: string
  email: string
  photoBase64: string | null
  templateId: 'classic' | 'light' | 'bold' | 'mono'
  products: {
    weExport: boolean
    tripnbusiness: boolean
    weXperience: boolean
  }
}

export interface SignatureImages {
  targetpoint: string
  weExport: string
  tripnbusiness: string
  weXperience: string
}
