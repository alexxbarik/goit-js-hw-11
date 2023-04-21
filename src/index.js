
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchQuery from "./fetchQuery";

let query = "";


const formEl = document.getElementById(`search-form`);
const galleryEl = document.querySelector(`.gallery`);
const loadMoreBtn = document.querySelector(`.load-more`);
formEl.addEventListener(`submit`, onSearch);
loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick);


function onSearch(event){
event.preventDefault();
query = event.currentTarget.elements.searchQuery.value;
  if(!query){
    Notiflix.Notify.warning('please enter a query');
    return;
}
fetchQuery(query).then((res) =>{
if(res.hits.length === []){
    console.log(res.hits)
    Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    return;
}else{
    galleryEl.innerHTML = makeCard(res.hits);
     
}
})
}


function makeCard(res){
    return res.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>${likes}</b>
      </p>
      <p class="info-item">
        <b>${views}</b>
      </p>
      <p class="info-item">
        <b>${comments}</b>
      </p>
      <p class="info-item">
        <b>${downloads}</b>
      </p>
    </div>
  </div>`).join(``);
    
}

function onLoadMoreBtnClick(){
    fetchQuery(query).then((res) =>{
            galleryEl.innerHTML = makeCard(res.hits);
        })
}