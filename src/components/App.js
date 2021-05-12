import React, { useEffect, useState } from "react";
import AppRouter from "./router";

// firebase auth
import { AuthService } from "fbase";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    AuthService.onAuthStateChanged((user) => {
      if (user) {
        // Sign in...
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(true);
    });
  }, []);

  return (
    <>
      {loading ?
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
        :
        <div>
          <span>Loading...</span>
        </div>
      }
    </>
  );

}

export default App;
