
function getNewsGet(){
    axios("http://localhost:8082/news", {
        method: "get",
        params: {
            email:"test@test.com"

        }
    }).then((response) => {
        console.log(response.data['status'], response.data['info']);
        const newsMsg = document.querySelector('.news');
        newsMsg.innerText = response.data['info'];

    }).catch((error) => {
        console.log(error);
    })
}

function getNewsPost(){
    axios("http://localhost:8082/news", {
        method: "post",
        data: {
            email:"test@test.com"

        }
    }).then((response) => {
        console.log(response.data['status'], response.data['info']);
        const newsMsg = document.querySelector('.news');
        newsMsg.innerText = response.data['info'];

    }).catch((error) => {
        console.log(error);
    })
}  
getNewsPost();