import AppRouter from "./Router";
import GlobalStyles from "./GlobalStyles";
import { useState } from "react";

const App = () => {
  const [init, setInit] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {init ? (
        <>
          <GlobalStyles />
          <AppRouter />
          {/* <Footer /> */}
        </>
      ) : (
        //TODO: 추후 로딩 애니메이션 넣어야함
        "Loading..."
      )}
    </>
  );
};

export default App;
