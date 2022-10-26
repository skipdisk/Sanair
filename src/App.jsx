import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

//layout
import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import { auth, app } from "config/fbconfig";
import { useAuth } from "hooks/useAuth";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { addStations } from "store/map/slice";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, getStationsData } from "services/firebase";
import { setUser } from "store/userData/slice";
import { selectUser } from "store/userData/selectors";

const App = () => {
  const { currentUser, isLoading } = useAuth(app);
  const userData = useSelector(selectUser);
  const [loadingStations, setLoadingStations] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingStations(true);

      const stations = await getStationsData();

      if (currentUser && !userData.email) {
        const user = await getUserData();
        dispatch(setUser({ ...user }));
      }

      dispatch(addStations({ ...stations }));
    };

    fetchData().then(() => {
      dispatch(setLoadingStations(false));
    });
  }, [currentUser, dispatch, userData.email]);

  if (isLoading || loadingStations) return <LoadingSpinner />;

  const AppWithAuth = () => {
    if (auth && auth.currentUser) {
      return (
        <Switch>
          <Route
            path="/admin"
            render={(props) => (
              <AdminLayout currentUser={currentUser} {...props} />
            )}
          />
          <Redirect from="/" to="/admin/index" />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth" />
        </Switch>
      );
    }
  };

  return <AppWithAuth />;
};

export default App;
