/* 
Cocktail Creation Page Functionality.
Gives the user the ability to add and remove form items. 
This script also sorts out the form items attridutes so the backend python function can properly
stage the users input before it is commited to the datebase.
*/
// Submit Event listner Functions - Sets values of hidden input just before submit to be used by the back end
$( '#cocktail-create' ).submit(function( ) {
    console.log('ran')
    $('#no-of-ingred').attr('value', ingredCount);
    $('#no-of-garnish').attr('value', garnishCount);
    $('#no-of-tools').attr('value', toolCount);
    $('#no-of-instr').attr('value', instrCount);
    return true

});

//  Add Ingredient
var ingredCount = $('#cocktail-ingredients .ingredient').length

$(document).on('click', '#add-ingredient', function() {
    var ingredFeedback = `<p id="ingred-feedback" class="cocktail__feedback">Max amount of Ingredients</p>`;
    var ingredientInput = `
        <li class="ingredient">              
            <!--Amount-->
            <input type="text" id="ingredient-amount-${ingredCount + 1}" name="ingredient-amount-${ingredCount + 1}" 
                class="form-cocktail__input form-cocktail__input--amount" pattern="^[0-9.]{0,5}$" maxlength="5" 
                placeholder="Amount" aria-label="enter amount of ingredient" required>
            
            <!--Unit-->
            <select id="ingredient-unit-${ingredCount + 1}" name="ingredient-unit-${ingredCount + 1}" class="form-cocktail__input" 
                aria-label="dropdown menu to select a unit type" required>
                    <option value="" disabled selected hidden>Unit</option>
                    <option value="ml">ml</option>
                    <option value="tsp">tsp</option>
                    <option value="dashes">dash/es</option>
                    <option value="no unit">n/a</option>
            </select>

            <!--Name-->
            <input type="text" id="ingredient-name-${ingredCount + 1}" name="ingredient-name-${ingredCount + 1}" 
                class="form-cocktail__input" placeholder="Ingredient Name" aria-label="enter ingredient name" required>

            <button class="remove-ingredient cocktail-btn cocktail-btn--remove" type="button">
                <i class="fas fa-minus-circle"></i> Remove
            </button>
        </li>`;

    $('#cocktail-ingredients').append(ingredientInput);
    ingredCount += 1;

    if (ingredCount == 12) {
        $('#add-ingredient').replaceWith(ingredFeedback)
    };                    
});

//  Remove Ingredient
$(document).on('click', '.remove-ingredient', function() {
    $(this).closest(".ingredient").remove();
    
    if (ingredCount == 12) {
        var ingredAdd = `
            <button id="add-ingredient" class="cocktail-btn cocktail-btn--add" type="button">
                <i class="fas fa-plus-circle"></i> Add Ingredient
            </button>`;
        $('#ingred-feedback').replaceWith(ingredAdd);
    }

    ingredCount -= 1; 

    //  Re orders list items ids
    var list = document.getElementById('cocktail-ingredients'),
    item = list.getElementsByTagName('li');

    for (i = 0; i < item.length; ++i) {
        if (i > 0) {
            currentLi = item[i];
            console.log(currentLi)
            input = currentLi.getElementsByTagName('input');
            console.log(input)
            console.log(input[0])
            input[0].setAttribute('id', `ingredient-amount-${i + 1}`);
            input[0].setAttribute('name', `ingredient-amount-${i + 1}`);
            input[1].setAttribute('id', `ingredient-name-${i + 1}`);
            input[1].setAttribute('name', `ingredient-name-"${i + 1}"`);

            select = currentLi.getElementsByTagName('select');
            select[0].setAttribute('id', `ingredient-unit-${i + 1}`);
            select[0].setAttribute('name', `ingredient-unit-${i + 1}`);
        }

        else {
            currentLi = item[i];
            console.log(currentLi)
            input = currentLi.getElementsByTagName('input');
            console.log(input)
            console.log(input[0])
            input[0].setAttribute('id', `ingredient-amount-${i + 1}`);
            input[0].setAttribute('name', `ingredient-amount-${i + 1}`);
            input[1].setAttribute('id', `ingredient-unit-${i + 1}`);
            input[1].setAttribute('name', `ingredient-unit-"${i + 1}"`);
            input[2].setAttribute('id', `ingredient-name-${i + 1}`);
            input[2].setAttribute('name', `ingredient-name-"${i + 1}"`);
        }
    }
});

