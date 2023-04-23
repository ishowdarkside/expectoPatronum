class LoginView {
  #formElement = document.querySelector("#login");
  #alertWindow = document.querySelector("#alertWindow");
  attachListener(handler) {
    this.#formElement.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.querySelector("#inputEmailLogin");
      const password = document.querySelector("#inputPasswordLogin");
      const res = await handler(email.value, password.value);
      email.value = password.value = "";

      if (res.status === "fail") {
        this.handleError(res.message);
      }
      if (res.status === "success") {
        this.handleSuccess(res.message);
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
}

export default new LoginView();
