export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Released: </span>
        <span>{movie.year}</span>
      </div>
      <div>
        <span>Synopsis: </span>
        <span>{movie.summary}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  )

}