import { useState, useEffect } from "react";
import { useCharacters }   from "../hooks/useCharacters";
import CharacterCard from "../components/CharacterCard";
import CharacterModalCard from "../components/CharacterModalCard";
import SearchBar from "../components/SearchBar";
import FilterCard from "../components/FilterCard";
import Pagination from "../components/Pagination";
import AuthCard from "../components/AuthCard";

const Index = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ homeworld: "", film: "", species: "" });
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [token, setToken] = useState(null);

  const { characters, loading, error, totalPages } = useCharacters(page, search, filters);

  useEffect(() => {
    const storedToken = localStorage.getItem("swToken");
    if (storedToken) {
      try {
        const decoded = JSON.parse(atob(storedToken));
        if (decoded.exp > Date.now()) {
          setToken(storedToken);
        } else {
          localStorage.removeItem("swToken");
        }
      } catch {
        localStorage.removeItem("swToken");
      }
    }
  }, []);
  // 🔄 Silent Token Refresh
useEffect(() => {
  const token = localStorage.getItem("swToken");
  if (!token) {

        return;
    }

  const decoded = JSON.parse(atob(token));


  const timeLeft = decoded.exp - Date.now();
  console.log(timeLeft);

  if (timeLeft <= 0) {
    logout();
    return;
  }

  const refreshTimer = setTimeout(() => {
    console.log("Silently refreshing token...");

   
    const refreshedToken = btoa(
      JSON.stringify({
        email: decoded.email,
        exp: Date.now() + (60 * 60 * 1000), // increase 1 hour
      })
    );
    console.log("In the timeout");
    setToken(refreshedToken);
    localStorage.setItem("swToken", refreshedToken);

  }, 
//   5000
  timeLeft - 5000
  
); //5 sec

  return () => clearTimeout(refreshTimer);
}, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("swToken", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("swToken");
  };

  const handleSearch = (query) => {
    setSearch(query);
    setPage(1);
  };

  const handleFilterChange = (newFilters) => {
    console.log('lk',newFilters);
    setFilters(newFilters);
    // setPage(1);
  };

  return (
    <div className="min-h-screen pb-12">
   
      <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary text-glow">
              Star Wars Explorer
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Discover characters from a galaxy far, far away
            </p>
          </div>

          {token ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:scale-105 transition-all"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 hover:glow-gold transition-all duration-300"
            >
              Login
            </button>
          )}
        </div>
      </header>


      <main className="container mx-auto px-4 py-8 space-y-8">
  
        <div className="flex justify-center animate-fade-in">
          <SearchBar onSearch={handleSearch} />
        </div>

      
        <div className="flex justify-center">
          <FilterCard filters={filters} onFilterChange={handleFilterChange} />
        </div>

  
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-foreground text-lg">Loading characters...</p>
            </div>
          </div>
        )}

 
        {error && (
          <div className="max-w-2xl mx-auto p-6 bg-destructive/20 border border-destructive rounded-xl">
            <h3 className="text-xl font-bold text-destructive mb-2">Error</h3>
            <p className="text-destructive">{error}</p>
          </div>
        )}

   
        {!loading && !error && characters.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {characters.map((character) => (
                <CharacterCard
                  key={character.url}
                  character={character}
                  onClick={() => setSelectedCharacter(character)}
                />
              ))}
            </div>

            <div className="mt-12">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </>
        )}

        {!loading && !error && characters.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">No characters found</p>
            <p className="text-foreground mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

   
      {selectedCharacter && (
        <CharacterModalCard character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
      )}

      {showAuth && <AuthCard onClose={() => setShowAuth(false)} onLogin={handleLogin} />}
    </div>
  );
};

export default Index;
