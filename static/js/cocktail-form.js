/* 
Cocktail Creation Page Functionality.
Gives the user the ability to add and remove form items. 
This script also sorts out the form items attridutes so the backend python function can properly
stage the users input before it is commited to the datebase.
*/
//  Add Ingredient
var ingredCount = $('#cocktail-ingredients .ingredient').length

$(document).on('click', '#add-ingredient', function() {
    var ingredFeedback = `<p id="ingred-feedback" class="cocktail__feedback">Max amount of Ingredients</p>`;
    var ingredientInput = `
        <li class="ingredient">
            <input type="text" id="ingredient-amount-${ingredCount + 1}" name="ingredient-amount-${ingredCount + 1}" 
                class="form-cocktail__input form-cocktail__input--amount" pattern="^[0-9.]{0,5}$" maxlength="5" placeholder="12.5" required>
            <select id="ingredient-unit-${ingredCount + 1}" name="ingredient-unit-${ingredCount + 1}" class="form-cocktail__input" required>
                <option value="ml">ml</option>
                <option value="tsp">tsp</option>
                <option value="dashes">dash/es</option>
                <option value="na">n/a</option>
            </select>
            <input type="text" id="ingredient-name-${ingredCount + 1}" name="ingredient-name-${ingredCount + 1}" class="form-cocktail__input" 
                placeholder="Ingredient Name" required>
            <button class="remove-ingredient cocktail-btn cocktail-btn--remove" type="button"><i class="fas fa-minus-circle"></i> Remove</button>
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
        var ingredAdd = `<button id="add-ingredient" class="cocktail-btn cocktail-btn--add" type="button"><i class="fas fa-plus-circle"></i>  
                            Add Ingredient</button>`;
        $('#ingred-feedback').replaceWith(ingredAdd);
    }

    ingredCount -= 1; 

    //  Re orders list items ids
    var list = document.getElementById('cocktail-ingredients'),
    item = list.getElementsByTagName('li');

    for (i = 0; i < item.length; ++i) {
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
});

//  Add Garnish
var garnishCount = $('#cocktail-garnish .garnish').length

$(document).on('click', '#add-garnish', function() {
    var garnishFeedback = `<p id="garnish-feedback" class="cocktail__feedback">Max amount of Garnishes</p>`;
    var garnishInput = `
        <li class="garnish">
            <input type="text" id="garish-amount-${garnishCount + 1}" name="garish-amount-${garnishCount + 1}" class="form-cocktail__input form-cocktail__input--amount" 
                pattern="^[0-9.]{0,5}$" maxlength="5" placeholder="1" required>
            <input type="text" id="garish-name-${garnishCount + 1}" name="garish-name-${garnishCount + 1}" class="form-cocktail__input" placeholder="Garnish Name" 
                required>
            <button class="remove-garnish cocktail-btn cocktail-btn--remove" type="button"><i class="fas fa-minus-circle"></i> Remove</button>
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
        var garnishAdd = `<button id="add-garnish" class="cocktail-btn cocktail-btn--add" type="button"><i class="fas fa-plus-circle"></i> Add Garnish</button>`;
        $('#garnish-feedback').replaceWith(garnishAdd)
    }
    
    garnishCount -= 1

    if (garnishCount == 0) {
        noGarnish = `<li id="no-garnish" class="no-bullet"><input type="text" id="garish-name-1" name="garish-name-1" class="no-item" value="No Garnish" readonly></li>`
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
            <select id="tool-${toolCount + 1}" name="tool-${toolCount + 1}" class="form-cocktail__input" required>
                <option value="spirit measure">Spirit Measure</option>
                <option value="bar spoon">Bar Spoon</option>
                <option value="cocktail shaker & strainer">Cocktail Shaker & Strainer</option>
                <option value="strainer">Strainer</option>
                <option value="lighter">Lighter</option>
                <option value="bar knife">Bar Knife</option>
                <option value="muddler">Muddler</option>
                <option value="mixing glass">Mixing Glass</option>
            </select>
            <button class="remove-tool cocktail-btn cocktail-btn--remove" type="button"><i class="fas fa-minus-circle"></i> Remove</button>
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
        var toolAdd = `<button id="add-tool" class="cocktail-btn cocktail-btn--add" type="button"><i class="fas fa-plus-circle"></i> Add Tool</button>`;
        $('#tool-feedback').replaceWith(toolAdd)
    }

    toolCount -= 1  
    
    if (toolCount == 0) {
        noTool = `<li id="no-tool" class="no-bullet"><input type="text" id="tool-1" name="tool-1" class="no-item" value="No Tools Needed" readonly></li>`
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
            <textarea id="cocktail-instruction-text-${instrCount + 1}" name="cocktail-instruction-text-${instrCount + 1}" class="form-cocktail__input form-cocktail__text-area" 
                rows="3" placeholder="Type Instructions Here" maxlength="400" required></textarea>
            <button class="remove-instruction cocktail-btn cocktail-btn--remove float-right" type="button"><i class="fas fa-minus-circle"></i> Remove</button>
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
        var instrAdd = `<button id="add-instruction" class="cocktail-btn cocktail-btn--add" type="button"><i class="fas fa-plus-circle"></i> Add Instructions</button>`;
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
        input[0].setAttribute('id', `cocktail-instruction-text-${i + 1}`);
        input[0].setAttribute('name', `cocktail-instruction-text-${i + 1}`);
    }
});

