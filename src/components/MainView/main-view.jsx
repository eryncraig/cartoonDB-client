import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: "ObjectId('663be5c587690ab53c193f49')",
      title: "Prince of Egypt",
      summary: "The biblical tale of Moses, from his birth to leading the Israelites out of Egypt, is brought to life in this animated epic filled with stunning visuals and powerful music.",
      director: {
        name: "Brenda Chapman, Steve Hickner, Simon Wells",
        bio: "Brenda Chapman, Steve Hickner, and Simon Wells are American filmmakers and animators, known for their work on various animated films, including The Lion King and The Prince of Egypt."
      },
      year: 1998,
      genre: {
        name: "Animation/Drama",
        definition: "Animation/Drama explores profound themes and emotional storytelling, often adapting classic tales or historical events into visually captivating animated films."
      },
      imagePath: null,
      featured: false
    },
    {
      _id: "ObjectId('663be5dc87690ab53c193f4a')",
      title: "Wizards",
      summary: "In a post-apocalyptic world where magic has returned, two wizard brothers, Avatar and Blackwolf, battle for control over humanity's fate, leading to an epic confrontation between good and evil.",
      director: {
        name: "Ralph Bakshi",
        bio: "Ralph Bakshi is an American animator and filmmaker, known for his innovative use of animation techniques and his provocative storytelling style.",
        birth: "1938-10-29"
      },
      year: 1977,
      genre: {
        name: "Animation/Fantasy",
        definition: "Animation/Fantasy combines imaginative storytelling with visually stunning animation, often featuring fantastical worlds and magical adventures."
      },
      imagePath: null,
      featured: false
    },
    {
      _id: " ObjectId('663be68887690ab53c193f4b')",
      title: "Perfect Blue",
      summary: "A young pop singer's transition from a music idol to an actress takes a dark turn as she is stalked by an obsessed fan, blurring the lines between reality and hallucination.",
      director: {
        name: "Satoshi Kon",
        bio: "Satoshi Kon was a Japanese film director, animator, screenwriter, and manga artist, known for his psychological thrillers and innovative storytelling techniques.",
        birth: "1963-10-12",
        death: "2010-08-24"
      },
      year: 1997,
      genre: {
        name: "Psychological/Thriller",
        definition: "Psychological/Thriller films create tension and suspense through psychological manipulation and complex narratives, often exploring themes of identity, perception, and reality."
      },
      imagePath: null,
      featured: false
    },
    {
      _id: "ObjectId('663be6ab87690ab53c193f4c')",
      title: "My Neighbor Totoro",
      summary: "Two young sisters, Satsuki and Mei, move to the countryside with their father and encounter friendly forest spirits, including the enigmatic Totoro, in this heartwarming tale of magic and friendship.",
      director: {
        name: "Hayao Miyazaki",
        bio: "Hayao Miyazaki is a Japanese animator, filmmaker, and co-founder of Studio Ghibli, known for his imaginative and emotionally resonant storytelling.",
        birth: "1941-01-05"
      },
      year: 1988,
      genre: {
        name: "Fantasy",
        definition: "Fantasy/Family films transport audiences to magical worlds and heartwarming adventures, often emphasizing themes of friendship, courage, and the wonder of childhood."
      },
      imagePath: null,
      featured: false
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => {
        setSelectedMovie(null);
      }} />
    )
  }


  if (movies.length === 0) {
    return <div>The list of movies is empty!</div>
  } else {
    return (
      <div>
        {movies.map((movie) => {
          return (
            <MovieCard movie={movie} key={movie.id} onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }} />
          );
        })}
      </div>
    )
  }
}