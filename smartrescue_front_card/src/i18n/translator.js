import { reactive } from 'vue'
import { useI18n } from './index'

const DEEPL_KEY = import.meta.env.VITE_DEEPL_API_KEY
const DEEPL_URL = import.meta.env.VITE_DEEPL_URL || 'https://api-free.deepl.com/v2/translate'

const TARGET_MAP = { de: 'DE', en: 'EN-US', pl: 'PL', ar: 'AR', tr: 'TR', ru: 'RU' }
const STORAGE_KEY = 'smartrescue.translation_cache'
const FLUSH_DELAY_MS = 50

const loadCache = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

const cache = reactive(loadCache())

let saveTimer = null
const persistCache = () => {
  clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cache))
    } catch {
      // localStorage voll oder nicht verfügbar
    }
  }, 200)
}

const pending = new Map()
const inFlight = new Set()
let flushTimer = null

const ensureLocale = (locale) => {
  if (!cache[locale]) cache[locale] = {}
}

const scheduleFlush = () => {
  if (flushTimer) return
  flushTimer = setTimeout(flush, FLUSH_DELAY_MS)
}

const flush = async () => {
  flushTimer = null
  for (const [locale, set] of pending.entries()) {
    if (!set.size) continue
    const texts = [...set]
    set.clear()
    texts.forEach((t) => inFlight.add(`${locale}::${t}`))

    try {
      const params = new URLSearchParams()
      params.append('target_lang', TARGET_MAP[locale])
      texts.forEach((t) => params.append('text', t))

      const res = await fetch(DEEPL_URL, {
        method: 'POST',
        headers: {
          Authorization: `DeepL-Auth-Key ${DEEPL_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      })

      if (!res.ok) throw new Error(`DeepL HTTP ${res.status}`)
      const data = await res.json()
      ensureLocale(locale)
      data.translations.forEach((entry, i) => {
        cache[locale][texts[i]] = entry.text
      })
      persistCache()
    } catch (err) {
      console.error('DeepL translate failed:', err)
    } finally {
      texts.forEach((t) => inFlight.delete(`${locale}::${t}`))
    }
  }
}

const queueTranslation = (text, locale) => {
  const key = `${locale}::${text}`
  if (inFlight.has(key)) return
  if (!pending.has(locale)) pending.set(locale, new Set())
  pending.get(locale).add(text)
  scheduleFlush()
}

export const useTranslator = () => {
  const { locale } = useI18n()

  const tr = (text) => {
    if (!text || typeof text !== 'string') return text
    const loc = locale.value
    if (!TARGET_MAP[loc]) return text
    if (!DEEPL_KEY) return text

    const cached = cache[loc]?.[text]
    if (cached !== undefined) return cached

    queueTranslation(text, loc)
    return text
  }

  return { tr }
}
