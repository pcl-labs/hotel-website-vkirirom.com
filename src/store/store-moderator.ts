export default function configureModerator(store, router) {
  // listen to mutations
  store.subscribe(({ type, payload }, state) => {
    /* eslint-disable */
    switch (type) {
      case 'auth/logout':
        return store.commit('booking/resetState');
    }
    /* eslint-enable */
  });
  // listen to actions
  // store.subscribeAction(({ type, payload }, state) => {
  //   switch (type) {
  //     case 'auth/logout':
  //       return router.push('/auth/signin');
  //   }
  // });
}
