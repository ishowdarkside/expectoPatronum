class updateClass {
  #generalForm = document.querySelector("#meForm");
  #passwordForm = document.querySelector("#passwordForm");
  #alertWindow = document.querySelector("#alertWindow");
  #logoutBtn = document.querySelector("#logout");
  handleGeneralForm(handler) {
    this.#generalForm.addEventListener("submit", async (e) => {
      try {
        e.preventDefault();
        const formData = new FormData(this.#generalForm);
        const res = await handler(formData);
        if (res.data.status === "success") {
          this.handleSuccess(res.data.message);
        } else if (res.data.status === "error") {
          this.handleError(res.data.message);
        }
      } catch (err) {
        this.handleError(err.message);
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

  handlePasswordForm(handler) {
    this.#passwordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const currentPassword =
        this.#passwordForm.querySelector("#currentPassword");
      const newPassword = this.#passwordForm.querySelector("#newPassword");
      const newPasswordConfirm = this.#passwordForm.querySelector(
        "#newPasswordConfirm"
      );
      const res = await handler(
        currentPassword.value,
        newPassword.value,
        newPasswordConfirm.value
      );

      if (res.status === "success") {
        this.handleSuccess(res.message);
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else if (res.status === "fail") {
        this.handleError(res.message);
      }
    });
  }

  handleLogout(handler) {
    this.#logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const res = await handler();
      console.log(res);
      if (res.status === "success") {
        this.handleSuccess(res.message);
        setTimeout(() => {
          location.reload(true);
        }, 2000);
      }
    });
  }
}

export default new updateClass();
