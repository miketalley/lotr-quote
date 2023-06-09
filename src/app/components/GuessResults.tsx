'use client';

import { useEffect, useState, MouseEventHandler } from 'react';
import SelectedQuote from './SelectedQuote';

export default function GuessResults({
  onPlayAgain,
  selectedCharacter,
  selectedMovie,
  selectedQuote,
}: {
  onPlayAgain: MouseEventHandler<HTMLButtonElement>;
  selectedCharacter: any;
  selectedMovie: any;
  selectedQuote: any;
}) {
  const [correctCharacter, setCorrectCharacter] = useState<any>(null);
  const [correctMovie, setCorrectMovie] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/character?id=${selectedQuote.character}`).then(res =>
      res.json().then(json => setCorrectCharacter(json.docs[0])),
    );

    fetch(`/api/movie?id=${selectedQuote.movie}`).then(res =>
      res.json().then(json => setCorrectMovie(json.docs[0])),
    );
  }, [selectedQuote]);

  return (
    correctCharacter &&
    correctMovie && (
      <>
        <SelectedQuote selectedQuote={selectedQuote} />
        <div className="guess-results">
          <div className="character-guess">
            <h3>Who said it?</h3>
            <div className="your-guess">{selectedCharacter.item.name}</div>
            <div className="correct-answer">{correctCharacter.name}</div>
            <div
              className={`guess-result ${
                selectedCharacter.item.name === correctCharacter.name
                  ? 'correct'
                  : 'incorrect'
              }`}
            >
              {selectedCharacter.item.name === correctCharacter.name
                ? 'Correct'
                : 'Incorrect'}
            </div>
          </div>
          <div className="movie-guess">
            <h3>Which movie?</h3>
            <div className="your-guess">{selectedMovie.item.name}</div>
            <div className="correct-answer">{correctMovie.name}</div>
            <div
              className={`guess-result ${
                selectedMovie.item.name === correctMovie.name
                  ? 'correct'
                  : 'incorrect'
              }`}
            >
              {selectedMovie.item.name === correctMovie.name
                ? 'Correct'
                : 'Incorrect'}
            </div>
          </div>
        </div>
        <div className="play-again-button-container">
          <button className="play-again" onClick={onPlayAgain}>
            Play again
          </button>
        </div>
      </>
    )
  );
}
