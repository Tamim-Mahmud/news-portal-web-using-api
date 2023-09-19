let fetchedData = [];
const loadCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories').then(res => res.json()).then(data => showCatagories(data.data.news_category));
}

const showCatagories = data => {
    // console.log(data.length);
    data.forEach(data => {
        document.getElementById('catagorical-data').innerHTML += `<a role="button" onclick ="fetchCatagoriesData('${data.category_id}','${data.category_name}')">${data.category_name}</a>`;
    });

};
const fetchCatagoriesData = (catagory_id, catagory_name) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${catagory_id}`).then(res => res.json())
        .then(data => {
            showNews(data.data,catagory_name)
            fetchedData = data.data;
         })
}

const showNews = (data,catagory_name) => {

    document.getElementById('catagories-num').innerText = data.length;
    console.log(data.length);
    document.getElementById('catagoris-name').innerText = catagory_name;
    document.getElementById('news-cart').innerHTML = '';


    data.forEach(data => {
        // console.log(data.thumbnail_url)
        document.getElementById('news-cart').innerHTML += `
            <div class="card mb-3 container my-3" style="">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 d-flex flex-column justify-content-around">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}<span class="badge text-bg-danger"> ${data.others_info.is_trending ? "Trending" : ""}</span></h5>
                            <p class="card-text">${data.details.slice(0, 200)}</p</>...
                        </div>
                        <div class=" bg-transparent ">
                           <div class="d-flex justify-content-between align-items-center p-3 m-0">
                                <div class="d-flex justify-content-center align-items-center gap-2">
                                     <img src="${data.author.img}" class="img-fluid rounded-circle" alt="..." height="40px" width="40px">
                                     <div class=" d-flex flex-column">
                                        <p class="card-text m-0 p-0">${data.author.name ? data.author.name : "Not Available"}</p</>
                                        <p class="card-text">${data.author.published_date ? data.author.published_date : "Not Available"}</p</>
                                    </div> 
                                </div>
                                <p class="m-0 p-0"><i class="fa-regular fa-eye"></i> ${data.total_view ? data.total_view + "M" : "Not Available"}</p>
                                 <div class="d-flex align-items-center justify-content-center gap-1 m-0 p-0">
                                     <div>
                                        ${generateRatings(data.rating.number)}
                                     </div>
                                        <p class="m-0 p-0">  ${data.rating.number}</p>
                                 </div>
                                 <i class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showModal('${data._id}')"></i>

                          </div> 
                        </div>
                    </div>
                </div>
                
            </div>
            `
    })



};
const showModal = id => {

    fetch(`https://openapi.programming-hero.com/api/news/${id}`).then(res => res.json())
        .then(data => {
            const { image_url, title, details, author, total_view ,rating} = data.data[0];
            console.log(data)
            document.getElementById('modal-body').innerHTML = `
        <div class="card mb-3 container my-3" style="">
                <div class="row g-0">
                    <div class="col-md-12">
                        <img src="${image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-12 d-flex flex-column justify-content-around">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${details}</p</>
                        </div>
                        <div class=" bg-transparent ">
                           <div class="d-flex justify-content-between align-items-center p-3">
                                <div class="d-flex justify-content-center align-items-center gap-2">
                                     <img src="${author.img}" class="img-fluid rounded-circle" alt="..." height="40px" width="40px">
                                     <div class=" d-flex flex-column">
                                        <p class="card-text m-0 p-0">${author.name ? author.name : "NOt Available"}</p</>
                                        <p class="card-text">${author.published_date ? author.published_date : "Not Available"}</p</>
                                    </div> 
                                </div>
                                <p class="m-0 p-0"><i class="fa-regular fa-eye"></i> ${total_view ? total_view + "M" : "Not Available"} </p>
                                 <div>
                                    ${generateRatings(rating.number)}
                                 </div>

                          </div> 
                        </div>
                    </div>
                </div>
                
            </div>
        `
        })
}
document.getElementById('trending').addEventListener('click', function () {
    const todaysPick = fetchedData.filter(data => data.others_info.is_trending);
    const catagoryName = document.getElementById('catagoris-name').innerText;
    showNews(todaysPick, catagoryName);

});
document.getElementById('today-pick').addEventListener('click', function () {
    const todaysPick = fetchedData.filter(data => data.others_info.is_todays_pick);
    const catagoryName = document.getElementById('catagoris-name').innerText;
    showNews(todaysPick, catagoryName);

});
fetchCatagoriesData('01','Breaking News');
const generateRatings= rating =>{
    let ratingStar='';

    for(let i=0;i<Math.floor(rating);i++){
        ratingStar +='<i class="fa-solid fa-star"></i>'
    }
    if(Math.floor(rating)<rating){
        ratingStar+='<i class="fa-solid fa-star-half-stroke"></i>'
    }
    return ratingStar;
}