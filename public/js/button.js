function updateMeme(memeId, button) {
  fetch(`/memes/${memeId}`, { method: 'POST' })
    .then((response) => {
      if (response.ok) {
        console.log('Meme updated.');
        storeHighlightedMeme(memeId); // Store the highlighted meme ID in browser storage
        window.location.href = '/meme'; // Navigate to the meme page in the current window
      } else {
        console.error('Failed to update meme.');
      }
    })
    .catch((error) => {
      console.error('Error updating meme:', error);
    });
}

function highlight(button) {
  var parent = button.parentNode.parentNode;
  parent.style.background = 'gray';
}

// Used a variety of sites for this, https://stackoverflow.com/questions/46224051/how-keep-same-table-cell-highlighted-after-page-refresh
// https://live.datatables.net/caqukow/1/edit
// https://dakotaleemartinez.com/tutorials/how-to-add-active-highlight-to-table-of-contents/
// Feel like I overcomplicated things a little but it worked 

function storeHighlightedMeme(memeId) {
  const storedMemeIds = localStorage.getItem('highlightedMemeIds');
  let memeIds = storedMemeIds ? JSON.parse(storedMemeIds) : [];
  memeIds.push(memeId); // Add the highlighted meme ID to the array
  localStorage.setItem('highlightedMemeIds', JSON.stringify(memeIds)); // Store the updated array in localStorage
}

window.addEventListener('DOMContentLoaded', () => {
  const storedMemeIds = localStorage.getItem('highlightedMemeIds');
  if (storedMemeIds) {
    const memeIds = JSON.parse(storedMemeIds);
    const buttons = document.querySelectorAll('button[data-meme-id]');
    buttons.forEach((button) => {
      const memeId = button.dataset.memeId;
      if (memeIds.includes(memeId)) {
        highlight(button); // Apply the highlight to the meme IDs in the stored array
      }
    });
  }
});