import { SUPPORTED_LOCALES } from '../i18n'

const COUNTRY_TO_LOCALE = {
  AT: 'de', DE: 'de', CH: 'de', LI: 'de',
  GB: 'en', US: 'en', IE: 'en', AU: 'en', NZ: 'en', CA: 'en',
  PL: 'pl',
  AL: 'sq', XK: 'sq',
  SA: 'ar', AE: 'ar', EG: 'ar', MA: 'ar', DZ: 'ar', TN: 'ar', IQ: 'ar', JO: 'ar', LB: 'ar', SY: 'ar', YE: 'ar', QA: 'ar', KW: 'ar', BH: 'ar', OM: 'ar', LY: 'ar', SD: 'ar', PS: 'ar',
  HR: 'hr', BA: 'hr',
  TR: 'tr',
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru',
}

const getCurrentPosition = (timeoutMs = 8000) =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { timeout: timeoutMs, maximumAge: 60000 },
    )
  })

const reverseGeocode = async (lat, lng) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=3&addressdetails=1`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`Nominatim error ${res.status}`)
  const data = await res.json()
  return data?.address?.country_code?.toUpperCase() ?? null
}

export const detectLocaleFromGeo = async () => {
  const { lat, lng } = await getCurrentPosition()
  const country = await reverseGeocode(lat, lng)
  if (!country) return null
  const locale = COUNTRY_TO_LOCALE[country] ?? null
  return SUPPORTED_LOCALES.includes(locale) ? locale : null
}

export const detectLocaleFromBrowser = () => {
  const lang = (navigator.language || '').slice(0, 2).toLowerCase()
  return SUPPORTED_LOCALES.includes(lang) ? lang : null
}
