const fs = require('fs');

let filename = './GoogleSheetsTesting/masterJSON.json'
let fileContents = fs.readFileSync(filename);
let masterJSON= JSON.parse(fileContents);
let keys = Object.keys(masterJSON);
let toReturn = {};
let varNameToConcept = {};
//create vartoconcept
for(let i = 0; i < keys.length; i++){
    let currJSON = masterJSON[keys[i]];
    if(currJSON['conceptId'] && currJSON['Variable Name']){
        varNameToConcept[currJSON['Variable Name']] = currJSON['conceptId'];
    }
}

for(let i = 0; i < keys.length; i++){

    let currJSON = masterJSON[keys[i]];
    //QuestID - radio button or multi-answer format questions questions. ->  this is for 3 layer questions
    //Old Quest Value -> this is the pick 1 questions
    
    //pick multiple
    if(currJSON['QuestID - radio button or multi-answer format questions questions.']){
        let header = currJSON['QuestID - radio button or multi-answer format questions questions.'];
        //console.log(header)
        //console.log(masterJSON[header]);
        let headerName = header;
        if(!toReturn[headerName]){
            toReturn[headerName] = {};
        }
        if(currJSON['QuestID for check box or single answer questions. Also includes codes for radio button questions']){
            toReturn[headerName][currJSON['QuestID for check box or single answer questions. Also includes codes for radio button questions']] = currJSON['conceptId'].toString();
        }
        else{
            console.log(currJSON['conceptId'])
        }
        
        
        
    }
    //choose 1
    else if(currJSON['QuestID for check box or single answer questions. Also includes codes for radio button questions']){
        let header = currJSON['QuestID for check box or single answer questions. Also includes codes for radio button questions'];
        //choose 1
        if(currJSON['Connect Id Array']){
            let arr = currJSON['Connect Id Array'];
            let toInsert = {};
            //console.log(arr);
            for(let j = 0; j < arr.length; j++){
                let id = currJSON['Connect Value'][j];
                if(id.includes('.json')){
                    id = id.substring(0,9);
                    //console.log(id)
                }
                toInsert[arr[j]] = id;
                
            }
            if(header.toString() == '1'){
                console.log(JSON.stringify(currJSON))
            }
            toReturn[header] = toInsert;
        }
        //fill in??
        else{
            if(currJSON['QuestID for check box or single answer questions. Also includes codes for radio button questions'].toString() == '1'){
                console.log('fill here')
            }
            toReturn[currJSON['QuestID for check box or single answer questions. Also includes codes for radio button questions']] = currJSON['conceptId'].toString();
        }
    }
    


}

fs.writeFileSync('testDict.json', JSON.stringify(toReturn,null, 2));

//console.log(JSON.stringify(toReturn));

/*
if(changed){
    aggregate.aggregate();
}*/
