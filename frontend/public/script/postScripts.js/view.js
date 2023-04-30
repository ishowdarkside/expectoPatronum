class PostView {
  #formElement = document.querySelector("#createPostForm");
  #alertWindow = document.querySelector("#alertWindow");
  handlePosting(handler) {
    this.#formElement.addEventListener("submit", async (e) => {
      e.preventDefault();
      const postData = new FormData(this.#formElement);
      const res = await handler(postData);
      if (res.data.status === "success") {
        this.handleSuccess(res.data.message);
        setTimeout(() => {
          window.location.href = "/main";
        }, 2000);
      }
    });
  }

  handleSuccess(msg) {
    this.#alertWindow.style.transform = `translateX(-50%) translateY(0)`;
    this.#alertWindow.style.backgroundColor = "#4eae4a";
    this.#alertWindow.querySelector("span").textContent = msg;
    setTimeout(() => {
      location.reload(true);
    }, 2000);
  }

  handleError(msg) {
    this.#alertWindow.style.transform = `translateX(-50%) translateY(0)`;
    this.#alertWindow.style.backgroundColor = "#d1200b";
    this.#alertWindow.querySelector("span").textContent = msg;
    setTimeout(() => {
      this.#alertWindow.style.transform = `translateX(-50%) translateY(-6rem)`;
    }, 2000);
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
