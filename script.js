$('.btn-input').on('click', function () {
    // console.log($('.input-keyword').val())
    $.ajax(
        {
            url: 'https://www.omdbapi.com/?apikey=dca61bcc&s=' + $('.input-keyword').val(),
            success: results => {
                const movie = results.Search;
    
                let cards = ''
                movie.forEach(m => {
                    cards += `<div class="card col-md-4 my-3">
                    <img src="${m.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${m.Title}</h5>
                      <p class="card-text">${m.Year}</p>
                      <button type="button"  class="btn btn-primary btn-modal" data-bs-toggle="modal" data-imdbid=${m.imdbID} data-bs-target="#modalDetail">Detail</button>
                    </div>
                  </div>`;
                })
    
                $('.movie-container').html(cards)
    
                $('.btn-modal').on('click', function(){
                    $.ajax({
                        url: 'https://www.omdbapi.com/?apikey=dca61bcc&i=' + $(this).data('imdbid'),
                        success: m => {
                            const movieDetail = `<h5>Title : </h5> ${m.Title}
                                                 <h5>Released : </h5>  ${m.Released}
                                                 <h5>Genre : </h5> ${m.Genre}
                                                 <h5>Rated : </h5> ${m.Rated}                 
                            
                            
                            
                            `
                            
                            $('.modal-body').html(movieDetail);
    
                        }
                    })
    
                    
                })
            }
    
        }
    )
})