(() => {
  const works = window.WORKS || [];
  const grid = document.getElementById("print-grid");
  const lightbox = document.getElementById("lightbox");
  const track = document.getElementById("lightbox-track");
  const titleEl = document.getElementById("lightbox-title");
  const sizesEl = document.getElementById("lightbox-sizes");
  const inquireEl = document.getElementById("lightbox-inquire");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-nav.prev");
  const nextBtn = lightbox.querySelector(".lightbox-nav.next");

  let index = 0;
  let touchStartX = 0;
  let touchDeltaX = 0;
  let lastFocused = null;

  function sizesLabel(sizes) {
    return sizes.join(" · ");
  }

  function inquireHref(work) {
    const subject = encodeURIComponent(`Print inquiry: ${work.title}`);
    const body = encodeURIComponent(
      `Hi Deb,\n\nI'd like to inquire about "${work.title}".\nAvailable sizes: ${work.sizes.join(", ")}\n\nThanks!`,
    );
    return `mailto:hello@madebydeb.art?subject=${subject}&body=${body}`;
  }

  function renderGrid() {
    grid.innerHTML = works
      .map(
        (work, i) => `
      <li>
        <button
          class="print-tile"
          type="button"
          data-index="${i}"
          aria-label="View ${work.title}"
        >
          <span class="print-frame">
            <img
              src="${work.image}"
              alt=""
              style="object-position: ${work.focus || "center"}"
              loading="lazy"
            />
          </span>
          <span class="print-info">
            <span class="print-title">${work.title}</span>
            <span class="print-sizes">${sizesLabel(work.sizes)}</span>
          </span>
        </button>
      </li>`,
      )
      .join("");
  }

  function renderSlides() {
    track.innerHTML = works
      .map(
        (work) => `
      <figure class="lightbox-slide">
        <img
          src="${work.image}"
          alt="${work.title}"
          style="object-position: ${work.focus || "center"}"
          draggable="false"
        />
      </figure>`,
      )
      .join("");
  }

  function updateMeta() {
    const work = works[index];
    titleEl.textContent = work.title;
    sizesEl.textContent = sizesLabel(work.sizes);
    inquireEl.href = inquireHref(work);
    track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
  }

  function openLightbox(i) {
    index = i;
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    updateMeta();
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function showNext(step = 1) {
    index = (index + step + works.length) % works.length;
    updateMeta();
  }

  grid.addEventListener("click", (event) => {
    const tile = event.target.closest(".print-tile");
    if (!tile) return;
    openLightbox(Number(tile.dataset.index));
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => showNext(-1));
  nextBtn.addEventListener("click", () => showNext(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showNext(1);
    if (event.key === "ArrowLeft") showNext(-1);
  });

  const stage = lightbox.querySelector(".lightbox-stage");
  stage.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
      touchDeltaX = 0;
    },
    { passive: true },
  );

  stage.addEventListener(
    "touchmove",
    (event) => {
      touchDeltaX = event.changedTouches[0].screenX - touchStartX;
    },
    { passive: true },
  );

  stage.addEventListener(
    "touchend",
    () => {
      if (Math.abs(touchDeltaX) < 50) return;
      showNext(touchDeltaX < 0 ? 1 : -1);
    },
    { passive: true },
  );

  renderGrid();
  renderSlides();
})();
