/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no' or 'show all'\n\n\nType 'quit' to exit this program.",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            let howManyTraits = oneOrMoreTraits()
            switch (howManyTraits) {
                case "one":
                    searchResults = searchByTrait(people)
                    alert(searchResults);
                    app(people);
                case "multiple":
                    searchResults = searchByTraits(people);
                    alert(searchResults);
                    app(people);
            }
            break;
        case "show all":
            searchResults = displayPeople(people);
            break;
        case "quit":
            return;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height: ${person.height} inches\n`;
    personInfo += `Weight: ${person.weight} lb\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    return personInfo;
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no" || input.toLowerCase() === "show all" || input.toLowerCase() === "quit";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function findPersonFamily (person, people) {

    let personFamily = people.filter(function (element) {
        if (person.lastName === element.lastName && person.firstName !== element.firstName) {
            return true;
        }
    });
    return displayFamily (person, personFamily);
}

function displayFamily (person, people) {

    let personOrganizer = people.map(function (element) {
        if (person.currentSpouse === element.id) {
            return `Spouse: ${element.firstName} ${element.lastName}\n`; 
        }
        else if (person.parents[0]) {
            if (person.parents[0] === element.id || person.parents[1] === element.id) {
                return `Parent: ${element.firstName} ${element.lastName}\n`;
            }
            else if (person.id !== element.id && element.parents.includes(person.parents[0])) {
                return `Sibling: ${element.firstName} ${element.lastName}\n`;
            }
        }
    });
    return personOrganizer;
}

function getDecendants (person, people) {

    let descendants = people.filter(function (element) {
        if (person.id === element.parents[0] || person.id === element.parents[1]) {
            return true;
        }
        else if (!element.parents[0]) {
            return false;
        }
    });
    return descendants;
}

function findPersonDescendants(person, people) { 
    
    let descendants = getDecendants(person, people);
    let foundDescendants = ``;

    if (descendants.length > 0) {
        for (let i = 0; i < descendants.length; i++) {
            foundDescendants += `${descendants[i].firstName} ${descendants[i].lastName}\n`;
        }
    }
    else {
        foundDescendants = "This person has no descendants."
    }
    return foundDescendants;
}

function oneOrMoreTraits () {
    let howManyTraits = promptFor("Would you like to search by one trait, or multiple traits?",chars
    ).toLowerCase();

    if (howManyTraits !== "one" && howManyTraits !== "multiple") {
        alert("Your input is invalid.");
        oneOrMoreTraits();
    }
    else {
        return howManyTraits;
    }
}

function searchByTrait (people) {
    let chooseTrait = promptFor("Pick a trait to search by: \nGender\nHeight\nWeight\neyeColor\nOccupation\nisMarried\n", chars
    ).toLowerCase();
    let searchTrait;

    switch (chooseTrait) {
        case "gender":
            searchTrait = getGender(people);
            break;
        case "height":
            searchTrait = getHeight(people);
            break;
        case "weight":
            searchTrait = getWeight(people);
            break;
        case "eyecolor":
            searchTrait = getEyeColor(people);
            break;
        case "occupation":
            searchTrait = getOccupation(people);
            break;
        case "ismarried":
            searchTrait = getMarried(people);
            break;
    }
    return searchTrait;
}

function getGender (people) {
    let whichGender = promptFor("Male or Female?", chars).toLowerCase();
    let searchGender = people.map(function(element) {
        if (whichGender === element.gender) {
            return `${element.firstName} ${element.lastName}\n`;
        }
    });
    return searchGender;
}

function getHeight (people) {
    let whichHeight = parseInt(promptFor("What is the person's height? In inches...", chars));
    let searchHeight = people.map(function(element) {
        if (whichHeight === element.height) {
            return `${element.firstName} ${element.lastName}\n`;
        }
    });
    return searchHeight;
}

function getWeight (people) {
    let whichWeight = parseInt(promptFor("What is the person's weight?", chars));
    let searchWeight = people.map(function(element) {
        if (whichWeight === element.weight) {
            return `${element.firstName} ${element.lastName}\n`;
        }
    });
    return searchWeight;
}

function getEyeColor (people) {
    let whichEyeColor = promptFor("What is the person's eye color", chars).toLowerCase();
    let searchEyeColor = people.map(function(element) {
        if (whichEyeColor === element.eyeColor) {
            return `${element.firstName} ${element.lastName}\n`;
        }
    });
    return searchEyeColor;
}

function getOccupation (people) {
    let whichOccupation = promptFor("What is the person's occupation?", chars).toLowerCase();
    let searchOccupation = people.map(function(element) {
        if (whichOccupation === element.occupation) {
            return `${element.firstName} ${element.lastName}\n`;
        }
    });
    return searchOccupation;
}

function getMarried (people) {
    let searchMarried = people.map(function (element) {
        if (element.currentSpouse) {
            return `${element.firstName} ${element.lastName}\n`
        }
    });
    return searchMarried;
}

function searchByTraits (people) {
    let howManyTraits = parseInt(promptFor("How many traits would you like to search by?", chars));
    maxTraitsValidation(howManyTraits, people);

    let selectedTraits;
    for (let i = 0; i < howManyTraits; i++) {
        selectedTraits = searchByTrait(people);
    }
    return selectedTraits;
}

function maxTraitsValidation (callback, people) {
    if (callback <= 5 && callback > 0) {
        return;
    }
    else {
        alert("You must choose between 1-5 traits to search by.")
        searchByTraits(people);
    }
}