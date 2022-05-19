"use strict";

// There was no way I was going to create 63 sections in HTML
const addSectionsAndHeaders = function () {

    // Go find all the paragraphs in the article
    // Use a pun for a variable name
    const peas = document.querySelectorAll("article p");

    // use closure to avoid using a global variable for sectionNumber
    const thingy = function () {
        
        let sectionNumber = 0;
        const navList = document.getElementById("nav-list");
        
        // Return a function
        return function (el) {
            // Check to see if the element content begins with parenthesis and one or more digits
            // If so - capture the digits to use for the section header and navigation
            const digitCheck = el.textContent.match(/^.*\((\d+)\).*$/);
            
            // Cat comment - increment sectionNumber https://www.reddit.com/r/ProgrammerHumor/comments/8w54mx/code_comments_be_like/
            sectionNumber++;
            
            // digitCheck will be null if there are no parentheses with digits in them
            if (digitCheck !== null) {
                
                // digitCheck is an array and the second element is the section number
                const sectionId = 'section-' + digitCheck[1];
                const sectionHeader = 'Section ' +digitCheck[1];
                
                // get the parent element of the paragraph
                const parent = el.parentNode;
                
                // if it isn't a section ...
                if (parent.tagName !== "SECTION") {
                    
                    // make a section and header, update the DOM
                    const section = document.createElement("section");
                    section.id = sectionId;
                    const h2 = document.createElement("h2");
                    h2.textContent = sectionHeader;
                    section.appendChild(h2);
                    const p = parent.replaceChild(section, el);
                    section.appendChild(p);
                    
                    // add it into the navigation, too
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.href = '#' + sectionId;
                    a.textContent = sectionHeader;
                    li.appendChild(a);
                    navList.appendChild(li);
                }
            }
        };
    };
    
    // some days you run out of names ...
    const thingyFn = thingy();
    peas.forEach(thingyFn);
    
    // hide the loading div
    document.getElementById("loading").classList.add("hidden");

};

// wait five seconds to practice with loading divs
// you can just call the function to save 5 seconds on every test run :)
// to call the function, use addSectionsAndHeaders(); // note the parentheses
setTimeout(addSectionsAndHeaders, 5000);