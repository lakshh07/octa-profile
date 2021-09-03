import React, { useState, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Start from "./components/Start";
import Main from "./components/Main";
import GhPolyglot from "gh-polyglot";

function App() {
  const [error, setError] = useState({ active: false, type: 200 });
  const [userData, setUserData] = useState(null);
  const [langData, setLangData] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [rateLimit, setRateLimit] = useState(null);

  const getUserData = (username) => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (response.status === 404) {
          return setError({ active: true, type: 404 });
        }
        if (response.status === 403) {
          return setError({ active: true, type: 403 });
        }
        return response.json();
      })
      .then((json) => {
        setUserData(json);
        console.log(json);
      })
      .catch((error) => {
        setError({ active: true, type: 400 });
        console.error("Error:", error);
      });
  };

  const getLangData = (username) => {
    const me = new GhPolyglot(`${username}`);
    me.userStats((err, stats) => {
      if (err) {
        console.error("Error:", err);
        setError({ active: true, type: 400 });
      }
      setLangData(stats);
      console.log(stats);
    });
  };

  const getRepoData = (username) => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((response) => {
        if (response.status === 404) {
          return setError({ active: true, type: 404 });
        }
        if (response.status === 403) {
          return setError({ active: true, type: 403 });
        }
        return response.json();
      })
      .then((json) => {
        setRepoData(json);
        console.log(json);
      })
      .catch((error) => {
        setError({ active: true, type: 200 });
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch(`https://api.github.com/rate_limit`)
      .then((response) => response.json())
      .then((json) => {
        setRateLimit(json.resources.core);
        console.log(json.resources.core);
        if (json.resources.core.remaining < 1) {
          setError({ active: true, type: 403 });
        }
      });

    console.log("error :", error);
  }, [error]);

  return (
    <ChakraProvider>
      <Router>
        <Route exact path="/">
          <Start
            getLangData={getLangData}
            getUserData={getUserData}
            getRepoData={getRepoData}
            userData={userData}
          />
        </Route>
        <Route exact path="/user/:username">
          <Main
            rateLimit={rateLimit}
            repoData={repoData}
            langData={langData}
            userData={userData}
          />
        </Route>
      </Router>
    </ChakraProvider>
  );
}

export default App;
