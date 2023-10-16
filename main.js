// import Swal from 'sweetalert2'
let token = localStorage.getItem("token")
function AddUsers() {
    let UserNameInput = document.getElementById("user-name").value
    let passwordInput = document.getElementById("password").value
    axios.post('https://tarmeezacademy.com/api/v1/login', {
        username : UserNameInput,
        password : passwordInput
    })
      .then(function (response) {
        localStorage.setItem("token" , response.data.token)
        localStorage.setItem("user" , JSON.stringify(response.data.user))

        let modal = document.getElementById("login-modal")
        let modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User Logged In Successfully',
            showConfirmButton: false,
            timer: 1500
          })
        setupUI()
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        })
      });
}



function setupUI() {
let token1 = localStorage.getItem("token")
    if (token1 === null) {
        document.querySelector(".logged-in").classList.add("hide")
        document.querySelector(".non-logged-in").classList.remove("hide")
        document.querySelector(".add-new-post-btn").classList.add("hide")
        document.querySelector(".profile-link").classList.add("hide")
        if (document.querySelector(".add-comment") !== null) {
            document.querySelector(".add-comment").classList.add("hide")
        }
    } else {
        document.querySelector(".non-logged-in").classList.add("hide")
        document.querySelector(".logged-in").classList.remove("hide")
        document.querySelector(".add-new-post-btn").classList.remove("hide")
        document.querySelector(".profile-link").classList.remove("hide")
        if (document.querySelector(".add-comment") !== null) {
          document.querySelector(".add-comment").classList.remove("hide")
      }

    }
}



let logoutBtn = document.getElementById("logout-btn")


logoutBtn.onclick = () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "To Logout",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Logout !',
        cancelButtonText: 'No !',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
          swalWithBootstrapButtons.fire(
            'Logout',
            'You logout Successfully',
            'success'
          )
          setupUI()
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your Logged In is safe :)',
            'error'
          )
        }
      })
}

// Add New Post
let addBtn = document.getElementById("addBtn")

addBtn.onclick = () => {
    let title = document.getElementById("title-post").value
    let body = document.getElementById("title-body").value
    let image = document.getElementById("myFile").files[0]

    let formData = new FormData()
    formData.append("title" , title)
    formData.append("body" , body)
    formData.append("image" , image)


    axios.post("https://tarmeezacademy.com/api/v1/posts", formData , {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          "Content-Type" : `multipart/form-data`
        },
      })
      .then((response) => {
        let modal = document.getElementById("addNewPostmodal")
        let modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Post Added Successfully',
            showConfirmButton: false,
            timer: 1500
          })

          setTimeout(() => {
            window.location.reload()
          },1600)
          
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        })
      })

}



// Register 

let registerBtn = document.getElementById("registerBtn")




