// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


// Save bookmark
function saveBookmark(e){
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

 /*
    // Local Storage Text
     localStorage.setItem('test', 'Hello World');
     console.log(localStorage.getItem('test'));
     localStorage.removeItem('test');
     console.log(localStorage.getItem('test'));
 */


    // Test if bookmarks is null
    if(localStorage.getItem("bookmarks") ===  null){
        // Init Array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get Bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    }

    // Clear form
    document.getElementById('myForm').reset()

    // Re-fetch bookmarks
    fetchBookmarks();
     
    // Prevent form from submitting
    e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url){
    // Get Bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for(var i = 0; i< bookmarks.length ; i++){
        if(bookmarks[i].url === url){
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
    // Get Bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    
    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+
                                      '<a class-"btn btn-default" style="text-decoration:none; border:1px solid black; font-size: .6em; padding: 4px; background-color:green; color: #fff; margin: 0px 10px;" target="_blank" href="'+url+'"> Visit </a>' +
                                      '<a onclick="deleteBookmark(\''+url+'\')" class-"btn btn-danger" style="text-decoration:none; border:1px solid black; font-size: .6em; padding: 4px; background-color:red; color: #fff"  href="#">Delete</a>' +
                                      '</h3>'+
                                      '</div>'  
    }
}

// Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}
