// JG — white body, circular gold-bordered photo, indigo name, gold social circles, indigo banner
import type { SignatureData, SignatureImages } from '@/types/signature'
import { clampText, whatsappHref } from './shared'

function contactIconBadge(src: string, alt: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
    <tr>
      <td width="24" height="24" align="center" valign="middle"
        style="width:24px;height:24px;background-color:#c79437;border-radius:50%;text-align:center;vertical-align:middle;">
        <img src="${src}" width="12" height="12" border="0"
          style="display:block;margin:0 auto;width:12px;height:12px;" alt="${alt}">
      </td>
    </tr>
  </table>`
}

const INDIGO = '#2f25ba'
const GOLD   = '#c79437'

// ── Brand banner entries ───────────────────────────────────────────────────────
const BRANDS = [
  { fav: 'targetpointFav',   url: 'https://targetpoint.fr',            label: 'TARGET POINT'  },
  { fav: 'tripnbusinessFav', url: 'https://www.tripnbusiness.com',      label: 'TRIPNBUSINESS' },
  { fav: 'weExportFav',      url: 'https://www.we-export.com',          label: 'WE EXPORT'     },
  { fav: 'weImportFav',      url: 'https://www.we-import.fr',          label: 'WE IMPORT'     },
] as const

export function buildJG(data: SignatureData, images: SignatureImages): string {
  const { fullName, role, phone, email, photoBase64, socials } = data
  const hasSocials = !!(socials.linkedin || socials.instagram || socials.facebook)
  const website = 'https://www.josephinegarrick.com/'
  const websiteLabel = 'www.josephinegarrick.com'

  // ── COLUMN 1: Photo (Fixed 120px) ──────────────────────────────────────────
  const photoInner = photoBase64
    ? `<img src="${photoBase64}" width="110" height="110"
         style="display:block;border-radius:50%;border:2px solid ${GOLD};
                width:110px;height:110px;object-fit:cover;" alt="${fullName}">`
    : `<table cellpadding="0" cellspacing="0" border="0"
         style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
         <tr>
           <td width="110" height="110"
             style="width:110px;height:110px;border-radius:50%;border:2px solid ${GOLD};
                    font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td>
         </tr>
       </table>`

  const photoCell = `<td width="120" height="150" valign="middle" align="center"
    style="width:120px;height:150px;vertical-align:middle;text-align:center;padding:0 5px;">
    ${photoInner}
  </td>`

  // ── COLUMN 2: Info block (Fixed 280px) ────────────────────────────────────
  const socialPlatforms = [
    socials.linkedin  ? { url: socials.linkedin,  src: images.linkedin,  alt: 'LinkedIn'  } : null,
    socials.instagram ? { url: socials.instagram, src: images.instagram, alt: 'Instagram' } : null,
    socials.facebook  ? { url: socials.facebook,  src: images.facebook,  alt: 'Facebook'  } : null,
  ].filter((s): s is NonNullable<typeof s> => s !== null)

  const socialCells = socialPlatforms.map(s =>
    `<td style="padding-right:6px;">
      <table cellpadding="0" cellspacing="0" border="0"
        style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr>
          <td width="24" height="24" align="center" valign="middle"
            style="width:24px;height:24px;background-color:${GOLD};border-radius:50%;
                   text-align:center;vertical-align:middle;">
            <a href="${s.url}" target="_blank" style="text-decoration:none;display:block;">
              <img src="${s.src}" width="12" height="14" border="0"
                style="display:block;margin:0 auto;width:12px;height:14px;" alt="${s.alt}">
            </a>
          </td>
        </tr>
      </table>
    </td>`
  ).join('')

  const infoCell = `<td width="280" height="150" valign="top"
    style="width:280px;height:150px;vertical-align:top;padding:15px 10px 15px 15px;
           border-left:1px solid ${INDIGO};">
    <table cellpadding="0" cellspacing="0" border="0"
      style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;">
      <tr>
        <td style="font-family:Arial,sans-serif;font-size:20px;font-weight:bold;
                   color:${INDIGO};line-height:24px;mso-line-height-rule:exactly;
                   padding-bottom:1px;white-space:nowrap;">
          ${clampText(fullName || 'Full Name', 35)}
        </td>
      </tr>
      <tr>
        <td style="font-family:Arial,sans-serif;font-size:13px;color:#666666;
                   line-height:16px;mso-line-height-rule:exactly;
                   padding-bottom:10px;white-space:nowrap;">
          ${clampText(role || 'Job Title', 45)}
        </td>
      </tr>
      <tr>
        <td style="padding-bottom:5px;">
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
            <tr>
              <td width="24" valign="middle">${contactIconBadge(images.emailIconWh, 'Email')}</td>
              <td style="font-family:Arial,sans-serif;font-size:11px;color:#333333;padding-left:6px;white-space:nowrap;">
                ${email ? `<a href="mailto:${email}" style="color:#333333;text-decoration:none;">${clampText(email, 35)}</a>` : '&nbsp;'}
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom:5px;">
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
            <tr>
              <td width="24" valign="middle">${contactIconBadge(images.telephoneIconWh, 'Phone')}</td>
              <td style="font-family:Arial,sans-serif;font-size:11px;color:#333333;padding-left:6px;white-space:nowrap;">
                ${phone ? `<a href="${whatsappHref(phone)}" target="_blank" style="color:#333333;text-decoration:none;">${phone}</a>` : '&nbsp;'}
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom:8px;">
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
            <tr>
              <td width="24" valign="middle">${contactIconBadge(images.globeIconWh, 'Website')}</td>
              <td style="font-family:Arial,sans-serif;font-size:11px;color:#333333;padding-left:6px;white-space:nowrap;">
                <a href="${website}" target="_blank" style="color:#333333;text-decoration:none;">${websiteLabel}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td height="24">
          ${hasSocials ? `<table cellpadding="0" cellspacing="0" border="0"><tr>${socialCells}</tr></table>` : '&nbsp;'}
        </td>
      </tr>
    </table>
  </td>`

  // ── COLUMN 3: JG Logo (Fixed 160px) ────────────────────────────────────────
  const logoCell = `<td width="160" height="150" valign="middle" align="center"
    style="width:160px;height:150px;padding:2px;vertical-align:middle;text-align:center;">
    <a href="https://www.josephinegarrick.com/" target="_blank"
      style="display:block;text-decoration:none;margin:0 auto;">
      <img src="${images.jgLogo}" width="155"
        style="display:block;width:155px;height:auto;object-fit:contain;margin:0 auto;" alt="Josephine Garrick LTD">
    </a>
  </td>`

  // ── BOTTOM BANNER (Fixed 30px) ─────────────────────────────────────────────
  const brandCells = BRANDS.map(b => {
    const favSrc = images[b.fav as keyof SignatureImages]
    return `<td align="center" style="padding: 2px 4px;">
      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
        <tr>
          <td valign="middle" style="padding-right:3px;">
            <a href="${b.url}" target="_blank" style="display:block;">
              <img src="${favSrc}" width="12" height="12" style="display:block;width:12px;height:12px;" alt="${b.label}">
            </a>
          </td>
          <td valign="middle" style="white-space:nowrap;">
            <a href="${b.url}" target="_blank"
              style="color:#ffffff;font-family:Arial,sans-serif;font-size:7px;
                     font-weight:bold;text-decoration:none;text-transform:uppercase;letter-spacing:0.1px;white-space:nowrap;">
              ${b.label}
            </a>
          </td>
        </tr>
      </table>
    </td>`
  }).join('')

  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" height="180"
    style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;
           background-color:#ffffff;font-family:Arial,sans-serif;
           color-scheme:light;width:560px;height:180px;table-layout:fixed;">
    <tr>
      ${photoCell}
      ${infoCell}
      ${logoCell}
    </tr>
    <tr>
      <td colspan="3" height="30" style="background-color:${INDIGO};padding:0 10px;height:30px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
          <tr>
            ${brandCells}
          </tr>
        </table>
      </td>
    </tr>
  </table>`
}
