window.onload = function() {

    // selection can either proceed rightward along the row
    var is_selection_along_row = false;
    // or downward along the column
    var is_selection_along_col = false;
    var has_selecttion_started = false;
    var selected_letters_indices = [];
    var correct_words_indices = [];


    var words = ["GOAT", "DUCK", "CHICK", "HORSE", "PIG", "COW"];
    var letters = [['G', 'O', 'A', 'T', 'P' , 'B', 'N', 'C'],
                   ['J', 'K', 'I', 'S', 'Z', 'R', 'M', 'A'],
                   ['E', 'S', 'C', 'O', 'D', 'W', 'H', 'T'],
                   ['D', 'H', 'L' , 'H', 'P', 'D', 'H', 'O'],
                    ['I', 'E', 'V', 'D', 'I', 'C', 'O', 'W'],
                    ['H', 'E', 'Z', 'O' , 'O', 'H', 'R', 'G'],
                    ['K', 'P', 'I', 'G', 'T', 'I' , 'S', 'R'],
                    ['W', 'U', 'X', 'Q', 'C', 'H', 'E', 'A'],
                    ['D', 'U', 'C', 'K', 'F', 'Y', 'M', 'O'],
                    ['G', 'P', 'S', 'C', 'H', 'I' , 'C', 'K']];

    var container = document.querySelector("#crossword_container");
    
    // adding rows and columns containing letters using javascript
    for(let i = 0; i < 10; i++){
        let row_html = "<div class='row justify-content-center'>";
        let row_data = "data-row='" + (i+1).toString() +"'";
        for(let j = 1; j <= 8; j++){

            let col_data = "data-col='" +j.toString() +"'";
            let elem_id = "'row_" + (i+1).toString() + "_col_" + j.toString() + "'";
            
            let odd_col_html = "<div class='col-1 text-center fw-bold border border-1 border-dark' "+ 
                                  " id=" + elem_id + row_data + " "+ col_data +
                               " style='width: 5.333%; background-color: lightgreen;'>";
            let even_col_html = "<div class='col-1 text-center fw-bold border border-1 border-dark' "+ 
                                  " id="+  elem_id + row_data + " "+ col_data +
                                " style='width: 5.333%; background-color: gold;'>";
            if(j%2 == 1){
                row_html += odd_col_html + letters[i][j-1] + "</div>";
            }else{
                row_html += even_col_html + letters[i][j-1] + "</div>";
            }
            
        }
        
        row_html += "</div>";
        container.innerHTML += row_html;

    }

  

    // add click listener to each letter
    for(let i = 1; i <= 10; i++){
        for(let j = 1; j <= 8; j++){

            let elem_id = "#row_" + i.toString() + "_col_" + j.toString() ;
            var elem = document.querySelector(elem_id);
            
            elem.addEventListener("click", function(event){
                
                let row_num = parseInt(event.target.getAttribute('data-row'));
                let col_num = parseInt(event.target.getAttribute('data-col'));
                
                
                if (!has_selecttion_started) {
                    // we are selecting our first letter
                    has_selecttion_started = true;
                    selected_letters_indices.push([row_num, col_num]);
                    // change the selected element's color to grey
                    event.target.style.backgroundColor = 'grey';

                } else {
                    // we have already selected some letter
                    if (is_selection_along_row) {
                        // we should only select letters along the row
                        if (selected_letters_indices[selected_letters_indices.length - 1][0] == row_num) {

                            // next selected entry must be immediately right of the last selected letter
                            if (selected_letters_indices[selected_letters_indices.length - 1][1] + 1 == col_num) {
                                // push it in the selected_letters_indices
                                selected_letters_indices.push([row_num, col_num]);

                                // changing the element's color to grey
                                event.target.style.backgroundColor = 'grey';
                            }

                        } else {
                            // show an alert box stating that the selection is wrong
                            window.alert("Error, User should select the letter in the same row");
                        }
                    } else if (is_selection_along_col) {
                        // we should only select letters along the column
                        if (selected_letters_indices[selected_letters_indices.length - 1][1] == col_num) {

                            // next selected entry must be immediately down of the last selected letter
                            if (selected_letters_indices[selected_letters_indices.length - 1][0] + 1 == row_num) {
                                // push it in the selected_letter_indices
                                selected_letters_indices.push([row_num, col_num]);

                                // change the element's color to grey
                                event.target.style.backgroundColor = 'grey';
                            }

                        } else {
                            // show an alert box stating that the selection is wrong
                            window.alert("Error, User should select the letter in the same column");
                        }

                    } else {
                        // this is the 2nd selected letter, if the selected letter is along the row...
                        // .. then we must select future letters row wise else future selection must be ..
                        // .. column wise

                        // any other selection is invalid
                        if (selected_letters_indices[selected_letters_indices.length - 1][0] == row_num) {
                            has_selecttion_started = true;
                            is_selection_along_row = true;
                            // push it in the selected letter indices
                            selected_letters_indices.push([row_num, col_num]);

                            // change the element's color to back
                            event.target.style.backgroundColor = 'grey';

                        } else if (selected_letters_indices[selected_letters_indices.length - 1][1] == col_num) {
                            has_selecttion_started = true;
                            is_selection_along_col = true;
                            // push it in the selected letter indices
                            selected_letters_indices.push([row_num, col_num]);

                            // change the element's color to back
                            event.target.style.backgroundColor = 'grey';
                        } else {
                            window.alert("Error, User should select the letter in the same row or same column");

                        }


                    }
                }

            });


        }
    }


    // event listener to reset button which resets all the variables
    var reset_button  = document.querySelector("#reset");
    reset_button.addEventListener("click", function() {

        //remove the grey colors from the selected elements
        for(let i = 0; i < selected_letters_indices.length; i++){
            let elem_id = "#row_"+ selected_letters_indices[i][0].toString() + "_col_" 
                                        +selected_letters_indices[i][1];
                
            let letter_elem = document.querySelector(elem_id);
            if(selected_letters_indices[i][1] % 2 == 1){
                letter_elem.style.backgroundColor = "lightgreen";
            }else{
                letter_elem.style.backgroundColor = "gold";
            }
            
        }

        for(let i = 0; i < correct_words_indices.length ; i++ ){
            let elem_id = "#row_"+ correct_words_indices[i][0].toString() + "_col_" 
                                        + correct_words_indices[i][1];
                
            let letter_elem = document.querySelector(elem_id);
            if(correct_words_indices[i][1] % 2 == 1){
                letter_elem.style.backgroundColor = "lightgreen";
            }else{
                letter_elem.style.backgroundColor = "gold";
            }
        }
        
        // reset all the state variables
        is_selection_along_col = false;
        is_selection_along_row = false;
        has_selecttion_started = false;
        selected_letters_indices = [];
        
    });

    // adding event listener to the check button which matches selected words against dictionary 
    var check_button = document.querySelector("#check");
    check_button.addEventListener("click", function() {
        let selected_word = ""
        for(let i = 0; i < selected_letters_indices.length; i++){
            selected_word += letters[selected_letters_indices[i][0] - 1][selected_letters_indices[i][1] - 1];
        }
        //console.log(selected_letters_indices);
        //console.log(selected_word);

        if(selected_word != "" && words.includes(selected_word)){
            // make all selected letters green
            for(let i = 0; i < selected_letters_indices.length ; i++){
                let elem_id = "#row_"+ selected_letters_indices[i][0].toString() + "_col_" 
                                        +selected_letters_indices[i][1];
                
                let letter_elem = document.querySelector(elem_id);
                letter_elem.style.backgroundColor = 'green';

                // add the currently selected word indices into 'correct_word_indices'
                correct_words_indices.push([ selected_letters_indices[i][0], selected_letters_indices[i][1] ]);
            }

            // show a congratulatory alert box
            setTimeout(function(){
                window.alert("Congrats ! You selected a right word. Click 'Reset' to play again");
            }, 500);

            // reset all the state variables
            is_selection_along_col = false;
            is_selection_along_row = false;
            has_selecttion_started = false;
            selected_letters_indices = [];
            
        }else{

            // make all selected letters red
            for(let i = 0; i < selected_letters_indices.length ; i++){
                let elem_id = "#row_"+ selected_letters_indices[i][0].toString() + "_col_" 
                                        +selected_letters_indices[i][1];
                
                let letter_elem = document.querySelector(elem_id);
                letter_elem.style.backgroundColor = 'red';
            }

            // show a loser alert box
            setTimeout(function(){
                window.alert("Sorry ! You have selected a wrong word. Click 'Reset' to play again");
            }, 500);
            
        }

    });


}