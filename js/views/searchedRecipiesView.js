class SearchedRecipiesView {
  parentEl = document.querySelector(
    ".hero-section-left-side-search-suggestion-body"
  );

  render(arr) {
    this.data = arr;
    let html = this.getHTML();
    this.parentEl.innerHTML = html;
  }
  getHTML() {
    let html = ``;
    this.data.forEach((rec) => {
      html += `
      <div class="hero-section-left-side-search-suggestion-body-badge">
      <img
        src="http://localhost:1337${rec.recipe_img.data[0].attributes.url}"
        alt="${rec.recipe_name}"
        class="hero-section-left-side-search-suggestion-body-badge-img"
      />
      <div
        class="hero-section-left-side-search-suggestion-body-badge-proprities"
      >
        <p
          class="hero-section-left-side-search-suggestion-body-badge-title"
        >
        ${rec?.recipe_name}
        </p>
        <p
          class="hero-section-left-side-search-suggestion-body-badge-ingredients"
        >
        ${rec?.recipe_ingredients.split(",").join(" ")}
        </p>
        <div
          class="hero-section-left-side-search-suggestion-body-badge-time-box"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="hero-section-left-side-search-suggestion-body-badge-time-icon"
            viewBox="0 0 26 26"
            fill="none"
          >
            <circle
              cx="13"
              cy="13"
              r="11.9167"
              stroke="#574747"
              stroke-width="2"
            />
            <path
              d="M13 7.58331V14.0833L15.7083 16.7916"
              stroke="#574747"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p
            class="hero-section-left-side-search-suggestion-body-badge-time"
          >
          ${rec?.recipe_preparation_time}
          </p>
        </div>
      </div>
    </div>
     
      
      
      `;
    });

    return html;
  }
}
export default new SearchedRecipiesView();
