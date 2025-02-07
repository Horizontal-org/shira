export const filterExplanations = (ex, lang) => {
  let langExplanations = []
  ex.forEach((e) => {
    const translation = e.explanationTranslations.find(et => et.languageId.id == lang)
    if (translation) {
      langExplanations.push(translation)
    }
  })

  return langExplanations.map((langE) => (
    <div>
      { langE.content }
    </div>
  ))
}

export const filterExplanationsByCode = (ex, lang) => {
  let langExplanations = []
  ex.forEach((e) => {
    const translation = e.explanationTranslations.find(et => et.languageId.code == lang)
    if (translation) {
      langExplanations.push(translation)
    }
  })

  return langExplanations.map((langE) => (
    <div>
      { langE.content }
    </div>
  ))
}