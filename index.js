document.addEventListener("DOMContentLoaded", () => {

  const sidebarNav = document.querySelector('.sidenav')
  const content = document.querySelector('.main-note')
  const createNote = document.getElementById("create")
  const editNote = document.getElementById("edit")
  const deleteNote = document.getElementById("delete")

  fetch('http://localhost:3000/api/v1/users/1')
  .then(response => response.json())
  .then((json) => {

    console.log(json)
    userId = json.id

    json.notes.forEach((note) => {
      const sidebarItem = document.createElement('a')
      sidebarItem.innerText = note.title
      sidebarItem.dataset.noteId = note.id
      sidebarNav.append(sidebarItem)

      sidebarItem.addEventListener('click', () => {
        content.innerHTML = `<h1>${note.title}</h1>
        <h2>${json.name}</h2>
        <p>${note.body}</p>`
      })
    })

    let firstNote = json.notes[0]
    content.innerHTML = `<h1>${firstNote.title}</h1>
    <h2>${json.name}</h2>
    <p>${firstNote.body}</p>`

  }) // fetch

  //  add event listener on the create button
  // display the user the form
  // fetch/post to create the new item
  // refresh and we'll have a new post

  createNote.addEventListener('click', () => {
    console.log("poop");
    content.innerHTML = `
      <form id='create-note'>
        <label>Title</label><br />
        <input type="text" name="title" id="formTitle"><br />
        <label>Description</label><br />
        <textarea name="body" id="formBody" rows="8" cols="80"></textarea><br />
        <input type="submit" name="submit">
      </form>
    `

    let createForm = document.getElementById("create-note")
    //let createForm = document.querySelector('#create-note')

    createForm.addEventListener('submit', (event) => {
      event.preventDefault()
      let formTitle = document.getElementById('formTitle')
      let formBody = document.getElementById('formBody')
      console.log(formTitle, formBody);
      console.log(formTitle.value, formBody.value);
      let noteObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'title': formTitle.value,
          'body': formBody.value,
          'user_id': userId
        })
      }
      fetch("http://localhost:3000/api/v1/notes", noteObj)
      .then(response => {
        return response.json()
      })
      .then(json => {
        const sidebarItem = document.createElement('a')
        sidebarItem.innerText = json.title
        sidebarItem.dataset.noteId = json.id
        sidebarNav.append(sidebarItem)

        sidebarItem.addEventListener('click', () => {
          content.innerHTML = `<h1>${json.title}</h1>
          <h2>${json.user.name}</h2>
          <p>${json.body}</p>`
        }) // adding sidebar event listener
      }) //then statement
    }) //fetch
  }) //form event listener

  

}) // dom listener
