const searchBtn =document.getElementById('searchButton');
const resultContainer = document.getElementById('resultContainer');

searchBtn.addEventListener('click', async () => {

    const word = document.getElementById('wordInput').value.trim();
    resultContainer.innerHTML = `
    <div class="loading">
        <span></span>
        <span></span>
        <span></span>
    </div>
    `;
    if (word){
        try{
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) {
                throw new Error('Word not found');
            }
            const data = await response.json();

            displayResults(data);
        } 
        catch (error){
            document.getElementById('resultContainer').innerHTML = `<p style="color: red;">${error.message}</p>`;
        }
    } 
    else{
        alert('Please Enter a Word.');
    }
});

function displayResults(data) {
    
    resultContainer.innerHTML = '';
    //data[0]->word
    const wordDiv = document.createElement('div');
    wordDiv.textContent = capitalizeFirstLetter(data[0].word);
    wordDiv.classList.add("word-div");
    resultContainer.appendChild(wordDiv);

    const meaningsDiv = document.createElement('div');
    meaningsDiv.classList.add('meanings-div');
    resultContainer.appendChild(meaningsDiv);

    //data[0]-> meanings[]
    let meaningsList = data[0].meanings;
    let counter = 1;
    
    meaningsList.forEach(meaning => {

        //data[0]->meanings[]->meaning->partOfSpeech
        const partOfSpeech = document.createElement('h3');
        partOfSpeech.innerText = `${counter}. Parts Of Speech : ${capitalizeFirstLetter(meaning.partOfSpeech)}`;
        partOfSpeech.classList.add('part-of-speech');
        meaningsDiv.appendChild(partOfSpeech);

        //data[0]->meanings[]->meaning->definitions[]
        let definitions = meaning.definitions ;
        let index = 1;

        const defHead = document.createElement('h4');
        defHead.innerText = "Definitions : ";
        meaningsDiv.appendChild(defHead);

        definitions.forEach(def =>{

            //data[0]->meanings[]->meaning->definitions[]->definition
            const defPara = document.createElement('p');
            defPara.innerText = `${index}. ${def.definition}`;
            meaningsDiv.appendChild(defPara);

            //data[0]->meanings[]->meaning->definitions[]->example        
            if (def.example){
                const exPara = document.createElement('p');
                exPara.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Example :</i> ${def.example}`;
                meaningsDiv.appendChild(exPara);
            }

            //data[0]->meanings[]->meaning->definitions[]->synonyms[]
            let synonyms = def.synonyms;
            if(synonyms.length != 0){
                const subSynonymsPara = document.createElement('p');
                let subSynList = synonyms[0];
                for(let i=0; i<synonyms.length; i++){
                    subSynList += ` , ${synonyms[i]} `;
                }
                subSynonymsPara.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Synonyms : </i> ${subSynList}` ; 
                meaningsDiv.appendChild(subSynonymsPara);
            }
            
            //data[0]->meanings[]->meaning->definitions[]->antonyms           
            let antonyms = def.antonyms;
            if(antonyms.length != 0){
                const subAntonymsPara = document.createElement('p');
                let subAntList = antonyms[0];
                for(let i=0; i<antonyms.length; i++){
                    subAntList += ` , ${antonyms[i]}`;
                }
                subAntonymsPara.innerHTML= `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Antonyms : </i> ${subAntList}`;
                meaningsDiv.appendChild(subAntonymsPara);
            }
            index+=1;
        });

        const synonymsAndAntonyms = document.createElement('div');
        synonymsAndAntonyms.classList.add('syn-ant-div');
        meaningsDiv.appendChild(synonymsAndAntonyms);

        //data[0]->meanings[]->meaning->synonyms[]
        let mainSyn = meaning.synonyms;
        if (mainSyn.length != 0){
            const mainSynPara = document.createElement('p');
            let mainSynList = mainSyn[0];
            for(let i=1; i<mainSyn.length; i++){
                mainSynList += ` , ${mainSyn[i]}`;
            }
            mainSynPara.innerHTML = `<h4>Synonyms :</h4> <p>${mainSynList}</p>`;
            synonymsAndAntonyms.appendChild(mainSynPara);
        }

        //data[0]->meanings[]->meaning->antonyms[]
        let mainAnt= meaning.antonyms;
        if (mainAnt.length != 0){
            const mainAntPara = document.createElement('p');
            let mainAntList = mainAnt[0];
            for(let i=1; i<mainAnt.length; i++){
                mainAntList += ` , ${mainAnt[i]}`;
            }
            mainAntPara.innerHTML = `<h4>Antonyms : </h4> <p>${mainAntList}</p>`;
            synonymsAndAntonyms.appendChild(mainAntPara);
        }

        counter+=1;

    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}