import {
  FETCH_WORDS,
  SET_NEW_WORD
} from '../action_types/WordsActionTypes';
import WordsActionCreators from '../action_creators/WordsActionCreators';
import endpoints from '../utils/http/endpoints';
import http from '../utils/http';

const fetchWords = () => {
  return (dispatch) => {
    dispatch(WordsActionCreators.fetching());

    http.get(endpoints.wordnik.randomWords)
      .then(([word, ...restWords]) => {

        // Caches the rest of the words in storage
        chrome.storage.sync.set({words: restWords}, () => {
          // Gets the definition and the pronunciation of the current word
          Promise.all([
            endpoints.wordnik.word.definitions(word),
            endpoints.wordnik.word.pronunciation(word)
          ])
            .then(([definition, pronunciation]) => {
              const currentWord = {
                createdAt: new Date().toISOString(),
                definition,
                pronunciation,
                word
              };

              // Saves the current word
              chrome.storage.sync.set({currentWord}, () => {
                dispatch(WordsActionCreators.fetchSuccess(currentWord));
              });
            })
            .catch((err) => {
              debugger;
            });
        });
      })
      .catch((err) => {
        debugger;
      });
  };
};

const setWord = ({payload: {words}}) => {
  return (dispatch) => {
    dispatch(WordsActionCreators.setNewWordPending());

    // Gets a random word from the cached words
    const randIndex = Math.floor(Math.random() * words.length);
    const word = words[randIndex];
    const restCachedWords = [...words.slice(0, randIndex), ...words.slice(randIndex + 1, words.length)];

    chrome.storage.sync.set({words: restCachedWords}, () => {
      // Fetchs the info for the new word
      Promise.all([
        endpoints.wordnik.word.definitions(word),
        endpoints.wordnik.word.pronunciation(word)
      ])
        .then(([definition, pronunciation]) => {
          const newWord = {
            createdAt: new Date().toISOString(),
            definition,
            pronunciation,
            word
          };

          chrome.storage.sync.set({currentWord: newWord}, () => {
            dispatch(WordsActionCreators.setWordSuccess(newWord));
          });
        })
        .catch((err) => {
          debugger;
        });
    });

  };
};

export default {
  [FETCH_WORDS]: fetchWords,
  [SET_NEW_WORD]: setWord
};
