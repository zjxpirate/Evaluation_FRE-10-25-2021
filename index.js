




// Question 1
const data = [
    {region: 'US', model: 'A', sales: 150},
    {region: 'US', model: 'B', sales: 120},
    {region: 'US', model: 'C', sales: 350},
    {region: 'EU', model: 'A', sales: 200},
    {region: 'EU', model: 'B', sales: 100},
    {region: 'EU', model: 'C', sales: 250},
    {region: 'CA', model: 'A', sales: 200},
    {region: 'CA', model: 'B', sales: 100},
    {region: 'CA', model: 'C', sales: 230},
    {region: 'CA', model: 'D', sales: 400},
];

let data1 = data
let dataArray = []
let dataRegion = []
let dataModel = []

// store entire library, region, and model into array
for (let i = 0; i < data1.length; i++){
    dataArray.push([ data1[i]["region"], data1[i]["model"], data1[i]["sales"] ])
    dataRegion.push(data1[i]["region"])
    dataModel.push(data1[i]["model"])
}

// make region and model array content unique
let regionUnique = dataRegion.filter((item, i, ar) => ar.indexOf(item) === i);
let modelUnique = dataModel.filter((item, i, ar) => ar.indexOf(item) === i);


// add up sales number and add new coumn name
let resultArray = [];
for(let i = 0; i < regionUnique.length; i++){
    let salesTotal = 0;
    for(let j = 0; j < dataArray.length; j++){

        if(dataArray[j][0] == regionUnique[i]){
            salesTotal += Number(dataArray[j][2])
        }

    }
    resultArray.push([ regionUnique[i], "sum", salesTotal ])
    for(let j = 0; j < dataArray.length; j++){

        if(dataArray[j][0] == regionUnique[i]){
            resultArray.push(dataArray[j])
        }

    }
}


// write content of the table
let tableContent = "<tr><th>Region</th><th>Model</th><th>Sales</th></tr>"
for(let i = 0; i < resultArray.length; i++){
    tableContent += "<tr><td>" + resultArray[i][0] + "</td><td>" + resultArray[i][1] + "</td><td>" + resultArray[i][2] + "</td></tr>"
}

document.getElementById('q1').innerHTML = tableContent;










// Question 2
// setup the drop down menu
let regionContent = "<option>All</option>"
for(let i = 0; i < regionUnique.length; i++){
    regionContent += "<option>" + regionUnique[i] + "</option>"
}
document.getElementById('regionFilter').innerHTML = regionContent;


let modelContent = "<option>All</option>"
for(let i = 0; i < modelUnique.length; i++){
    modelContent += "<option>" + modelUnique[i] + "</option>"
}
document.getElementById('modelFilter').innerHTML = modelContent;


// initially we want the customer to see the full content
document.getElementById('q2').innerHTML = tableContent;


// both dropdown menu on change will trigger this function
function Change(){
    let regionList = document.getElementById('regionFilter')
    let regionSelect = regionList.options[regionList.selectedIndex].text;

    let modelList = document.getElementById('modelFilter')
    let modelSelect = modelList.options[modelList.selectedIndex].text;

    let firstRound = []
    let secondRound = []
    let finalTable = []


    // first round to filter data by region
    for (let i = 0; i < dataArray.length; i++){
        
        if(regionSelect == "All"){
            firstRound = dataArray
            break
        }else if(dataArray[i][0] == regionSelect){
            firstRound.push(dataArray[i])
        }
    }

    // second round to filter data by model
    for(let i = 0; i < firstRound.length; i++){
        
        if(modelSelect == "All"){
            secondRound = firstRound
            break
        }else if(firstRound[i][1] == modelSelect){
            secondRound.push(firstRound[i])
        }
    }


    // final table content after 2 filters
    document.getElementById('q2').innerHTML = ""
    let finalContent = "<tr><th>Region</th><th>Model</th><th>Sales</th></tr>"
    for(let i = 0; i < secondRound.length; i++){
        finalContent += "<tr><td>" + secondRound[i][0] + "</td><td>" + secondRound[i][1] + "</td><td>" + secondRound[i][2] + "</td></tr>"
    }

    document.getElementById('q2').innerHTML = finalContent

}

