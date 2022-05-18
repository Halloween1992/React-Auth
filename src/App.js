import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./Store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  const { isLoggedIn } = authCtx;

  return (
    <Layout>
      <Switch>
        {isLoggedIn && (
          <>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/profile">
              <UserProfile />
            </Route>
          </>
        )}
        {!isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        <Route path={"*"}>
          <Redirect to={"/auth"} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
