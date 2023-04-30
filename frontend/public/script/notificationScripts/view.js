class Notification {
  #parentElement = document.querySelector(".notifications-wrapper");
  #alertWindow = document.querySelector("#alertWindow");
  handleRedirection(acceptHandler, declineHandler) {
    const notifications = document.querySelectorAll(".notification-wrapper");
    notifications.forEach((el) => {
      el.addEventListener("click", async (e) => {
        if (!e.target.matches(".acceptRequest, .declineRequest"))
          return (window.location.href = `/findUser/${el.dataset.identifier}`);
        if (e.target.matches(".acceptRequest")) {
          const userWrapper = e.target.closest(".notification-wrapper");
          const res = await acceptHandler(userWrapper.dataset.identifier);
          console.log(this.#alertWindow);
          if (res.status === "success") this.#handleSuccess(res.message);
          else if (res.status === "fail") this.#handleError(res.message);
          userWrapper.remove();
        }
        if (e.target.matches(".declineRequest")) {
          const userWrapper = e.target.closest(".notification-wrapper");
          const res = await declineHandler(userWrapper.dataset.identifier);
          if (res.status === "success") this.#handleSuccess(res.message);
          else if (res.status === "fail") this.#handleError(res.message);
          userWrapper.remove();
        }
      });
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

export default new Notification();
