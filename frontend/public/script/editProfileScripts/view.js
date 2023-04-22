class updateClass {
  #generalForm = document.querySelector("#meForm");
  #alertWindow = document.querySelector("#alertWindow");
  handleGeneralForm(handler) {
    this.#generalForm.addEventListener("submit", async (e) => {
      try {
        e.preventDefault();
        const formData = new FormData(this.#generalForm);
        const res = await handler(formData);
        console.log(res);
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
}

export default new updateClass();
