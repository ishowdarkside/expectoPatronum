class MainView {
  #parentElement = document.querySelector(".main-posts-wrapper");
  handleLikingPost(handler) {
    this.#parentElement.querySelectorAll(".post-wrapper").forEach((post) => {
      const likes = post.querySelector("#likes");
      post.addEventListener("click", async (e) => {
        if (e.target.matches(".likeIcon")) {
          const res = await handler(post.dataset.postIdentifier);
          console.log(res);
          if (res.message === "Liked") {
            e.target.src = "/imgs/heart--active.svg";
            likes.textContent = `${+likes.textContent.split(" ")[0] + 1} likes`;
          } else if (res.message === "Unliked") {
            e.target.src = "/imgs/heart--inactive.svg";
            likes.textContent = `${likes.textContent.split(" ")[0] - 1} likes`;
          }
        }
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

export default new MainView();
