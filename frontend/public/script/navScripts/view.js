class NavView {
  #searchForm = document.querySelector(".navbar .input-container #searchForm");

  handleSearch() {
    this.#searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputData = this.#searchForm.querySelector("#search").value;
      window.location.href = `/findUser?search=${inputData}`;
    });
  }
}

export default new NavView();
