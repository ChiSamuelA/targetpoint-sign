// JG — white body, circular gold-bordered photo, indigo name, gold social circles, indigo banner
import type { SignatureData, SignatureImages } from '@/types/signature'

const INDIGO = '#2f25ba'
const GOLD   = '#c79437'

// ── Brand banner entries ───────────────────────────────────────────────────────
const BRANDS = [
  { fav: 'targetpointFav',   url: 'https://targetpoint.fr',            label: 'TARGET POINT'  },
  { fav: 'tripnbusinessFav', url: 'https://www.tripnbusiness.com',      label: 'TRIPNBUSINESS' },
  { fav: 'weExportFav',      url: 'https://www.we-export.com',          label: 'WE EXPORT'     },
  { fav: 'weImportFav',      url: 'https://www.we-import.com',          label: 'WE IMPORT'     },
] as const

export function buildJG(data: SignatureData, images: SignatureImages): string {
  const { fullName, role, phone, email, website, photoBase64, socials } = data
  const hasSocials = !!(socials.linkedin || socials.instagram || socials.facebook)

  // ── COLUMN 1: Photo ─────────────────────────────────────────────────────────
  const photoInner = photoBase64
    ? `<img src="${photoBase64}" width="120" height="120"
         style="display:block;border-radius:50%;border:3px solid ${GOLD};
                width:120px;height:120px;object-fit:cover;" alt="${fullName}">`
    : `<table cellpadding="0" cellspacing="0" border="0"
         style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
         <tr>
           <td width="120" height="120"
             style="width:120px;height:120px;border-radius:50%;border:3px solid ${GOLD};
                    font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td>
         </tr>
       </table>`

  const photoCell = `<td width="160" valign="middle"
    style="width:160px;padding-top:24px;padding-right:24px;padding-bottom:24px;
           padding-left:24px;vertical-align:middle;
           mso-table-lspace:0pt;mso-table-rspace:0pt;">
    ${photoInner}
  </td>`

  // ── COLUMN 2: Info block ─────────────────────────────────────────────────────
  // Row: email
  const emailRow = email ? `<tr>
    <td style="padding-bottom:6px;">
      <table cellpadding="0" cellspacing="0" border="0"
        style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr>
          <td width="24" valign="middle"
            style="width:24px;font-size:16px;color:#555555;vertical-align:middle;
                   font-family:Arial,sans-serif;line-height:1;">
            &#9993;
          </td>
          <td valign="middle"
            style="vertical-align:middle;font-family:Arial,sans-serif;font-size:13px;
                   color:#333333;white-space:nowrap;">
            <a href="mailto:${email}"
              style="color:#333333;font-size:13px;text-decoration:none;
                     font-family:Arial,sans-serif;">
              ${email}
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>` : ''

  // Row: website
  const websiteRow = website ? `<tr>
    <td style="padding-bottom:6px;">
      <table cellpadding="0" cellspacing="0" border="0"
        style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr>
          <td width="24" valign="middle"
            style="width:24px;font-size:16px;color:#555555;vertical-align:middle;
                   font-family:Arial,sans-serif;line-height:1;">
            &#128279;
          </td>
          <td valign="middle"
            style="vertical-align:middle;font-family:Arial,sans-serif;font-size:13px;
                   color:#333333;white-space:nowrap;">
            <a href="${website}" target="_blank"
              style="color:#333333;font-size:13px;text-decoration:none;
                     font-family:Arial,sans-serif;">
              ${website}
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>` : ''

  // Row: phone
  const phoneRow = phone ? `<tr>
    <td style="padding-bottom:16px;">
      <table cellpadding="0" cellspacing="0" border="0"
        style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr>
          <td width="24" valign="middle"
            style="width:24px;font-size:16px;color:#555555;vertical-align:middle;
                   font-family:Arial,sans-serif;line-height:1;">
            &#9990;
          </td>
          <td valign="middle"
            style="vertical-align:middle;font-family:Arial,sans-serif;font-size:13px;
                   color:#333333;white-space:nowrap;">
            <a href="tel:${phone.replace(/\s/g, '')}"
              style="color:#333333;font-size:13px;text-decoration:none;
                     font-family:Arial,sans-serif;">
              ${phone}
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>` : ''

  // Row: social icons
  const socialPlatforms = [
    socials.linkedin  ? { url: socials.linkedin,  src: images.linkedin,  alt: 'LinkedIn'  } : null,
    socials.instagram ? { url: socials.instagram, src: images.instagram, alt: 'Instagram' } : null,
    socials.facebook  ? { url: socials.facebook,  src: images.facebook,  alt: 'Facebook'  } : null,
  ].filter((s): s is NonNullable<typeof s> => s !== null)

  const socialCells = socialPlatforms.map(s =>
    `<td style="padding-right:8px;">
      <table cellpadding="0" cellspacing="0" border="0"
        style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr>
          <td width="36" height="36" align="center" valign="middle"
            style="width:36px;height:36px;background-color:${GOLD};border-radius:50%;
                   text-align:center;vertical-align:middle;">
            <a href="${s.url}" target="_blank" style="text-decoration:none;display:block;">
              <img src="${s.src}" width="18" height="18" border="0"
                style="display:block;margin:0 auto;width:18px;height:18px;" alt="${s.alt}">
            </a>
          </td>
        </tr>
      </table>
    </td>`
  ).join('')

  const socialRow = hasSocials ? `<tr>
    <td>
      <table cellpadding="0" cellspacing="0" border="0"
        style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr>${socialCells}</tr>
      </table>
    </td>
  </tr>` : ''

  const infoCell = `<td valign="top"
    style="vertical-align:top;padding-top:24px;padding-right:20px;
           padding-bottom:24px;padding-left:20px;
           border-left:2px solid ${INDIGO};
           mso-table-lspace:0pt;mso-table-rspace:0pt;">
    <table cellpadding="0" cellspacing="0" border="0"
      style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
      <tr>
        <td style="font-family:Arial,sans-serif;font-size:22px;font-weight:bold;
                   color:${INDIGO};line-height:28px;mso-line-height-rule:exactly;
                   white-space:nowrap;padding-bottom:2px;">
          ${fullName || 'Full Name'}
        </td>
      </tr>
      <tr>
        <td style="font-family:Arial,sans-serif;font-size:13px;color:#888888;
                   line-height:20px;mso-line-height-rule:exactly;
                   white-space:nowrap;padding-bottom:16px;">
          ${role || 'Job Title'}
        </td>
      </tr>
      ${emailRow}
      ${websiteRow}
      ${phoneRow}
      ${socialRow}
    </table>
  </td>`

  // ── COLUMN 3: JG Logo ────────────────────────────────────────────────────────
  const logoCell = `<td width="200" valign="middle" align="right"
    style="width:200px;padding-top:24px;padding-right:24px;padding-bottom:24px;
           padding-left:24px;vertical-align:middle;text-align:right;
           mso-table-lspace:0pt;mso-table-rspace:0pt;">
    <a href="https://josephinegarrickltd.com" target="_blank"
      style="display:block;text-decoration:none;">
      <img src="${images.jgLogo}" height="110"
        style="display:block;margin-left:auto;height:110px;" alt="Josephine Garrick LTD">
    </a>
  </td>`

  // ── BOTTOM BANNER ────────────────────────────────────────────────────────────
  const brandCells = BRANDS.map(b => {
    const favSrc = images[b.fav as keyof SignatureImages]
    return `<td style="text-align:center;width:25%;vertical-align:middle;" valign="middle" align="center">
      <table cellpadding="0" cellspacing="0" border="0"
        style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;margin:0 auto;">
        <tr>
          <td align="center" style="padding-bottom:6px;text-align:center;">
            <a href="${b.url}" target="_blank"
              style="display:block;text-decoration:none;">
              <img src="${favSrc}" height="28"
                style="display:block;margin:0 auto;height:28px;" alt="${b.label}">
            </a>
          </td>
        </tr>
        <tr>
          <td align="center" style="text-align:center;">
            <a href="${b.url}" target="_blank"
              style="color:#ffffff;font-family:Arial,sans-serif;font-size:11px;
                     font-weight:bold;text-decoration:underline;letter-spacing:0.5px;
                     text-transform:uppercase;">
              ${b.label}
            </a>
          </td>
        </tr>
      </table>
    </td>`
  }).join('')

  const banner = `<tr>
    <td colspan="3"
      style="background-color:${INDIGO};padding-top:14px;padding-right:20px;
             padding-bottom:14px;padding-left:20px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%"
        style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;
               width:100%;">
        <tr>
          ${brandCells}
        </tr>
      </table>
    </td>
  </tr>`

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="680"
    style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;
           background-color:#ffffff;font-family:Arial,sans-serif;
           color-scheme:light;width:680px;">
    <tr>
      ${photoCell}
      ${infoCell}
      ${logoCell}
    </tr>
    ${banner}
  </table>`
}
