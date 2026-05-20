import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { defaultLocale } from '@/config/i18n'

interface FooterProps {
  locale?: string
}

export async function Footer({ locale = defaultLocale }: FooterProps) {
  const tFoot = await getTranslations({ locale, namespace: 'footer' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  const prefix = locale === defaultLocale ? '' : `/${locale}`

  return (
    <footer className="border-t border-line mt-12 py-8 px-[22px]">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-md">
            <span
              className="inline-flex items-center gap-2 mb-2"
              style={{
                fontWeight: 600,
                color: 'var(--green)',
                background: 'var(--green-soft)',
                padding: '4px 10px',
                borderRadius: 999,
                fontSize: 12,
              }}
            >
              <span style={{ color: 'var(--green)', fontSize: 14, lineHeight: 1 }}>●</span>
              {tFoot('badgeIndependent')}
            </span>
            <div className="logo-mark mb-1">
              Cancel<span>Hub</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-3)' }}>{tFoot('tagline')}</p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-6">
            <div>
              <h4
                style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--ink-3)',
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {tFoot('colGuides')}
              </h4>
              <Link href={`${prefix}/cancel`} className="block py-[3px] text-[13.5px] ink hover:accent transition-colors">
                {tNav('allGuides')}
              </Link>
              <Link href={`${prefix}/categories`} className="block py-[3px] text-[13.5px] ink hover:accent transition-colors">
                {tNav('categories')}
              </Link>
              <Link href={`${prefix}/rankings`} className="block py-[3px] text-[13.5px] ink hover:accent transition-colors">
                {tNav('rankings')}
              </Link>
            </div>
            <div>
              <h4
                style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--ink-3)',
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {tFoot('colCompany')}
              </h4>
              <Link href={`${prefix}/about`} className="block py-[3px] text-[13.5px] ink hover:accent transition-colors">
                {tFoot('about')}
              </Link>
              <Link href={`${prefix}/contact`} className="block py-[3px] text-[13.5px] ink hover:accent transition-colors">
                {tFoot('contact')}
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mt-7 pt-4 border-t border-line"
          style={{ fontSize: 12.5, color: 'var(--ink-3)' }}
        >
          © {new Date().getFullYear()} CancelHub · {tFoot('rightsSuffix')}
        </div>
      </div>
    </footer>
  )
}
