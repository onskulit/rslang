import { useGetWordsQuery, useGetWordQuery } from '../api/apiSlice';

export interface Word {
  _id: Id;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  __v: number;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export interface Id {
  $oid: string;
}

function Audiocall(): JSX.Element {
  const {
    data: words,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetWordsQuery({ group: 5, page: 0 });

  const { data: word } = useGetWordQuery('5e9f5ee35eb9e72bc21af4a0');

  let content;
  let oneWord;

  if (isLoading) {
    content = 'Loading...';
  } else if (isSuccess) {
    console.log('Одно слово по id "5e9f5ee35eb9e72bc21af4a0"', word);
    console.log(words);
    content = words.map((word: Word) => <p key={word.word}>{word.word}</p>);
    oneWord = word.word;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <h2>Audiocall</h2>
      <>
        <p>Одно слово по id &quot;5e9f5ee35eb9e72bc21af4a0&quot;:</p>
        <p>{oneWord}</p>
        <p>____________________</p>
      </>
      <>
        <p>Слова группы сложности 5 по на странице 0:</p>
      </>
      {content}
    </>
  );
}

export default Audiocall;
