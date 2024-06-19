import { Button, Card } from "react-bootstrap"

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card>
      <Card.Img src={movie.image} className="w-100 img-fluid" />
      <Card.Title>
        {movie.title}
      </Card.Title>
      <Card.Text>
        Director: {movie.director.name}
      </Card.Text>
      <Card.Text>
        Released: {movie.year}
      </Card.Text>
      <Card.Text>
        {movie.summary}
      </Card.Text>
      <Button onClick={onBackClick}>Back</Button>
    </Card>
  )

}