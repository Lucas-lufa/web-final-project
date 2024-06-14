let form_input_api = document.getElementById("form-input-api");
let recipeForm = document.getElementById("recipeForm");
const recipe_url = 'https://api.api-ninjas.com/v1/recipe?query=';
const currency_url = 'https://api.api-ninjas.com/v1/convertcurrency?'

let recipe = document.getElementById('recipe');
let convert_currency = document.getElementById('convert-currency');
const recipe_instructions = document.getElementById('recipe-instructions');

function instructions_recipe() {
    
    if (recipe.checked){
        recipe_instructions.style.display = 'block';
        convert_currency.checked=false
        convert_currency_instructions.style.display = 'none';
    
        
    }
}

const convert_currency_instructions = document.getElementById('convert-currency-instructions');

function instructions_currency() {

    if (convert_currency.checked){
        convert_currency_instructions.style.display = 'block';
        recipe.checked=false
        recipe_instructions.style.display = 'none';
    }
}


function urlcreator(part_url, query){
    return part_url + query
}


function display_recipe(data, placeDisplay){
    if (data.length == 0){
        placeDisplay.innerHTML = 'No recipes found for that search.'
    }
    data.forEach(item => placeDisplay.innerHTML += `<p>${item.title}</p><br><p>${item.ingredients}</p><br><p>${item.servings}</p><br><p>${item.instructions}</p>`);
}


function display_currency(data, placeDisplay){
    placeDisplay.innerHTML += `<p> Change from ${data.old_currency} ${data.old_amount} to ${data.new_currency} ${data.new_amount}</p>`;
}


function input_for_currency_api(query_list) {     
    const countries = ['CNY','GBP','CHF','NZD','AUD','KRW','PLN','DKK','TRY','HKD']

    if (query_list[0] == ''){
        return 'Empty request'
    }
    if (query_list.length < 3){
        return 'Not enough parameters.'
    }
    if (query_list.length > 3){
        return 'Too many parameters.'
    }
    if (!countries.includes(query_list[0])){
        query_list[0] = 'Parameter one is not a valid country code.\n'
    }
    if (!countries.includes(query_list[1])){
        query_list[0] += 'Parameter two is not a valid country code.\n'
    }
    if (isNaN(query_list[2])){
        query_list[0] += 'Parameter three is not a valid amount.'
    }
    if (!countries.includes(query_list[0])){
        return query_list[0]
    }

    return query_list
}


function callfetch(url,  placeDisplay, display_api ) {
    const options = {
        method: 'GET',
        headers: {'X-Api-Key': '+iwVadvmSsCn1KDHN99y2Q==AqHBIBPs8U4prUe5'},
        contentType: 'application/json'
    }


    fetch(url, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            display_api(data, placeDisplay);
        }).catch((error) => {
        placeDisplay.innerHTML = `Error: ${error}`
    });
}


form_input_api.addEventListener("submit", (submit) => {
    submit.preventDefault()    
    const recipe = document.getElementById('recipe');
    const convert_currency = document.getElementById('convert-currency');
    const api_input = document.getElementById('api-input');
    if (recipe.checked){
        if ( api_input.value !== ''){
            const api_responce = document.getElementById("recipe-api-output");
            api_responce.innerHTML = '';
            const url = urlcreator(recipe_url, api_input.value);
            callfetch(url, api_responce, display_recipe);        
        }else{form_input_api.lastElementChild.innerHTML = 'Empty request.'}
    }
    if (convert_currency.checked){
        let query_list = api_input.value.toUpperCase().split(' ')
        query_list = input_for_currency_api(query_list)
       if (typeof(query_list) === 'object'){
            const api_responce = document.getElementById("currency-api-output");
            api_responce.innerHTML = '';
            form_input_api.lastElementChild.innerHTML = '';
            let have = query_list[0]
            let want = query_list[1]
            let amount = parseInt(query_list[2])
            let query = `have=${have}&want=${want}&amount=${amount}`
            const url = urlcreator(currency_url, query);
            callfetch(url, api_responce, display_currency);        

       }else{ form_input_api.lastElementChild.innerHTML = query_list;}
    }
    
});
