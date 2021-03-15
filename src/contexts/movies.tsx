import { Children, createContext, PropsWithChildren, useEffect, useState } from "react";
import { api } from "../services/api";

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }
  
  interface MovieProps {
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }

  type MoviesContextsProps = {
    genres: GenreResponseProps[];
    checkGenreId(id: number): void;
    movies: MovieProps[];
    selectedGenre: GenreResponseProps;
    selectedGenreId: number;
  }


export const MoviesContext = createContext({} as MoviesContextsProps)


export const MoviesProvider = ({children}: PropsWithChildren<unknown> ) => {
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [movies, setMovies] = useState<MovieProps[]>([]);
   const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

   
    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
          setGenres(response.data);
        });
      }, []);
   
      function checkGenreId(id:number) {
        setSelectedGenreId(id);
      }

     useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
          setMovies(response.data);
        });
    
        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
          setSelectedGenre(response.data);
        })
      }, [selectedGenreId]);




    return <MoviesContext.Provider value={{genres, checkGenreId, movies , selectedGenre, selectedGenreId}}>{children}</MoviesContext.Provider>

}