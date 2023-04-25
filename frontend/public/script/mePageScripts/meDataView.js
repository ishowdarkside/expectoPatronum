class meDataView {
  #dataWrapper = document.querySelector(
    ".page__me__post-follower-data-wrapper .data-wrapper"
  );

  async updatePostCount(handler) {
    const res = await handler();
    this.#dataWrapper.querySelector(
      "#postData"
    ).innerHTML = `<b>${res.data.length}</b> posts`;
  }
}

export default new meDataView();
