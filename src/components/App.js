import React, { useEffect, useState } from "react";
import AppRouter from "./router";

// firebase auth
import { AuthService } from "fbase";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AuthService.onAuthStateChanged((user) => {
      if (user) {
        // Sign in...
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(true);
    });
  }, []);

  return (
    <>
      {loading ?
        <AppRouter isLoggedIn={isLoggedIn} />
        :
        <div>
          <span>Loading...</span>
        </div>
      }
    </>
  );

}

export default App;
