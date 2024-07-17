import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

// Step 1: Create and render markup from galleryItems data array
const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
    })
    .join("");
}

// Step 2: Implement delegation to ul.gallery for click event
galleryContainer.addEventListener("click", onGalleryContainerClick);

function onGalleryContainerClick(event) {
  event.preventDefault();

  const isGalleryImage = event.target.classList.contains("gallery__image");
  if (!isGalleryImage) {
    return;
  }

  const largeImageURL = event.target.dataset.source;

  // Step 4: Open modal window by clicking on a gallery item
  openModal(largeImageURL);
}

// Step 4: Open modal window and Step 5: Replace the value of the src attribute
function openModal(imageSrc) {
  const instance = basicLightbox.create(
    `
    <img src="${imageSrc}" class="modal-image">
  `,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscKeyPress);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );

  instance.show();

  function onEscKeyPress(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}

// Adding some CSS to ensure the image fits the screen size
const style = document.createElement("style");
style.innerHTML = `
  .modal-image {
    display: block;
    max-width: 100vw;
    max-height: 100vh;
    width: auto;
    height: auto;
    margin: auto;
  }
`;
document.head.appendChild(style);