registerBtn.onclick = () => {
    let registerName = document.getElementById("name-register").value
    let registerUserName = document.getElementById("username-register").value
    let registerPassword = document.getElementById("password-register").value
    let registerEmail = document.getElementById("email-register").value
    let registerPfp = document.getElementById("image-register").files[0]


    let formData = new FormData()
    formData.append("name" , registerName )
    formData.append("username" , registerUserName )
    formData.append("password" , registerPassword )
    formData.append("email" , registerEmail )
    formData.append("image" , registerPfp )
    


    axios.post('https://tarmeezacademy.com/api/v1/register' , formData)
    .then((response) => {
        localStorage.setItem("token" , response.data.token)
        localStorage.setItem("user" , JSON.stringify(response.data.user))
        let modal = document.getElementById("registerModal")
        let modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User Register Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        setupUI()
    })
    .catch((error) => {
        if (error.response.data.errors.name) {
          document.getElementById("name-register").classList.add("error")
          document.querySelector(".name-error").innerHTML = error.response.data.errors.name[1]
        }else {
          document.getElementById("name-register").classList.remove("error")
          document.querySelector(".name-error").innerHTML = ""
        } 
        if (error.response.data.errors.username) {
        document.getElementById("username-register").classList.add("error")
        document.querySelector(".user-name-error").innerHTML = error.response.data.errors.username[0]
        } else {
        document.getElementById("username-register").classList.remove("error")
        document.querySelector(".user-name-error").innerHTML = ""
        }
        
        if (error.response.data.errors.password) {
          document.getElementById("password-register").classList.add("error")
        document.querySelector(".password-error").innerHTML = error.response.data.errors.password[0]
        }else {
          document.getElementById("password-register").classList.remove("error")
        document.querySelector(".password-error").innerHTML = ""
          
        }
        if (error.response.data.errors.email) {
          document.getElementById("email-register").classList.add("error")
          document.querySelector(".email-error").innerHTML = error.response.data.errors.email[0]

        } else {
          document.getElementById("email-register").classList.remove("error")
        document.querySelector(".email-error").innerHTML = ""

        }
        if (error.response.data.errors.image) {
          document.getElementById("image-register").classList.add("error")
        document.querySelector(".image-error").innerHTML = error.response.data.errors.image[1]

        }else {
          document.getElementById("image-register").classList.remove("error")
        document.querySelector(".image-error").innerHTML = ""

        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        })
    })
}




setupUI()



function postClicked(postId) {
  location.href = `userpost.html?postId=${postId}`
}

function userNameClicked(authorId) {
  location.href = `userdetalis.html?authorId=${authorId}`
}



function updatePost(postId) {
  let textArea = document.getElementById("body-update-post").value
  axios.put(`https://tarmeezacademy.com/api/v1/posts/${postId}`, {
    "body": textArea
    },
    {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    }
  })
  .then((response) => {
    let modal = document.getElementById("updatePost-modal")
    let modalInstance = bootstrap.Modal.getInstance(modal)
    modalInstance.hide()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Post Edited Successfully',
        showConfirmButton: false,
        timer: 1500
      })

      setTimeout(() => {
        window.location.reload()
      },1600)
      
  }).catch((error) => {
    console.log(error.data.response.message)
  })
}



let editPost = document.querySelector(".edit-btn")
function getPostId(postId) {
  editPost.onclick = function() {
    updatePost(postId)
  }
}




function deletePost(postId) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postId}` , {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then(response => {
      })
      .catch(error => {
        console.error(error);
      });
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your post has been deleted.',
            'success'
          )
          document.querySelector(".swal2-confirm.btn.btn-success").onclick = function() {
            location.reload()
          }
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
}



function homePageClicked() {
  window.location.href = "/Fakegramv0/index.html"
}


function profilePageClicked() {
  window.location.href = "/Fakegramv0/profile.html"
}

let userArray = []

function searchForUsers() {
  axios.get('https://tarmeezacademy.com/api/v1/users')
  .then(function (response) {
    // handle success
    userArray = response.data.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

let SearchBar = document.querySelector(".search-input")
SearchBar.oninput = () => {
  document.querySelector(".search-form .search-results").classList.remove("hide")
  document.querySelector(".x-close").classList.remove("hide")
  document.querySelector(".search-form .search-results").innerHTML = ""
  if (userArray !== "") {
    userArray.map((user) => {
      if (user.username.search(SearchBar.value) > -1) {
          document.querySelector(".search-form .search-results").innerHTML += `
          <li class="d-flex">
          <img class="rounded-circle me-2" width="30px" height="30px" src="${user.profile_image}" alt="">
          <p onclick="userNameClicked(${user.id})" style="cursor: pointer;">@${user.username}</p>
          </li>
          `
      } 
      if (SearchBar.value == "") {
        document.querySelector(".search-form .search-results").classList.add("hide")
        document.querySelector(".x-close").classList.add("hide")
      }
    })
  }
}


searchForUsers()


document.querySelector(".x-close").onclick = () => {
  document.querySelector(".search-form .search-results").classList.add("hide")
  document.querySelector(".x-close").classList.add("hide")
  SearchBar.value = ""
}



















