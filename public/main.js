var updateButton = document.getElementById("update")

updateButton.addEventListener("click", function(){
  fetch('quotes', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'name': 'Jeffrey',
    'quote': 'I have overtaken Jerome.'
  })
})
.then(res => {
  if (res.ok) return res.json();
})
.then(data => {
  console.log(data)
})
})
