import { useFilterOptions } from '../hooks/useFilterOptions';

const FilterCard = ({ filters, onFilterChange }) => {
  const { homeworlds, films, speciesList } = useFilterOptions();

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({ homeworld: '', film: '', species: '' });
  };

  return (
    <div className="w-full max-w-6xl bg-card border border-border rounded-xl p-6 card-shadow animate-fade-in">
      <div className="flex flex-wrap gap-4 items-end">
        
        {/* Homeworld Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-foreground mb-2">Homeworld</label>
          <select
            value={filters.homeworld}
            onChange={(e) => handleChange('homeworld', e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">All Homeworlds</option>
            {homeworlds.map((planet) => (
              <option key={planet.url} value={planet.url}>
                {planet.name}
              </option>
            ))}
          </select>
        </div>

        {/* Film Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-foreground mb-2">Film</label>
          <select
            value={filters.film}
            onChange={(e) => handleChange('film', e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">All Films</option>
            {films.map((film) => (
              <option key={film.url} value={film.url}>
                {film.title}
              </option>
            ))}
          </select>
        </div>

        {/* Species Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-foreground mb-2">Species</label>
          <select
            value={filters.species}
            onChange={(e) => handleChange('species', e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">All Species</option>
            {speciesList.map((spec) => (
              <option key={spec.url} value={spec.url}>
                {spec.name}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
