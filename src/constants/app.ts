import { EmailAddress } from '@/types'

export const companyId = 1
export const appTitle = 'vKirirom Pine Resort'
export const appTitleTemplate = `%s | ${appTitle}`
export const companySlug = 'vkirirom'
export const emailAPIBase = 'https://express-502501.netlify.com/.netlify/functions/server'
export const reservationSuccessEmailTemplateId = 'd-32727d7e06ac4e7faa1b0e8fb1b99afa'
export const reservationFailEmailTemplateId = 'd-567b15397bed4e75a14987abd125351f'
export const languageCodes = ['en', 'kh']

let reservationEmailsBcc: EmailAddress[] = process.env.VUE_APP_EMAIL_BCC_LIST.split(',').map(item => ({
  email: item
}))

if (process.env.VUE_APP_DEV_MODE == 1) {
  reservationEmailsBcc = [
    {
      email: process.env.VUE_APP_EMAIL_DEV
    }
  ]
}
export { reservationEmailsBcc }