//  Add Tips
var tipCount = $('#cocktail-tips .form-tip').length

$(document).on('click', '#add-tip', function() {
    console.log(tipCount)
    var tipFeedback = `<p id="tip-feedback" class="cocktail__feedback clear-both">Max amount of Tips</p>`;
    var tipInput = `
        <li class="form-tip"  class="cocktail__info clear-both">
            <textarea id="cocktail-tip-text-${tipCount + 1}" name="cocktail-tip-text-${tipCount + 1}" class="form-cocktail__input form-cocktail__text-area form-cocktail__text-area--tip" 
                rows="3" placeholder="Type your tip here" maxlength="200" required></textarea>
            <button class="remove-tip cocktail-btn cocktail-btn--remove float-right" type="button"><i class="fas fa-minus-circle"></i> Remove</button>
        </li>`;

    if (tipCount == 0) {
        $('#no-tip').remove();
    }

    $('#cocktail-tips').append(tipInput);
    tipCount += 1;  

    if (tipCount == 3) {
        $('#add-tip').replaceWith(tipFeedback)
    }
});

//  Remove Tip
$(document).on('click', '.remove-tip', function() {
    $(this).closest(".form-tip").remove();   
    
    if (tipCount == 3) {
        var tipAdd = `<button id="add-tip" class="cocktail-btn cocktail-btn--add clear-both" type="button"><i class="fas fa-plus-circle"></i> Add Tip</button>`;
        $('#tip-feedback').replaceWith(tipAdd)
    }
    
    tipCount -= 1

    //  Re orders list items ids 
    var list = document.getElementById('cocktail-tips'),
    item = list.getElementsByTagName('li');

    if(toolCount > 0) {
        for (i = 0; i < item.length; ++i) {
            currentLi = item[i];
            console.log(currentLi)
            input = currentLi.getElementsByTagName('textarea');
            console.log(input)
            console.log(input[0])
            input[0].setAttribute('id', `cocktail-tip-text-${i + 1}`);
            input[0].setAttribute('name', `cocktail-tip-text-${i + 1}`);
        }
    }

    else {
        return
    }

    if (tipCount == 0) {
        noTip = `<li id="no-tip" class="no-bullet clear-both"><input type="text" id="cocktail-tip-text-1" name="cocktail-tip-text-1" class="no-item" value="No Tips" readonly></li>`
        $('#cocktail-tips').append(noTip);
    }
});