
const urlParams = new URLSearchParams(window.location.search)
let authorId = urlParams.get("authorId")


function getUserDetalis() {
    axios.get(`https://tarmeezacademy.com/api/v1/users/${authorId}`)
    .then(function (response) {
// handle success
    document.querySelector(".user-detalis.container .col-9").innerHTML = `
<div class="d-flex justify-content-between align-items-center flex-wrap">
<div class="user-data d-flex align-items-center">
  <img class="rounded-circle me-3" src="${response.data.data.profile_image}" alt="">
  <div class="data">

    <h5>${response.data.data.username}</h5>
    <h5>${response.data.data.email}</h5>
  </div>
</div>
<div class="user-actions">
  <h1>${response.data.data.posts_count} <span class="fs-6 c-grey">Posts</span></h1>
  <h1>${response.data.data.comments_count} <span class="fs-6 c-grey">Comments</span></h1>
</div>
</div>
`
    let imgs = document.querySelectorAll("img.rounded-circle")
    console.log(imgs)
    imgs.forEach((img) => {
    if (img.src.endsWith("]")) {
      console.log(img)
        img.src = "./Grey_user_image.jpg"
    }
    })

})
.catch(function (error) {
// handle error
console.log(error);
})
}


getUserDetalis()





function getUserPosts() {
    axios.get(`https://tarmeezacademy.com/api/v1/posts`)
    .then(function (response) {
    // handle success
        response.data.data.map((post) => {
        if (post.author.id == authorId) {
            document.querySelector(".posts.container div div.col-9").innerHTML += 
            `
            <div class="card shadow mt-5 ">
            <div class="card-header">
                <img class="rounded-circle" style="width: 30px; height: 30px;" src=${post.author.profile_image} alt="">
                <b>@${post.author.username}</b>
            </div>
            <div style="cursor: pointer;" class="card-body" onclick="postClicked(${post.id})">
              <img class="w-100 rounded mb-2" src="${post.image}" alt="">
              <h6 style="color: gray;">${post.created_at}</h6>
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.body}</p>
              <div class="d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-text" viewBox="0 0 16 16">
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                    <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                  <span> (${post.comments_count}) Comments</span>
              </div>
            </div>
        </div>
            `
        }
    })
    let imgs = document.querySelectorAll("img.rounded-circle")
    imgs.forEach((img) => {
        if (img.src.endsWith("object")) {
            img.src = "./Grey_user_image.jpg"
        }
    })
})
.catch(function (error) {
    // handle error
    console.log(error);
})
}


getUserPosts()







