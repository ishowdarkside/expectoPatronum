class SpecUserPosts {
  #parentElement = document.querySelector(".page__me__posts");

  #followButton = document.querySelector("#editProfileOperation");
  #alertWindow = document.querySelector("#alertWindow");
  #checkPrivate = document.querySelector(".private-heading");
  async populatePosts(handler) {
    const res = await handler();
    this.#parentElement.innerHTML = "";
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

  handleEachPost(handler, likeHandler) {
    if (this.#checkPrivate) return;
    this.#parentElement.addEventListener("click", (e) => {
      const post = e.target.closest(".postWrapper");
      if (!post) return;
      const currPost = post.dataset.identifier;
      this.#displayOverlay(handler, currPost, likeHandler);
    });
  }

  async #displayOverlay(handler, identifier, likeHandler) {
    const res = await handler(identifier);

    const html = `
    <div class='page__me__post-overlay' style='display:flex'>
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
    
    <span id="#description">${
      res.data.postDescription
        ? `<b>${res.data.creator.name}</b> <span>${res.data.postDescription}</span>`
        : ""
    }</span>
    </div>
    <div class="page__me__operations">
    <button id="likePost"><img class='likePost' src="${
      res.data.likes.includes(res.currentUser)
        ? "/imgs/heart--active.svg"
        : "/imgs/heart--inactive.svg"
    }" alt="like button"></button>
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
    </div>
    `;

    document.querySelector("body").insertAdjacentHTML("beforeend", html);

    this.#handleClosingOverlay();
    this.#handleLiking(likeHandler, identifier);
  }

  #handleClosingOverlay() {
    document
      .querySelector(".page__me__post-overlay #closeOverlay")
      .addEventListener("click", function (e) {
        this.parentElement.remove();
      });
  }

  handleRequestingFollow(handler) {
    this.#followButton.addEventListener("click", async function (e) {
      e.preventDefault();
      const res = await handler();

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

  #handleLiking(likeHandler, identifier) {
    document
      .querySelector(".page__me__post-overlay .likePost")
      .addEventListener("click", async function (e) {
        //if (!e.target.matches(".likePost")) return;
        const res = await likeHandler(identifier);

        if (res.message === "Liked") {
          e.target.src = "/imgs/heart--active.svg";
          e.target.parentElement.nextElementSibling.textContent = `${
            +e.target.parentElement.nextElementSibling.textContent.split(
              " "
            )[0] + 1
          } likes`;
        } else if (res.message === "Unliked") {
          e.target.src = "/imgs/heart--inactive.svg";
          e.target.parentElement.nextElementSibling.textContent = `${
            +e.target.parentElement.nextElementSibling.textContent.split(
              " "
            )[0] - 1
          } likes`;
        }
      });
  }
}

export default new SpecUserPosts();
