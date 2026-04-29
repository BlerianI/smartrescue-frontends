import { ref, computed } from 'vue'
import de from './messages/de.json'
import en from './messages/en.json'
import pl from './messages/pl.json'
import sq from './messages/sq.json'
import ar from './messages/ar.json'
import hr from './messages/hr.json'
import tr from './messages/tr.json'
import ru from './messages/ru.json'

const messages = { de, en, pl, sq, ar, hr, tr, ru }

export const SUPPORTED_LOCALES = ['de', 'en', 'pl', 'sq', 'ar', 'hr', 'tr', 'ru']
export const RTL_LOCALES = ['ar']
const STORAGE_KEY = 'smartrescue.locale'
const DEFAULT_LOCALE = 'de'

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
const initial = SUPPORTED_LOCALES.includes(stored) ? stored : DEFAULT_LOCALE

const locale = ref(initial)

const resolveKey = (obj, path) => path.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), obj)

const t = (key) => {
  const current = messages[locale.value]
  const fallback = messages[DEFAULT_LOCALE]
  return resolveKey(current, key) ?? resolveKey(fallback, key) ?? key
}

const setLocale = (next) => {
  if (!SUPPORTED_LOCALES.includes(next)) return
  locale.value = next
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // ignore
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = next
    document.documentElement.dir = RTL_LOCALES.includes(next) ? 'rtl' : 'ltr'
  }
}

const isRtl = computed(() => RTL_LOCALES.includes(locale.value))

if (typeof document !== 'undefined') {
  document.documentElement.lang = locale.value
  document.documentElement.dir = RTL_LOCALES.includes(locale.value) ? 'rtl' : 'ltr'
}

export const useI18n = () => ({ locale, t, setLocale, isRtl })
