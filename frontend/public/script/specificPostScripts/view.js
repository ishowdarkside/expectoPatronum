class SpecificPost {
  #form = document.querySelector(".specificPost-grid form");
  #alertWindow = document.querySelector("#alertWindow");
  handleComment(handler) {
    this.#form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(this);

      const res = await handler(formData);
      location.reload(true);
    });
  }

  handleDeleteComment(handler) {
    document.querySelectorAll("#deleteComment").forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const comment = e.target.closest(".comment-wrapper");
        const res = await handler(
          comment.dataset.identifier,
          comment.dataset.post
        );
        if (res.status && res.status === "success") {
          comment.remove();
          this.#handleSuccess(res.message);
        } else {
          this.#handleError(res.message);
        }
      });
    });
  }

  handleLikePost(handler) {
    document
      .querySelector(".likePost")
      .addEventListener("click", async function (e) {
        const currentPost = e.target.closest(".specific-post-wrapper");
        const res = await handler(currentPost.dataset.identifier);
        if (res.message === "Unliked") {
          e.target.src = `/imgs/heart--inactive.svg`;
          e.target.nextElementSibling.textContent = `${
            +e.target.nextElementSibling.textContent.split(" ")[0] - 1
          } likes`;
        } else if (res.message === "Liked") {
          e.target.src = `/imgs/heart--active.svg`;
          e.target.nextElementSibling.textContent = `${
            +e.target.nextElementSibling.textContent.split(" ")[0] + 1
          } likes`;
        }
      });
  }
  #handleSuccess(msg) {
    this.#alertWindow.style.transform = `translateX(-50%) translateY(0)`;
    this.#alertWindow.style.backgroundColor = "#4eae4a";
    this.#alertWindow.querySelector("span").textContent = msg;
    setTimeout(() => {
      this.#alertWindow.style.transform = `translateX(-50%) translateY(-6rem)`;
    }, 2000);
  }

  #handleError(msg) {
    this.#alertWindow.style.transform = `translateX(-50%) translateY(0)`;
    this.#alertWindow.style.backgroundColor = "#d1200b";
    this.#alertWindow.querySelector("span").textContent = msg;
    setTimeout(() => {
      this.#alertWindow.style.transform = `translateX(-50%) translateY(-6rem)`;
    }, 2000);
  }
}

export default new SpecificPost();
