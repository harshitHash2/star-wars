import { getColor } from '../utils/getColor';
import { getRandomImage } from '../utils/getRandomImage';

const CharacterCard = ({ character, onClick }) => {
  const speciesColor = getColor(character.species[0]);
  const imageUrl = getRandomImage(character.name);

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-card rounded-2xl overflow-hidden border-2 border-border hover:border-primary card-shadow hover:glow-gold transition-all duration-300 hover:scale-105 animate-slide-up"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-90"
          style={{ background: `linear-gradient(to top, ${speciesColor}, transparent)` }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-2xl font-bold text-foreground text-glow">
            {character.name}
          </h3>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Height:</span>
          <span className="text-foreground font-medium">
            {character.height === 'unknown'
              ? 'Unknown'
              : `${(parseInt(character.height) / 100).toFixed(2)}m`}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Films:</span>
          <span className="text-primary font-bold">{character.films.length}</span>
        </div>
      </div>
    </article>
  );
};

export default CharacterCard;
