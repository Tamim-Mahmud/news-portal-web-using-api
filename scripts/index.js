const loadCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories').then(res => res.json()).then(data => showCatagories(data.data.news_category));
}

const showCatagories = data => {
    // console.log(data.length);
    data.forEach(data => {
        document.getElementById('catagorical-data').innerHTML += `<a role="button" onclick ="showNews('${data.category_id}','${data.category_name}')">${data.category_name}</a>`;
    });

};

const showNews = (catagory_id, catagory_name) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${catagory_id}`).then(res => res.json()).then(data => {
        document.getElementById('catagories-num').innerText = data.data.length;
        // console.log(data.data.length);
        document.getElementById('catagoris-name').innerText = catagory_name;
        document.getElementById('news-cart').innerHTML = '';


        data.data.forEach(data => {
            // console.log(data.thumbnail_url)
            document.getElementById('news-cart').innerHTML += `
            <div class="card mb-3 container my-3" style="">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 d-flex flex-column justify-content-around">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.details.slice(0, 200)}</p</>...
                        </div>
                        <div class=" bg-transparent ">
                           <div class="d-flex justify-content-between align-items-center p-3">
                                <div class="d-flex justify-content-center align-items-center gap-2">
                                     <img src="${data.author.img}" class="img-fluid rounded-circle" alt="..." height="40px" width="40px">
                                     <div class=" d-flex flex-column">
                                        <p class="card-text m-0 p-0">${data.author.name}</p</>
                                        <p class="card-text">${data.author.published_date}</p</>
                                    </div> 
                                </div>
                                <p ><i class="fa-regular fa-eye"></i> ${data.total_view} M</p>
                                 <div>
                                    <i class="fa-regular fa-star"></i>
                                 </div>
                                 <i class="fa-solid fa-arrow-right"></i>

                          </div> 
                        </div>
                    </div>
                </div>
                
            </div>
            `
        })
    })


};