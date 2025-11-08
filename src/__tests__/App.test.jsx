import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

// Mock SWAPI fetch response
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  status: 200,
  json: () =>
    Promise.resolve({
      results: [
        {
          name: "Luke Skywalker",
          height: "172",
          mass: "77",
          birth_year: "19BBY",
          films: ["film1", "film2", "film3"],
          homeworld: "https://swapi.dev/api/planets/1/",
          species: []
        }
      ],
      next: "https://swapi.dev/api/people/?page=2"
    }),
});

vi.mock("../components/CharacterCard", () => ({
  default: ({ character, onClick }) => (
    <div data-testid="character-card" onClick={onClick}>
      {character.name}
    </div>
  ),
}));

vi.mock("../components/CharacterModalCard", () => ({
  default: ({ character }) => (
    <div data-testid="character-modal">
      <h2>{character.name}</h2>
      <p>Height: {character.height / 100} m</p>
      <p>Mass: {character.mass} kg</p>
      <p>Films Appeared: {character.films.length}</p>
    </div>
  )
}));

describe("Star Wars App", () => {
  test("renders characters and opens modal on click", async () => {
    render(<App />);

    const characterCard = await screen.findByTestId("character-card"); 
    expect(characterCard).toHaveTextContent("Luke Skywalker");

    
    fireEvent.click(characterCard);

    const modal = screen.getByTestId("character-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent("Luke Skywalker");
    expect(modal).toHaveTextContent("Height: 1.72 m");
    expect(modal).toHaveTextContent("Mass: 77 kg");
    expect(modal).toHaveTextContent("Films Appeared: 3");
  });
});
