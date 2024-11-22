function Banner({ searchTerm, setSearchTerm }) {
  return (
    <section className="bg-gradient-to-br from-blue-900 to-purple-700 dark:from-gray-900 dark:to-gray-800 text-white">
      <div className="mx-auto w-full px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl">
            Explore the CryptoPulse
            <span className="block mt-2 text-lg font-normal text-gray-200 sm:text-xl">
              Dive into your favorite cryptocurrencies and stay informed.
            </span>
          </h1>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <input
              type="text"
              placeholder="Search for cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-lg rounded-lg bg-gray-100 dark:bg-gray-950 px-5 py-3 text-gray-800 dark:text-gray-100 shadow-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
