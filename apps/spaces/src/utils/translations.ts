
export const getQuestionsFromFiles = (t, q) => {
  let questionsWithTranslations = {}

  t.forEach(t => {
    
    const questionNodes = t.html.getElementById('questions').childNodes
    questionNodes.forEach((node) => {
      const questionId = node.getAttribute('data-question-id')

      if (!!(q.find(qObj => qObj.id === parseInt(questionId)))) {
        if (questionsWithTranslations[questionId]) {
          const newLangs  = questionsWithTranslations[questionId].langs
          newLangs.push({
            lang: t.lang,
            questionElement: node.childNodes[0],
            explanationElement: node.childNodes[1] ? node.childNodes[1] : null,
          })

          const newQ = {
            ...questionsWithTranslations[questionId],
            langs: newLangs,          
          }
          questionsWithTranslations[questionId] = newQ
        } else {
          questionsWithTranslations[questionId] = {
            id: questionId,
            question: q.find(aux => questionId == aux.id),            
            langs: [{
              lang: t.lang,
              questionElement: node.childNodes[0],
              explanationElement: node.childNodes[1] ? node.childNodes[1] : null,
            }],
          }
        }
      }
    })
  })

  return questionsWithTranslations
}