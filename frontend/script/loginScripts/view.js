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
        this.#alertWindow.style.transform = `translateX(-50%) translateY(0)`;
        setTimeout(() => {
          this.#alertWindow.style.transform = `translateX(-50%) translateY(-5rem)`;
        }, 2000);
        this.#alertWindow.style.backgroundColor = "#d1200b";
        this.#alertWindow.querySelector("span").textContent = res.message;
      }
      if (res.status === "success") {
        this.#alertWindow.style.backgroundColor = "#4eae4a";
        this.#alertWindow.style.transform = `translateX(-50%) translateY(0)`;
        this.#alertWindow.querySelector("span").textContent = res.message;
        setTimeout(() => {
          window.location.href = "/main";
        }, 3000);
      }
    });
  }
}

export default new LoginView();
