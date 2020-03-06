var delButton = document.querySelector('#delete-button');
if(delButton) {
    delButton.addEventListener('click', (e) => {
        let id = delButton.dataset.id;
        let url = `/delete/${id}`
        if (confirm('Delete Recipe')) {
            $.ajax({
                url:url,
                type: 'DELETE',
                success: function(result){
                    console.log('deleted ')
                    window.location.href = '/'
                },
                error: function(err){
                    console.log(err)
                }
            })
        //     let xhr = new XMLHttpRequest()
        //     xhr.open('post', url)
        //     xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        //     xhr.send()
        //     xhr.onload = function() {
        //         if (xhr.status != 200) { // analyze HTTP status of the response
        //             console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        //           } else { // show the result
        //             console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
        //           }
        //     }
         }
        // console.log(url)

      });
}else {
    console.log('none')
}
let editButton = document.querySelector('#edit-button');
editButton.addEventListener('click', function(e) {
    let id = e.target.dataset.id;
    // alert(e.target.getAttribute("data-name"));

    let name = e.target.dataset.name;
    let age = e.target.dataset.age;
    console.log(name)
    document.getElementById('teachId').value = id;
    document.getElementById('teachName').value = name;
    document.getElementById('teachAge').value = age

})

// addButton.addEventListener('click', () => {
//     alert('add')
// })
