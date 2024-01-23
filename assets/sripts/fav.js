let divAll=document.querySelector(".p-divs");
fetch("http://localhost:3000/Fav")
.then(res=>res.json())
.then(data=>{
    data.forEach(element => {
       divAll.innerHTML+=`
       <div class="div3">
       <div class="img">
         <img src="${element.img}" alt="" />
       </div>
       <div class="p-text">
       <i class="bi bi-heart-fill"  onclick="Fav(${element.id})"></i>
         <h3>${element.name}</h3>
         <p>${element.des}</p>
       </div>
       <div class="p-icon">
         <div class="p-img">
           <img src="./assets/img/author.jpg" alt="" />
         </div>
         <div class="p">
           <h6>Michael Smith,</h6>
           <h6 id="h6">Author</h6>
         </div>
         <div class="price">${element.price}</div>
       </div>
     </div>
       `
       
    });
})

function Delete(id) {
    axios
      .delete("http://localhost:3000/Fav/" + id)
      .then((res) => (window.location = "./fav.html"));
  }
