
const urlParams = new URLSearchParams(window.location.search)

let PostId = urlParams.get("postId")



function showPost(PostId , authorId) {
    // Get Post 
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${PostId}`)
    .then(function (response) {
      console.log(response.data.data.author.id)

    // handle success
    let addCommentbox = ``

    if (token !== null) {
      addCommentbox = `<div class="add-comment d-flex mt-4 align-items-center">
    <img  class="rounded-circle me-3" style="height: 30px; width: 30px; object-fit: cover;" src="${JSON.parse(localStorage.getItem("user")).profile_image}">
    <input type="text" class="form-control write-comment" placeholder="Write a comment...">
    <svg onclick="addCommentFunction()" class='add-comment-btn' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send-plus" viewBox="0 0 16 16">
    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z"/>
    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"/>
    </svg>
    </div>`
    }
  

    document.querySelector(".post.container .col-9").innerHTML = 
    `
    <h1 class="main-title">@${response.data.data.author.username} Post</h1>
  <div class="card shadow mt-5 ">
    <div class="card-header">
        <img class="rounded-circle" style="width: 30px; height: 30px;" src=${response.data.data.author.profile_image} alt="">
        <b style="cursor: pointer;" onclick="userNameClicked(${response.data.data.author.id})">@${response.data.data.author.username}</b>
    </div>
    <div class="card-body">
      <img class="w-100 rounded mb-2" src="${response.data.data.image}" alt="">
      <h6 style="color: gray;">${response.data.data.created_at}</h6>
      <h5 class="card-title">${response.data.data.title ? response.data.data.title : "There Are No Title in This Post..." }</h5>
      <p class="card-text">${response.data.data.body}</p>
      <div class="d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-text" viewBox="0 0 16 16">
            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
            <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
          </svg>
          <span> (${response.data.data.comments_count}) Comments</span>
      </div>
      <div class="comments mt-4">
      ${response.data.data.comments.map((comment) => {
          let commentBox = `
          <div class="comment d-flex rounded">
          <img class="rounded-circle me-3" style="height: 30px; width: 30px; object-fit: cover;" src="${comment.author.profile_image}">
          <div class="comment-detalis">
          <h6 onclick="commentUserNameClicked(${comment.author.id})" style="margin:0;">@${comment.author.username}</h6>
          <p class="fs-6" style="margin:0;">${comment.body}</p>
          </div>
          </div>
          `
          return commentBox
      })}
      </div>
      ${addCommentbox}
    </div>
    </div>
    `

    let imgs = document.querySelectorAll("img.rounded-circle")
    imgs.forEach((img) => {
        if (img.src.endsWith("object")) {
            img.src = "./Grey_user_image.jpg"
        }
    })

    let imgs2 = document.querySelectorAll("img.rounded-circle")
    imgs2.forEach((img) => {
        if (img.src.endsWith("]")) {
            img.src = "./Grey_user_image.jpg"
        }
    })

    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })


}

showPost(PostId)


function addCommentFunction() {
  let params = {
    body : document.querySelector(".write-comment").value
  }
  console.log(params)
  axios.post(`https://tarmeezacademy.com/api/v1/posts/${PostId}/comments`, params , {
    headers : {
      authorization : `Bearer ${token}`
    }
  })
  .then(function (response) {
    window.location.reload()
    console.log(response);
  })
  .catch(function (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data.message,
    })
  });
}


function commentUserNameClicked(authorId) {
  location.href = `userdetalis.html?authorId=${authorId}`
}








