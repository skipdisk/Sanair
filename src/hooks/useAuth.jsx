import { useEffect, useState } from "react";

import { auth } from "config/fbconfig";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // User logged in
        setTimeout(() => {
          setLoading(false);
          setCurrentUser(userAuth);
        }, 500);
      } else {
        // User logged out
        setTimeout(() => {
          setLoading(false);
          setCurrentUser(null);
        }, 500);
      }
    });

    return unsubscribe;
  }, []);

  return { currentUser, isLoading };
};
