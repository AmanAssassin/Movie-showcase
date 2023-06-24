// http://api.tvmaze.com/search/shows?q=girls

const form = document.querySelector('#movieForm');
const div = document.querySelector('#showImages');


form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    div.innerHTML = '';
    try {
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
        makeImage(res.data);
        form.elements.query.value = '';
    }
    catch {
        div.textContent = 'Something went wrong...Check your connection.';
        form.elements.query.value = '';
    }


})

const makeImage = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const movieContainer = document.createElement('div');
            const img = document.createElement('IMG');
            const movieName = document.createElement('h1');
            const movieRating = document.createElement('h1');
            const movieRelease = document.createElement('h1');
            img.src = result.show.image.medium;
            movieName.textContent = result.show.name;
            movieRelease.textContent = `(${result.show.premiered.slice(0, 4)})`;
            if (result.show.rating.average)
                movieRating.textContent = `Rating: ${result.show.rating.average} `;
            else
                movieRating.textContent = `Rating: N / A`;
            movieContainer.append(img);
            movieContainer.append(movieName);
            movieContainer.append(movieRelease);
            movieContainer.append(movieRating);
            movieContainer.classList.add('movieBox', 'setColor');
            div.append(movieContainer);

        }

    }
}