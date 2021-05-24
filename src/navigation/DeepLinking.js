import { useLayoutEffect } from 'react';
import * as Linking from 'expo-linking';

/*
  Add new links here.

  Key of each link should be the base pathname.
  Query should be a set of the query parameters the link must have.
  Screen is where the app should navigate once the deeplink is resolved.
*/
const links = {
  '/chat/post': {
    query: new Set(['id']),
    screen: 'ChatChannelPostDetails',
  },
};

export function useDeepLinking(navigationRef) {
  useLayoutEffect(() => {
    if (navigationRef.current == null) {
      return;
    }

    (async () => {
      const { pathname, searchParams } = new URL(await Linking.getInitialURL());
      const link = links[pathname];
      if (link == null) {
        console.warn('[DEEPLINKS] Invalid pathname for deeplink.');
        return;
      }

      // validate it matches the link's query params
      for (const param of link.query) {
        if (!searchParams.get(param)) {
          console.warn(
            '[DEEPLINKS] Missing or invalid query params for deeplink.'
          );
          return;
        }
      }

      // navigate to screen
      navigationRef.current.navigate(
        link.screen,
        Array.from(link.query).map((param) => ({
          [param]: searchParams.get(param),
        }))
      );
    })();
  }, [navigationRef]);
}
