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
    })

};