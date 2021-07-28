const searchButton = document.querySelector('.btn-search')
searchButton.addEventListener('click',function() {
    const movieKeyword = document.querySelector('.input-keyword')
    const keyword = movieKeyword.value
    
    fetch(`https://www.omdbapi.com/?s=${keyword}&apikey=346fd566`)
        .then(response => response.json()).then(response => {
            const movies = response.Search

            let movie = ''

            movies.forEach(m => {
                movie += showCards(m)
            })

            const movieContainer = document.querySelector('.movie-container')
            movieContainer.innerHTML = movie; 

            const detailButton = document.querySelectorAll('.btn-modal')
            detailButton.forEach(db => {
                db.addEventListener('click', function() {
                    const imdbid = this.dataset.imdbid;
                    fetch(`https://www.omdbapi.com/?i=${imdbid}&apikey=346fd566`)
                        .then(response => response.json())
                        .then( m => {
                            let showDetail = ''
                            const detailBody = document.querySelector('.detail-body')
                            showDetail += showDetailModal(m)

                            detailBody.innerHTML = showDetail


                        })
                })
            })
        })
})






function showCards(m)
{
    return `
    <div class="col-md-4">
    <div class="card">
    <img src="${m.Poster}" class="card-img-top" alt="..." style="width:350px;height="200px"">
    <div class="card-body">
      <h5 class="card-title">${m.Title}</h5>
      <p class="card-text">${m.Year}</p>
      <button type="button"  class="btn btn-primary btn-modal" data-bs-toggle="modal" data-imdbid=${m.imdbID} data-bs-target="#modalDetail">Detail</button>
    </div>
  </div>
    </div>`
} 

function showDetailModal(m)
{
    return `
    <div class="col-md">
        <img src="${m.Poster}"
    </div>
    <div class="col-md">
        <h2>${m.Title}</h2>
        <p><b>Release :</b> ${m.Released}</p>
        <p><b>Runtime : </b>${m.Runtime}</p>
        <p><b>Genre : </b>${m.Genre}</p>
        <p><b>Director : </b>${m.Director}</p>
        <p><b>Writers : </b>${m.Writer}</p>
        <p><b>Actors : </b>${m.Actors}</p>
    </div>
    `
}