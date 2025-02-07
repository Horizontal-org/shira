export const cleanDeletedExplanations = (indexToDelete) => {
  const explanationsHtml = document.getElementById('dynamic-content').querySelectorAll('[data-explanation]') 

  const toDelete = Array.from(explanationsHtml).find(e => parseInt(e.getAttribute('data-explanation')) === parseInt(indexToDelete))

  if (toDelete.nodeName !== 'MARK') {
    toDelete.removeAttribute('data-explanation')
  }
}