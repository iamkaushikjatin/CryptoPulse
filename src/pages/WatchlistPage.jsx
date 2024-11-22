import { useEffect, useState, useContext } from "react";
import { auth } from "../firebase.config";
import Table from "../components/CoinTable";
import SubscriptionContext from "../contexts/SubscriptionContext";
import CryptoContext from "../contexts/CryptoContext";

export default function WatchlistPage() {
  const { watchedCoins } = useContext(SubscriptionContext);
  const { allCoins } = useContext(CryptoContext);
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    const newFilteredCoins = watchedCoins
      .map((subscription) =>
        allCoins.filter((coin) => subscription.includes(coin.uuid))
      )
      .flat();

    setFilteredCoins(newFilteredCoins);
  }, [watchedCoins, allCoins]);

  return (
    <>
      {auth.currentUser ? (
        <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:to-gray-800 min-h-screen">
          <section className="py-16 text-white">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
                Welcome to Your Watchlist
              </h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                View and manage the cryptocurrencies you are tracking.
              </p>
            </div>
          </section>

          <section className="mt-12">
            {filteredCoins.length > 0 ? (
              <div className="container mx-auto px-4">
                <Table data={filteredCoins} />
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                  No coins in your watchlist yet.
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Add some to track their performance!
                </p>
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-950">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Please log in to view your watchlist.
          </p>
        </div>
      )}
    </>
  );
}
