const inputEl = document.getElementById('input');
const EngTranslation = document.getElementById('english-translation');
const wordEl = document.getElementById('word');
const sound = document.getElementById('sound');
const partOfspeachEL = document.getElementById('PartsOfSpeach');
const searchbtnEl = document.getElementById('btn');
const SentenceEl = document.getElementById('Sentence');
const synonymsEl = document.getElementById('synonyms');
const antonymsEl = document.getElementById('antonyms');
const moreBtnEl = document.getElementById('morebtn');

function gettranslation(word) {
  const promise = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  promise
    .then((response) => {
        return response.json();
    })
    .then((response) => {
      wordEl.innerText = word;
      partOfspeachEL.innerText = response[0].meanings[0].partOfSpeech + "/" + response[0].meanings[1].partOfSpeech + response[0].phonetic;
      EngTranslation.innerText = response[0].meanings[0].definitions[0].definition;
      SentenceEl.innerText = (response[0].meanings[0].definitions[0].example || response[0].meanings[1].definitions[0].example || response[0].meanings[2].definitions[0].example);
      sound.setAttribute("src", `${response[0].phonetics[0].audio}`);
      if( (response[0].meanings[1].synonyms).length > 0 )
        synonymsEl.innerText =( "Synonyms" + " :" + (response[0].meanings[1].synonyms));
      else 
        synonymsEl.innerText =( "Synonyms" + " :" + 'no synonym available ' );

      if( (response[0].meanings[1].synonyms).length > 0 )
      antonymsEl.innerText = ("Antonyms" + " :" + (response[0].meanings[1].antonyms));
      else 
      antonymsEl.innerText = ("Antonyms" + " :" + 'no antonyms available '  );
    
      document.querySelector('.Translation').style.display = 'block';
      document.getElementById('error').style.display =  'none';
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      document.querySelector('.Translation').style.display = 'none';
      document.getElementById('error').style.display = 'block';
    });    
}


searchbtnEl.addEventListener('click', function(e) {
  e.preventDefault();
  const word = inputEl.value;
  gettranslation(word);
});
moreBtnEl.addEventListener('click' , function()
{
   document.getElementById('more').style.display = 'block';
})

function playsound() {
  sound.play();
}