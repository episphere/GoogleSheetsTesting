const fs = require('fs');
let files = fs.readFileSync('files.csv', {encoding:'utf8'})
files = files.split(',')
console.log(files)

let changed = false;
for(let i = 0; i < files.length; i++){
    let file = files[i]
    if(file == 'masterJSON.json'){
        const fs = require('fs');
        //clear files
        fs.readdirSync('./').forEach(file => {
            if(file.includes('.json')){
                fs.unlink('./' + file, (err) => {
                    if(err){
                        console.error(err)
                        return
                    }
                })        
            }
        })
        
        let currFileContents = fs.readFileSync('./masterJSON.json');
        let currJSON = JSON.parse(currFileContents)
        let fileNames = Object.keys(currFileContents);
        for(let i = 0; i < fileNames.length; i++){
            fs.writeFileSync(fileNames[i] + '.json', JSON.stringify(currJSON[fileNames[i]],null, 2));
        }

        changed = true;
        i = files.length;
    }
    
}
/*
if(changed){
    aggregate.aggregate();
}*/
