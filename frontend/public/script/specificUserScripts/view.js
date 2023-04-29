class SpecUserPosts {
  #parentElement = document.querySelector(".page__me__posts");
  #overlay = document.querySelector(".page__me__post-overlay");
  #followButton = document.querySelector("#editProfileOperation");
  #alertWindow = document.querySelector("#alertWindow");
  #checkPrivate = document.querySelector(".private-heading");
  async populatePosts(handler) {
    this.#overlay.innerHTML = "";

    const res = await handler();
    if (res.data === "Private Account") return;
    if (res.data === null || res.data.length === 0) {
      return this.#parentElement.insertAdjacentHTML(
        "afterbegin",
        "<span>Nothing to show here</span>"
      );
    }
    res.data.forEach((post) => {
      const html = `
              <div data-identifier="${post.id}" class="postWrapper"><div class="review-overlay"></div><img src="${post.postImage}" alt="photo"></div>`;
      this.#parentElement.insertAdjacentHTML("afterbegin", html);
    });
  }

  handleEachPost(handler) {
    if (this.#checkPrivate) return;
    this.#parentElement.addEventListener("click", (e) => {
      const post = e.target.closest(".postWrapper");
      if (!post) return;
      const currPost = post.dataset.identifier;
      this.#displayOverlay(handler, currPost);
    });
  }

  async #displayOverlay(handler, identifier) {
    this.#overlay.style.display = "flex";
    const res = await handler(identifier);
    const html = `
    
    <button id="closeOverlay">X</button>
    <div class="page__me__post-popup">
    <div class="page__me__img-wrapper">
    <img src="${res.data.postImage}">
    </div>
    <div class="page__me__about-post">
    <div class="page__me__post-creator">
    <img src="${res.data.creator.profilePicture}">
    <span id="creator">${res.data.creator.name}</span>
    </div>
    <div class="page__me__comment-section">
    <span>${res.data.postDescription ? "description:" : ""}</span>
    <span id="#description">${
      res.data.postDescription ? res.data.postDescription : ""
    }</span>
    </div>
    <div class="page__me__operations">
    <button id="likePost"><img src="/imgs/heart--inactive.svg" alt="like button"></button>
    <a id="numLikes" href="#">${res.data.likeCount} likes</a>
    <span id="date">${new Date(res.data.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })}</span>
    <form>
    <input type="text" id="postComment" name="postComment" placeholder="publish comment">
    </form>
    </div>
    </div>
    </div>
    `;
    this.#overlay.innerHTML = "";
    this.#overlay.insertAdjacentHTML("afterbegin", html);

    this.#handleClosingOverlay();
  }

  #handleClosingOverlay() {
    this.#overlay
      .querySelector("#closeOverlay")
      .addEventListener("click", (e) => {
        this.#overlay.innerHTML = "";
        this.#overlay.style.display = "none";
      });
  }

  handleRequestingFollow(handler) {
    this.#followButton.addEventListener("click", async function (e) {
      e.preventDefault();
      const res = await handler();
      console.log(res);

      if (res.private) {
        this.textContent = "Follow";
        this.classList.remove("followingSpecUser");
        location.reload(true);
      }
      if (res.message.startsWith("Started following")) {
        this.textContent = "Following";
        this.classList.add("followingSpecUser");
      }
      if (res.message.startsWith("Unfollowed")) {
        this.textContent = "Follow";
        this.classList.remove("followingSpecUser");
      }
      if (res.message.startsWith("unrequested")) {
        this.textContent = "Follow";
        this.classList.remove("buttonRequested");
      }
      if (res.message.startsWith("Requested")) {
        this.textContent = "Requested";
        this.classList.add("buttonRequested");
      }
    });
  }
}

export default new SpecUserPosts();
