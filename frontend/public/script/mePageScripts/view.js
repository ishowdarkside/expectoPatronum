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

  handleEachPost(handler, deleteHandler, commentHandler, deleteComment) {
    this.#parentElement.addEventListener("click", (e) => {
      const post = e.target.closest(".postWrapper");
      if (!post) return;
      const currPost = post.dataset.identifier;
      this.#displayOverlay(
        handler,
        currPost,
        deleteHandler,
        commentHandler,
        deleteComment
      );
    });
  }

  async #displayOverlay(
    handler,
    identifier,
    deleteHandler,
    commentHandler,
    deleteComment
  ) {
    const res = await handler(identifier);
    this.#overlay.style.display = "flex";

    const html = `
    
    <button id="closeOverlay">X</button>
    <div class="page__me__post-popup" data-post='${res.data.id}'>
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
    ${res.data.comments
      .map((comment) => {
        return `<div class="comment-wrapper" data-identifier="${comment._id}">
      <span id='commCreator'>${comment.creator.name.split(" ")[0]}</span>
      <img src='${comment.creator.profilePicture}'>
      <span id="commData">${comment.content}</span>
      <button id="deleteComment">Delete</button>
      </div>
      `;
      })
      .join("")}
  
    </div>
    <div class="page__me__operations">
   
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
    this.#handlePostComment(commentHandler, identifier);
    this.#handleDeleteComment(deleteComment, identifier);
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

  #handlePostComment(commentHandler, identifier) {
    document
      .querySelector(".page__me__operations form")
      .addEventListener("submit", async function (e) {
        e.preventDefault();
        const input = this.querySelector("#postComment");
        const res = await commentHandler(input.value, identifier);
        location.reload(true);
      });
  }

  #handleDeleteComment(handler, postIdentifier) {
    document.querySelectorAll("#deleteComment").forEach((btn) => {
      btn.addEventListener("click", async function (e) {
        e.preventDefault();
        const commentElement = e.target.closest(".comment-wrapper");
        const res = await handler(
          commentElement.dataset.identifier,
          postIdentifier
        );

        commentElement.remove();
      });
    });
  }

  handleFollowingPanel(handler) {
    const followBackBtns = document.querySelectorAll("#followback");
    if (!followBackBtns) return;
    followBackBtns.forEach((btn) => {
      btn.addEventListener("click", async function (e) {
        e.preventDefault();
        const follower = e.target.closest(".recentFollower");
        const res = await handler(follower.dataset.identifier);

        if (res.message.startsWith("Started")) {
          e.target.textContent = "Following";
        } else {
          e.target.textContent = "Follow back";
        }
      });
    });
  }
}

export default new PostView();
