import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import {
  arrayUnion,
  arrayRemove,
  updateDoc,
  setDoc,
  getDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "./firebase.config";
import Navbar from "./components/shared/Navbar";
import AuthChecker from "./components/AuthChecker";
import SubscriptionContext from "./contexts/SubscriptionContext";
import CryptoContext from "./contexts/CryptoContext";
import routes from "./routes";
import "./firebase.config";
import axios from "axios";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            route.protected ? (
              <AuthChecker>
                <route.component />
              </AuthChecker>
            ) : (
              <route.component />
            )
          }
        />
      ))}
    </Route>
  )
);

function App() {
  const [watchedCoins, setWatchedCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);

  const fetchAllCoins = async () => {
    try {
      const response = await axios.get(
        `https://api.coinranking.com/v2/coins?timePeriod=7d`,
        {
          headers: {
            "x-access-token": `${import.meta.env.VITE_COINRANKING_APIKEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const coinsData = response.data.data.coins;
      setAllCoins(coinsData);
    } catch (error) {
      console.error(error);
    }
  };

  const [value, loading, error] = useDocument(
    doc(db, "subscriptions", auth.currentUser?.uid || "null")
  );

  const createNewSubscriptions = async () => {
    const currentUserId = auth.currentUser?.uid;

    const userRef = doc(db, "subscriptions", currentUserId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        coins: [],
        updatedTime: serverTimestamp(),
        createdTime: serverTimestamp(),
        userId: auth.currentUser?.uid,
      });
    }
  };

  useEffect(() => {
    if (value) {
      setWatchedCoins(value?.data()?.coins || []);
    }
  }, [value, loading, error]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        createNewSubscriptions();
        fetchAllCoins();
      } else {
        setWatchedCoins([]);
        fetchAllCoins();
      }
    });
  }, []);

  const handleAddToWatchlist = async (coinId, watchedCoins) => {
    const userRef = doc(db, "subscriptions", auth.currentUser?.uid);

    if (watchedCoins.includes(coinId)) {
      await updateDoc(userRef, {
        coins: arrayRemove(coinId),
      });
    } else {
      await updateDoc(userRef, {
        coins: arrayUnion(coinId),
      });
    }
  };

  return (
    <CryptoContext.Provider value={{ allCoins: allCoins }}>
      <SubscriptionContext.Provider
        value={{
          watchedCoins: watchedCoins,
          handleAddToWatchlist: handleAddToWatchlist,
        }}
      >
        <RouterProvider router={router} />
      </SubscriptionContext.Provider>
    </CryptoContext.Provider>
  );
}

export default App;
