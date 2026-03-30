import type { SignatureImages } from '@/types/signature'

// ── Brand constants ────────────────────────────────────────────────────────────
export const BRAND       = '#7f51ff'
export const BANNER_BG   = '#6438cc'   // non-negotiable: product banner always this
export const BANNER_RULE = '#5e35b1'   // hairline between body and banner

// ── TargetPoint logo badge ─────────────────────────────────────────────────────
// targetpoint.png has transparent bg → must always sit inside a solid pill.
// bgColor defaults to white; pass BRAND (#7f51ff) for templates with dark bodies.
export function tpBadge(src: string, bgColor = '#ffffff'): string {
  return `<table cellpadding="0" cellspacing="0" border="0"
      style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
    <tr>
      <td style="background-color:${bgColor};padding-top:6px;padding-right:10px;
                 padding-bottom:6px;padding-left:10px;border-radius:4px;">
        <a href="https://targetpoint.fr" target="_blank"
          style="display:block;text-decoration:none;">
          <img src="${src}" height="26"
            style="display:block;height:26px;" alt="Target Point">
        </a>
      </td>
    </tr>
  </table>`
}

// ── Contact row — icon badge + linked label ────────────────────────────────────
interface ContactOpts {
  textColor?: string   // label + link color
  badgeColor?: string  // icon badge background
  bottomPad?: boolean
}
export function contactRow(
  entity: string,
  href: string,
  label: string,
  { textColor = '#ffffff', badgeColor = '#9575ff', bottomPad = true }: ContactOpts = {}
): string {
  return `<tr>
    <td${bottomPad ? ' style="padding-bottom:8px;"' : ''}>
      <table cellpadding="0" cellspacing="0" border="0"
        style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr>
          <td width="20" height="20" align="center" valign="middle"
            style="width:20px;height:20px;background-color:${badgeColor};
                   text-align:center;vertical-align:middle;
                   font-family:Arial,sans-serif;font-size:11px;
                   color:#ffffff;line-height:20px;mso-line-height-rule:exactly;">
            ${entity}
          </td>
          <td style="padding-left:8px;font-family:Arial,sans-serif;font-size:12px;
                     color:${textColor};line-height:18px;mso-line-height-rule:exactly;
                     white-space:nowrap;vertical-align:middle;" valign="middle">
            <a href="${href}"
              style="color:${textColor};text-decoration:none;
                     font-family:Arial,sans-serif;font-size:12px;
                     line-height:18px;mso-line-height-rule:exactly;">
              ${label}
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>`
}

// ── Product banner (non-negotiable: always BANNER_BG #6438cc) ─────────────────
interface ProdEntry { src: string; href: string; alt: string }

function prodCells(list: ProdEntry[]): string {
  return list
    .map((p, i) => {
      const div = i > 0
        ? `<td width="1" style="width:1px;background-color:#9575ff;font-size:0;
               line-height:0;mso-line-height-rule:exactly;" width="1">&nbsp;</td>`
        : ''
      const pL = i > 0                   ? 'padding-left:16px;'  : ''
      const pR = i < list.length - 1     ? 'padding-right:16px;' : ''
      return `${div}<td style="vertical-align:middle;${pL}${pR}" valign="middle">
          <a href="${p.href}" target="_blank" style="display:block;text-decoration:none;">
            <img src="${p.src}" height="26" style="display:block;height:26px;" alt="${p.alt}">
          </a>
        </td>`
    })
    .join('')
}

export function productBanner(
  images: SignatureImages,
  products: { weExport: boolean; tripnbusiness: boolean; weXperience: boolean },
  colCount: number
): string {
  const active: ProdEntry[] = [
    products.weExport      ? { src: images.weExport,      href: 'https://www.we-export.com',      alt: 'We Export' }      : null,
    products.tripnbusiness ? { src: images.tripnbusiness, href: 'https://www.tripnbusiness.com',   alt: 'Trip N Business' } : null,
    products.weXperience   ? { src: images.weXperience,   href: 'https://we-xperience.com',        alt: 'We Xperience' }   : null,
  ].filter((p): p is ProdEntry => p !== null)

  if (!active.length) return ''

  return `<tr>
    <td colspan="${colCount}" height="1"
      style="height:1px;background-color:${BANNER_RULE};font-size:0;
             line-height:0;mso-line-height-rule:exactly;" height="1">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="${colCount}"
      style="background-color:${BANNER_BG};padding-top:12px;padding-right:20px;
             padding-bottom:12px;padding-left:20px;">
      <table cellpadding="0" cellspacing="0" border="0"
        style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr>${prodCells(active)}</tr>
      </table>
    </td>
  </tr>`
}
