var updateButton = document.getElementById("update")
var deleteButton = document.getElementById("delete")

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
  window.location.reload()
})
})

deleteButton.addEventListener("click", function(){
  fetch('quotes',{
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Jeffrey'
    })
  })
  .then(res => {
    if (res.ok) return res.json();
  })
  .then(data =>{
    console.log(data)
    window.location.reload()
  })
})
