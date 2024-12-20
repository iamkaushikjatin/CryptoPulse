import { useEffect, useState, useContext } from "react";
import Table from "../components/CoinTable";

6;
import Banner from "../components/Banner";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 

  useEffect(() => {

    async function requestCoins() {
      const res = await fetch(
        `https://api.coinranking.com/v2/coins?timePeriod=7d`,
        {
          headers: {
            "x-access-token": `${import.meta.env.VITE_COINRANKING_APIKEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      setData(json.data.coins);
      setFilteredData(json.data.coins);
    }
    requestCoins();
  }, []);

  useEffect(() => {
    if (!searchTerm) return setFilteredData(data);

    const filtered = data.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <div className="home-container">
      <Banner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="coin-table">
        <Table data={filteredData} />
      </div>
    </div>
  );
};

export default Home;
