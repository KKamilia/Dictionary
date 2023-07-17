let query = { active: true, currentWindow: true };

let definition,
    word,
    index = 0;


function setValue(definition) {
    const responseArray = definition[index].meanings[index].definitions[index];
    console.log(definition[index])
    definition = responseArray.definition;
    example = responseArray.example
        ? responseArray.example
        : null;

    document.body.querySelector('#definition-text').innerText = definition;
}

async function lookupDictionaryAsync(query) {
    let dictionaryURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;
    const response = await fetch(dictionaryURL);
    await response.json().then((res) => { setValue(res) });
}

chrome.runtime.onMessage.addListener(async ({ name, data: word }) => {
    if (name === 'define-word') {
        document.body.querySelector('#select-a-word').style.display = 'none';
    };

    document.body.querySelector('#definition-word').innerText = word.value;
    await lookupDictionaryAsync(word.value);
});
