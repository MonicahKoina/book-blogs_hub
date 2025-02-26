const container = document.getElementById("blog-container");

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const posts = data.posts.slice(0, 10); // Limit to 10 posts
        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("blog-card");

            postElement.innerHTML = `
                <img src="${post.cover}" alt="${post.title} Cover" class="book-cover">
                <div class="blog-content">
                    <h2>${post.title}</h2>
                    <h3>by ${post.author}</h3>
                    <p class="genre"><strong>Genre:</strong> ${post.genre}</p>
                    <p>${post.description}</p>
                    <div class="blog-meta">
                        <span class="reaction"><i class="bx bx-heart"></i> ${post.reactions.likes}</span>
                        <span class="reaction"><i class="bx bx-comment"></i> ${post.reactions.comments}</span>
                        <span class="reaction"><i class="bx bx-bookmark"></i> ${post.reactions.bookmarks}</span>
                    </div>
                </div>
            `;

            container.appendChild(postElement);
        });
    })
    .catch(error => console.error("Error fetching data:", error));


const btn = document.querySelector('.moving-btn');

document.addEventListener('mousemove', (e) => {
    const btnRect = btn.getBoundingClientRect();
    const buffer = 60;
    const isNear =
        e.clientX > btnRect.left - buffer &&
        e.clientX < btnRect.right + buffer &&
        e.clientY > btnRect.top - buffer &&
        e.clientY < btnRect.bottom + buffer;

    if (isNear) {
        moveButton(e.clientX, e.clientY, btnRect);
    }
});

function moveButton(mouseX, mouseY, btnRect) {
    const maxMove = 80;
    const buffer = 20;
    let offsetX = (btnRect.left + btnRect.width / 2) - mouseX;
    let offsetY = (btnRect.top + btnRect.height / 2) - mouseY;

    let distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);
    let moveX = (offsetX / distance) * maxMove;
    let moveY = (offsetY / distance) * maxMove;
    let newX = btn.offsetLeft + moveX;
    let newY = btn.offsetTop + moveY;

    newX = Math.max(buffer, Math.min(window.innerWidth - btnRect.width - buffer, newX));
    newY = Math.max(buffer, Math.min(window.innerHeight - btnRect.height - buffer, newY));
    gsap.to(btn, {
        x: newX - btn.offsetLeft,
        y: newY - btn.offsetTop,
        duration: 0.3,
        ease: "power3.out"
    });
}
