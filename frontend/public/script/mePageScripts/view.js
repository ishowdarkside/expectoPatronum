class PostView {
  #parentElement = document.querySelector(".page__me__posts");
  #overlay = document.querySelector(".page__me__post-overlay");
  #alertWindow = document.querySelector("#alertWindow");
  async populatePosts(handler) {
    this.#overlay.innerHTML = "";
    const res = await handler();
    this.#parentElement.innerHTML = "";
    if (res.data.length === 0) {
      return this.#parentElement.insertAdjacentHTML(
        "afterbegin",
        "<span>Nothing to show here</span>"
      );
    }

    res.data.forEach((post) => {
      const html = `
            <div data-identifier="${post._id}" class="postWrapper"><div class="review-overlay"></div><img src="${post.postImage}" alt="photo"></div>`;
      this.#parentElement.insertAdjacentHTML("afterbegin", html);
    });
  }

  handleEachPost(handler, deleteHandler) {
    this.#parentElement.addEventListener("click", (e) => {
      const post = e.target.closest(".postWrapper");
      if (!post) return;
      const currPost = post.dataset.identifier;
      this.#displayOverlay(handler, currPost, deleteHandler);
    });
  }

  async #displayOverlay(handler, identifier, deleteHandler) {
    this.#overlay.style.display = "flex";
    const res = await handler(identifier);
    console.log(res);
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
    <button id="deleteCurrentPost"><img src="/imgs/trash.svg"></button>
    </div>
    <div class="page__me__comment-section">
    ${
      res.data.postDescription
        ? `<a href="/findUser/${res.data.creator._id}"><img src="${
            res.data.creator.profilePicture
          }"> <span><b>${res.data.creator.name.split(" ")[0]}</b> ${
            res.data.postDescription
          }</span></a>`
        : ""
    }
  
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
    this.#handleDeletingPost(deleteHandler, identifier);
  }
  #handleClosingOverlay() {
    this.#overlay
      .querySelector("#closeOverlay")
      .addEventListener("click", (e) => {
        this.#overlay.innerHTML = "";
        this.#overlay.style.display = "none";
      });
  }

  #handleDeletingPost(handler, identifier) {
    this.#overlay
      .querySelector("#deleteCurrentPost")
      .addEventListener("click", async (e) => {
        const res = await handler(identifier);

        if (res.includes("successfully")) this.#handleSuccess(res);
      });
  }

  #handleSuccess(msg) {
    this.#alertWindow.style.transform = `translateX(-50%) translateY(0)`;
    this.#alertWindow.style.backgroundColor = "#4eae4a";
    this.#alertWindow.querySelector("span").textContent = msg;
    setTimeout(() => {
      location.reload(true);
    }, 2000);
  }
}

export default new PostView();
