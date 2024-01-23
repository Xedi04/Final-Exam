let divAll=document.querySelector(".p-divs");
let Search =document.querySelector("#search");
let Sort =document.querySelector("#sort");
let filterArr=[];
let copyArr=[]


function Show(){
fetch("http://localhost:3000/Course")
.then(res=>res.json())
.then(data=>{
    divAll.innerHTML=""
    copyArr=data;
    filterArr=filterArr.length||Search.value?filterArr:data;
    filterArr.forEach(element => {
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
            <h6 onclick="Details(${element.id})">Michael Smith,</h6>
            <h6 id="h6">Author</h6>
          </div>
          <div class="price">${element.price}</div>
        </div>
      </div>
        `
    });
})
}
Show();

Search.addEventListener("input", (e)=>{
filterArr=copyArr;
filterArr=filterArr.filter((el)=>
el.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
)
Show()
})

Sort.addEventListener("change", (e)=>{
if(e.target.value==="as"){
    filterArr.sort((a,b)=>a.price-b.price)
}else if(e.target.value==="des"){
    filterArr.sort((a,b)=>b.price-a.price)
}else{
    filterArr=[]
}
Show()
})

function Fav (id){
    axios.get("http://localhost:3000/Course/"+id)
    .then(res=>{
        axios.post("http://localhost:3000/Fav", res.data)
        .then(res=>window.location="./fav.html")
    })
}


let Close =document.querySelector("#close");
let Menu1 =document.querySelector(".menu");
let List =document.querySelector("#list");

List.addEventListener("click", ()=>{
        Menu1.style.display="block"
    
})

Close.addEventListener("click", ()=>{
    Menu1.style.display="none"
})