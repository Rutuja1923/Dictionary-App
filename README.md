# Dictionary App

This is a lightweight dictionary application built to provide users with comprehensive word definitions, including parts of speech, definitions, examples, synonyms, and antonyms. It utilizes the free and reliable DictionaryAPI (https://dictionaryapi.dev/).

## Technologies Used

* Programming Language: JavaScript
* API: DictionaryAPI (https://dictionaryapi.dev/)


## Usage

1. Enter the word you want to look up.
2. The app will fetch the definition from the DictionaryAPI and display the following information (if available):
    * Part(s) of speech
    * Definitions
    * Examples
    * Synonyms
    * Antonyms

## Example

Entering the word "encourage" might produce the following output:

```
Part of Speech: verb
Definitions:
* to give support, confidence, or hope to someone
* to urge or persuade someone to do something
Examples:
* The teacher encouraged her students to do their best.
* The doctor encouraged me to exercise regularly.
Synonyms:
* stimulate, motivate, inspire, hearten
Antonyms:
* discourage, dishearten, deter
```

## API Integration

This application integrates with the DictionaryAPI using the following API endpoint:


[https://api.dictionaryapi.dev/api/v2/entries/en/](https://api.dictionaryapi.dev/api/v2/entries/en/)<word>


Replace `<word>` with the word you want to look up.


