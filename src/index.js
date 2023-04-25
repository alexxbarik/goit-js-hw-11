
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchQuery from "./fetchQuery";

let query = "";
let page = 1;
const lightbox = new SimpleLightbox(".gallery a",{
    captionDelay: 250,
});


const formEl = document.getElementById(`search-form`);
const galleryEl = document.querySelector(`.gallery`);
const loadMoreBtn = document.querySelector(`.load-more`);
formEl.addEventListener(`submit`, onSearch);
loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick);
loadMoreBtn.classList.add(`is-hidden`);


async function onSearch(event){
event.preventDefault();
clearHTML ();
page = 1;
loadMoreBtn.classList.add(`is-hidden`);
query = event.currentTarget.elements.searchQuery.value.trim();
  if(!query){
    Notiflix.Notify.warning('please enter a query');
    return;
}
const res = await fetchQuery(query, page)
if(res.hits.length === 0){
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    return;
}else{
    Notiflix.Notify.success(`Hooray! We found ${res.totalHits} totalHits images.`);
    makeCard(res.hits);
    lightbox.refresh();
    loadMoreBtn.classList.remove(`is-hidden`); 
}

}


function makeCard(res){
    const markup =res.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<div class="photo-card">
    <a class="photo-card-link"href=${largeImageURL}><img src=${webformatURL} alt="${tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>downloads</b>
        ${downloads}
      </p>
    </div>
  </div>`).join("");
  galleryEl.insertAdjacentHTML('beforeend', markup)
}

async function onLoadMoreBtnClick(){
    page += 1;
    const res = await fetchQuery(query, page)
            makeCard(res.hits);
            lightbox.refresh();
            if (page * 40 > res.totalHits) {
                loadMoreBtn.classList.add(`is-hidden`);
                return Notiflix.Notify.failure(
                  "We're sorry, but you've reached the end of search results."
                );
              } 
          
}

function clearHTML (){
    galleryEl.innerHTML ="";
}