//  Add Garnish
var garnishCount = $('#cocktail-garnish .garnish').length

$(document).on('click', '#add-garnish', function() {
    var garnishFeedback = `<p id="garnish-feedback" class="cocktail__feedback">Max amount of Garnishes</p>`;
    var garnishInput = `
        <li class="garnish">
            <!--Amount-->
            <input type="text" id="garnish-amount-${garnishCount + 1}" name="garnish-amount-${garnishCount + 1}" 
                class="form-cocktail__input form-cocktail__input--amount" pattern="^[0-9.]{0,5}$" maxlength="5" 
                placeholder="Amount" aria-label="enter garnish amount" required>
            
            <!--Name-->
            <input type="text" id="garnish-name-${garnishCount + 1}" name="garnish-name-${garnishCount + 1}" 
                class="form-cocktail__input" placeholder="Garnish Name" aria-label="enter garnish name" required>
            
            <!--Remove Item Button-->
            <button class="remove-garnish cocktail-btn cocktail-btn--remove" type="button">
                <i class="fas fa-minus-circle"></i> Remove
            </button>
        </li>`;

    if (garnishCount == 0) {
        $('#no-garnish').remove();
    }

    $('#cocktail-garnish').append(garnishInput);
    garnishCount += 1;  

    if (garnishCount == 3) {
        $('#add-garnish').replaceWith(garnishFeedback)
    }
});

//  Remove Garnish
$(document).on('click', '.remove-garnish', function() {
    $(this).closest(".garnish").remove();   
    
    if (garnishCount == 3) {
        var garnishAdd = `
            <button id="add-garnish" class="cocktail-btn cocktail-btn--add" type="button">
                <i class="fas fa-plus-circle"></i> Add Garnish
            </button>`;
        $('#garnish-feedback').replaceWith(garnishAdd)
    }
    
    garnishCount -= 1

    if (garnishCount == 0) {
        noGarnish = `
            <li id="no-garnish" class="no-bullet">
                <input type="text" id="garnish-name-1" name="garnish-name-1" class="no-item" value="No Garnish" readonly>
            </li>`;
        $('#cocktail-garnish').append(noGarnish);
    }

    //  Re orders list items ids 
    var list = document.getElementById('cocktail-garnish'),
    item = list.getElementsByTagName('li');

    if(garnishCount > 0) {
        for (i = 0; i < item.length; ++i) {
            currentLi = item[i];
            console.log(currentLi)
            input = currentLi.getElementsByTagName('input');
            console.log(input)
            console.log(input[0])
            input[0].setAttribute('id', `garnish-amount-${i + 1}`);
            input[0].setAttribute('name', `garnish-amount-${i + 1}`);
            input[1].setAttribute('id', `garnish-name-${i + 1}`);
            input[1].setAttribute('name', `garnish-name-${i + 1}`);
        }
    }

    else {
        return
    }
});

//  Add Tool
var toolCount = $('#cocktail-tools .tool').length

$(document).on('click', '#add-tool', function() {
    var toolFeedback = `<p id="tool-feedback" class="cocktail__feedback">Max amount of Tools</p>`;
    var toolSelect = `
        <li class="tool">
            <!--Tool Selector-->
            <select name="tool-${toolCount + 1}" id="tool-${toolCount + 1}" class="form-cocktail__input" 
                aria-label="dropdown to select tool" required>
                    <option value="" disabled selected hidden>Select Tool</option>
                    <option value="spirit measure">Spirit Measure</option>
                    <option value="bar spoon">Bar Spoon</option>
                    <option value="cocktail shaker & strainer">Cocktail Shaker & Strainer</option>
                    <option value="strainer">Strainer</option>
                    <option value="lighter">Lighter</option>
                    <option value="bar knife">Bar Knife</option>
                    <option value="muddler">Muddler</option>
                    <option value="mixing glass">Mixing Glass</option>
            </select>

            <!--Remove Tip-->
            <button class="remove-tool cocktail-btn cocktail-btn--remove" type="button">
                <i class="fas fa-minus-circle"></i> Remove
            </button>
        </li>`;

    if (toolCount == 0) {
        $('#no-tool').remove();
    } 

    $('#cocktail-tools').append(toolSelect);
    toolCount += 1

    if (toolCount == 5) {
        $('#add-tool').replaceWith(toolFeedback)
    };  
});

