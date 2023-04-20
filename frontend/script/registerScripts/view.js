class registerView {
  #formElement = document.querySelector("#register");
  #alertWindow = document.querySelector("#alertWindow");
  attachListener(handler) {
    this.#formElement.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.querySelector("#inputName");
      const email = document.querySelector("#inputEmail");
      const password = document.querySelector("#inputPassword");
      const passConfirm = document.querySelector("#inputPasswordConfirm");
      const res = await handler(
        name.value,
        email.value,
        password.value,
        passConfirm.value
      );

      if (res.status === "fail" || res.status === "error") {
        this.#alertWindow.style.transform = `translateX(-50%) translateY(0)`;
        setTimeout(() => {
          this.#alertWindow.style.transform = `translateX(-50%) translateY(-7rem)`;
        }, 2000);
        this.#alertWindow.style.backgroundColor = "#d1200b";
        this.#alertWindow.querySelector("span").textContent = res.message;
      }

      if (res.status === "success") {
        this.#alertWindow.style.backgroundColor = "#4eae4a";
        name.value = email.value = password.value = passConfirm.value = "";
        this.#alertWindow.style.transform = `translateX(-50%) translateY(0)`;
        this.#alertWindow.querySelector("span").textContent = res.message;
        setTimeout(() => {
          location.reload(true);
        }, 3000);
      }
    });
  }
}

export default new registerView();
