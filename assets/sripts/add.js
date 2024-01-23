let id = new URLSearchParams(window.location.search).get("id");
let Form = document.querySelector("#form");
let Des = document.querySelector("#des");
let Price = document.querySelector("#price");
let Name = document.querySelector("#name");
let imgDiv = document.querySelector("#imgdiv");
let fileImg = document.querySelector("#file");
let Table = document.querySelector("tbody");

fileImg.addEventListener("input", (e) => {
  let file = e.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      imgDiv.src = reader.result;
    };
  }
});

Form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = [Des, Price, Name, fileImg];
  if (
    fileImg.value !== "" &&
    Name.value !== "" &&
    Price.value !== "" &&
    Des.value !== "" &&
    Price.value[0] !== "-"
  ) {
    axios.post("http://localhost:3000/Course", {
      name: Name.value,
      des: Des.value,
      price: Price.value,
      img: imgDiv.src,
    }).then(res=>window.location="./index.html")
  } else {
    inputs.forEach((input) => {
      if (input.value.trim() == "") {
        input.previousElementSibling.style.display = "block";
      } else {
        input.previousElementSibling.style.display = "none";
      }
    });
  }
});

fetch("http://localhost:3000/Course")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      Table.innerHTML += `
        <tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.des}</td>
        <td>${element.price}</td>
        <td><button onclick="Delete (${element.id})">Delete</button></td>
    </tr>
        `;
    });
  });

function Delete(id) {
  axios
    .delete("http://localhost:3000/Course/" + id)
    .then((res) => (window.location = "./add.html"));
}
