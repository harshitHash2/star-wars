import { useEffect } from 'react';
import { useCharacterDetails } from '../hooks/useCharacterDetails';
import { getColor } from '../utils/getColor';
import { getRandomImage } from '../utils/getRandomImage';

const CharacterModalCard = ({ character, onClose }) => {
  const { homeworld, species, loading } = useCharacterDetails(character);

  useEffect(() => {
    if (character) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [character]);

  if (!character) return null;

  const imageUrl = getRandomImage(character.name);
  const speciesColor = getColor(character.species[0]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-primary card-shadow glow-gold animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-80">
          <img
            src={imageUrl}
            alt={character.name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"
            style={{
              background: `linear-gradient(to top, hsl(var(--card)), ${speciesColor}50, transparent)`
            }}
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-4xl font-bold text-primary text-glow mb-6">
            {character.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="bg-background/50 p-4 rounded-xl">
                <span className="text-sm text-muted-foreground block mb-1">Height</span>
                <span className="text-xl font-semibold text-foreground">
                  {character.height === 'unknown'
                    ? 'Unknown'
                    : `${(parseInt(character.height) / 100).toFixed(2)} meters`}
                </span>
              </div>

              <div className="bg-background/50 p-4 rounded-xl">
                <span className="text-sm text-muted-foreground block mb-1">Mass</span>
                <span className="text-xl font-semibold text-foreground">
                  {character.mass === 'unknown' ? 'Unknown' : `${character.mass} kg`}
                </span>
              </div>

              <div className="bg-background/50 p-4 rounded-xl">
                <span className="text-sm text-muted-foreground block mb-1">Birth Year</span>
                <span className="text-xl font-semibold text-foreground">
                  {character.birth_year}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-background/50 p-4 rounded-xl">
                <span className="text-sm text-muted-foreground block mb-1">Date Added</span>
                <span className="text-xl font-semibold text-foreground">
                  {formatDate(character.created)}
                </span>
              </div>

              <div className="bg-background/50 p-4 rounded-xl">
                <span className="text-sm text-muted-foreground block mb-1">Number of Films</span>
                <span className="text-xl font-semibold text-primary">
                  {character.films.length}
                </span>
              </div>

              <div className="bg-background/50 p-4 rounded-xl">
                <span className="text-sm text-muted-foreground block mb-1">Species</span>
                <span className="text-xl font-semibold text-foreground">
                  {loading ? 'Loading...' : (species?.name || 'Human')}
                </span>
              </div>
            </div>
          </div>

          {homeworld && (
            <div className="bg-background/50 p-6 rounded-xl border border-border">
              <h3 className="text-2xl font-bold text-primary mb-4">Homeworld Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">Name</span>
                  <span className="text-lg font-semibold text-foreground">{homeworld.name}</span>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground block mb-1">Terrain</span>
                  <span className="text-lg font-semibold text-foreground">{homeworld.terrain}</span>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground block mb-1">Climate</span>
                  <span className="text-lg font-semibold text-foreground">{homeworld.climate}</span>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground block mb-1">Population</span>
                  <span className="text-lg font-semibold text-foreground">
                    {homeworld.population === 'unknown'
                      ? 'Unknown'
                      : parseInt(homeworld.population).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterModalCard;
