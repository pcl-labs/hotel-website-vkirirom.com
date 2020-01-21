import { ajax } from '@/connection/ajax'
import { sendGridAPIKey } from '@/constants/app'

export default {
  namespaced: true,
  state: {},
  mutations: {
    updateResponse(state, payload) {
      state.response = payload
    }
  },
  actions: {
    send(context, payload) {
      const data = {
        personalizations: [{ to: [{ email: 'm.ziaeemehr@gmail.com' }] }],
        from: { email: 'mort@whynot.earth' },
        subject: 'Hello, World!',
        content: [{ type: 'text/plain', value: 'Heya!' }]
      }
      ajax
        .post('https://api.sendgrid.com/v3/mail/send', {
          data,
          headers: {
            authorization: 'Bearer ' + 'sendGridAPIKeyTODO:',
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          context.commit('updateResponse', response)
        })
    }
  },
  getters: {
    // getSizing(state) {
    //   return state.sizing
    // }
  }
}
