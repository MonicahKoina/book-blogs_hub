
const container = document.getElementById("blog-container");
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        data.posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("blog-card");
            postElement.innerHTML = `
        <h2>${post.title}</h2>
        `
            container.appendChild(postElement)
        });
    })