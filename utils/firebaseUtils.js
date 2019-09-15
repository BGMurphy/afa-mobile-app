import firebase from 'firebase';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';


const getResponsesInCsv = (surveyId) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref('/surveys/'+surveyId).once('value', (snapshot) => {
            const surveyDef = snapshot.val();
            firebase.database().ref('/responses').once('value', (responsesSnapShot) => {
                const surveryResponses = responsesSnapShot.val();
                const pages = surveyDef.surveyData;
                let resultQuestions = [];
                for (let pageKey in pages) {
                    const questions = pages[pageKey].questions;
                    for (let key in questions) {
                        resultQuestions.push(questions[key])
                    }
                }
                let headers = resultQuestions.map(question=>question.text);
                headers = headers.concat(['programId','surveyId','user']);
                let prepHeaders = headers.map(header=>'"' + header + '"');
                let headerRowString = prepHeaders.join(',') + '\n';
                let otherRowsString = ''
                for (let responseKey in surveryResponses) {
                    const answers = surveryResponses[responseKey];
                    let resultAnswerArray = []
                    for (let i = 0; i < headers.length; i++) {
                        const question = headers[i];
                        if (typeof answers['field'+i] === 'string') {
                            resultAnswerArray[i] = answers['field'+i];
                        } else if (typeof answers[question] === 'string') {
                            resultAnswerArray[i] = answers[question];
                        } else {
                            resultAnswerArray[i] = ''
                        }
                    }
                    // console.log('resultAnswerArray', resultAnswerArray)
                    resultAnswerArray = resultAnswerArray.map(a=>'"' + a + '"');
                    
                    otherRowsString = otherRowsString.concat(resultAnswerArray.join(',')+'\n')
                }
                let finalString = headerRowString + otherRowsString;
                // console.log('finalString', finalString)
                resolve(finalString);
                
              })
          })
          .catch((error)=>{
                //error callback
                console.log('error ' , error)
                reject(error);
            })
    })
    .then(csvString => {
        // csvString = "data:text/csv;charset=utf-8," + csvString;
        return FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'temp.csv', csvString)
      })
    .then(res=>{
        console.log('res', res)
        Sharing.shareAsync(FileSystem.documentDirectory + 'temp.csv')
    })
}

export default getResponsesInCsv