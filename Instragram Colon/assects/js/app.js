// get elements
const add_new_post = document.getElementById('add-new-post');
const msg = document.querySelector('.msg');
const all_post = document.querySelector('.all-post');

// get all post 
const getAllPost = () => {
    // get data form LS
    let data = readLSData('product');

    // check data
    if (!data) {
        all_post.innerHTML = `<p class="text-center">No Post Found</p>`
        return false;
    }

    if (data) {
         // init value
        let list = '';

        // loop for data
        data.map((item, index) => {
            list += `
            
                <div class="card-body">
                <div class="post-auth-area">
                    <div class="user-info">
                        <img src="${item.aphoto}" alt="">
                        <div class="details">
                            <p>${item.aname}</p>
                            <span>Maldivs</span>
                        </div>
                    </div>
                    <div class="dropdown">
                        <a class="dropdown-toggle" data-bs-toggle="dropdown">
                            <i class="fas fa-ellipsis-h"></i>
                        </a>
                    
                        <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Edit</a></li>
                        <li><a class="dropdown-item" href="#">Delete</a></li>
                        <li><a class="dropdown-item" href="#">Cancel</a></li>
                        </ul>
                    </div>
                </div>
                <img src="${item.pphoto}" alt="">
                <div class="post-content-area mt-2">
                    <p>${item.pcontent}</p>
                </div>
                </div>
            
            `
        });

        all_post.innerHTML = list;

    }
}

getAllPost();

// validation form
add_new_post.onsubmit = (e) => {
    e.preventDefault();

    // form data get
    let form_data = new FormData(e.target);
    let getPost = Object.fromEntries(form_data.entries());
    let {aname, aphoto, pcontent, pphoto} = Object.fromEntries(form_data.entries());

    // validation msg 
    if (!aname || !aphoto || !pcontent || !pphoto){
        msg.innerHTML = setAlert('All feilds are required');
    } else {
        createLSData('product', getPost);
        e.target.reset();
        getAllPost();
    }
}

