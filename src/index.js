
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchQuery from "./fetchQuery";

let query = "";
let page = 1;
let simpleLightbox = new SimpleLightbox("gallery a",{
    captionDelay: 250,
});


const formEl = document.getElementById(`search-form`);
const galleryEl = document.querySelector(`.gallery`);
const loadMoreBtn = document.querySelector(`.load-more`);
formEl.addEventListener(`submit`, onSearch);
loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick);


async function onSearch(event){
event.preventDefault();
clearHTML ();
page = 1;
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
    // galleryEl.innerHTML = makeCard(res.hits);
    makeCard(res.hits);
    simpleLightbox.refresh(); 
}

}


function makeCard(res){
    const markup =res.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `
    <div class="photo-card">
    <a href =${largeImageURL}><img src=${webformatURL} alt="${tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>likes:${likes}</b>
      </p>
      <p class="info-item">
        <b>views:${views}</b>
      </p>
      <p class="info-item">
        <b>comments:${comments}</b>
      </p>
      <p class="info-item">
        <b>downloads:${downloads}</b>
      </p>
    </div>
  </div>
  `).join(``);
  galleryEl.insertAdjacentHTML('beforeend', markup)
}

async function onLoadMoreBtnClick(){
    page += 1;
    const res = await fetchQuery(query, page)
            // galleryEl.innerHTML = makeCard(res.hits);
            makeCard(res.hits);
            simpleLightbox.refresh(); 
          
}

function clearHTML (){
    galleryEl.innerHTML ="";
}