//  Remove Tool (Must be a .on("click") as the elements are added dynamically)
$(document).on('click', '.remove-tool', function() {
    $(this).closest(".tool").remove()

    if (toolCount == 5) {
        var toolAdd = `
            <button id="add-tool" class="cocktail-btn cocktail-btn--add" type="button">
                <i class="fas fa-plus-circle"></i> Add Tool
            </button>`;
        $('#tool-feedback').replaceWith(toolAdd)
    }

    toolCount -= 1  
    
    if (toolCount == 0) {
        noTool = `
            <li id="no-tool" class="no-bullet">
                <input type="text" id="tool-1" name="tool-1" class="no-item" value="No Tools Needed" readonly>
            </li>`;
        $('#cocktail-tools').append(noTool);
    }

    //  Re orders list items ids 
    var list = document.getElementById('cocktail-tools'),
    item = list.getElementsByTagName('li');

    if(toolCount > 0) {
        for (i = 0; i < item.length; ++i) {
            currentLi = item[i];
            console.log(currentLi)
            select = currentLi.getElementsByTagName('select');
            console.log(select)
            console.log(select[0])
            select[0].setAttribute('id', `tool-${i + 1}`);
            select[0].setAttribute('name', `tool-${i + 1}`);
        }
    }

    else {
        return
    }
});

//  Add Instruction
var instrCount = $('#cocktail-instructions .instruction').length

$(document).on('click', '#add-instruction', function() {
    console.log(instrCount)
    var instrFeedback = `<p id="instruction-feedback" class="cocktail__feedback">Max amount of Instruction</p>`;
    var instructionInput = `
        <li class="instruction">
            <textarea id="instruction-${instrCount + 1}" name="instruction-${instrCount + 1}" 
                class="form-cocktail__input form-cocktail__text-area" 
                rows="3" placeholder="Type Instructions Here" maxlength="400" aria-label="enter instruction" required></textarea>

            <button class="remove-instruction cocktail-btn cocktail-btn--remove" type="button">
                <i class="fas fa-minus-circle"></i> Remove
            </button>
        </li>`;

    $('#cocktail-instructions').append(instructionInput);
    
    instrCount += 1;

    if (instrCount == 15) {
        $('#add-instruction').replaceWith(instrFeedback)
    };                    
});

//  Remove Instruction
$(document).on('click', '.remove-instruction', function() {
    $(this).closest(".instruction").remove();
    
    if (instrCount == 15) {
        var instrAdd = `
            <button id="add-instruction" class="cocktail-btn cocktail-btn--add" type="button">
                <i class="fas fa-plus-circle"></i> Add Instructions
            </button>`;
        $('#instruction-feedback').replaceWith(instrAdd);
    }

    instrCount -= 1;  
    
    //  Re orders list items ids
    var list = document.getElementById('cocktail-instructions'),
    item = list.getElementsByTagName('li');

    for (i = 0; i < item.length; ++i) {
        currentLi = item[i];
        console.log(currentLi)
        input = currentLi.getElementsByTagName('textarea');
        console.log(input)
        console.log(input[0])
        input[0].setAttribute('id', `instruction-${i + 1}`);
        input[0].setAttribute('name', `instruction-${i + 1}`);
    }
});

// Remove "Add Item" button on page load
$( document ).ready( function() {
    var ingredFeedback = `<p id="ingred-feedback" class="cocktail__feedback">Max amount of Ingredients</p>`;
    var garnishFeedback = `<p id="garnish-feedback" class="cocktail__feedback">Max amount of Garnishes</p>`;
    var toolFeedback = `<p id="tool-feedback" class="cocktail__feedback">Max amount of Tools</p>`;
    var instrFeedback = `<p id="instruction-feedback" class="cocktail__feedback">Max amount of Instruction</p>`;

    if (ingredCount == 12) {
        $('#add-ingredient').replaceWith(ingredFeedback)
    };

    if (garnishCount == 3) {
        $('#add-garnish').replaceWith(garnishFeedback)
    }

    if (toolCount == 5) {
        $('#add-tool').replaceWith(toolFeedback)
    };

    if (instrCount == 15) {
        $('#add-instruction').replaceWith(instrFeedback)
    };
});