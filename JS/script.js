$(document).ready(function () {
  $(".wish-icon i").click(function () {
    $(this).toggleClass("fa-heart fa-heart-o");
  });
});

function getItemsPerSlide() {
  const width = window.innerWidth;
  if (width >= 1200) {
    return 4; //todo--------------- 4 items 
  } else if (width >= 992) {
    return 3; //todo--------------- 3 items
  } else if (width >= 768) {
    return 2; //todo--------------- 2 items
  } else {
    return 1; //todo--------------- 1 item
  }
}

function createCarousel(products) {
  const itemsPerSlide = getItemsPerSlide();
  const totalItems = products.length;
  const totalSlides = Math.ceil(totalItems / itemsPerSlide);

  const carouselIndicators = document.getElementById("carousel-indicators");
  const carouselInner = document.getElementById("carousel-inner");

  carouselIndicators.innerHTML = "";
  carouselInner.innerHTML = "";

  for (let i = 0; i < totalSlides; i++) {
    //?-------------------------------------------------- Create a new indicator
    const indicator = document.createElement("li");
    indicator.dataset.target = "#myCarousel";
    indicator.dataset.slideTo = i;
    if (i === 0) indicator.classList.add("active");
    carouselIndicators.appendChild(indicator);

    //?------------------------------------------------ Create a new carousel item
    const carouselItem = document.createElement("div");
    carouselItem.className = "item carousel-item";
    if (i === 0) carouselItem.classList.add("active");

    const row = document.createElement("div");
    row.className = "row";

    for (
      let j = i * itemsPerSlide;
      j < (i + 1) * itemsPerSlide && j < totalItems;
      j++
    ) {
      const product = products[j];

      //?------------------------------------------------------ Create a new card element
      const col = document.createElement("div");
      col.className = "col-md-" + 12 / itemsPerSlide + " col-sm-6 col-xs-12";

      col.innerHTML = `
  <div class="thumb-wrapper">
    <span class="wish-icon"><i class="fa fa-heart-o"></i></span>
    <div class="img-box">
      <img src="${product.image}" class="img-fluid" alt="${product.title}">
    </div>
    <div class="thumb-content">
      <h4>${product.title}</h4>
      <div class="star-rating">
        <ul class="list-inline">
          ${generateStars(product.rating.rate)}
        </ul>
      </div>
      <p class="item-price"><strike>$${(product.price * 1.1).toFixed(
        2
      )}</strike> <b>$${product.price.toFixed(2)}</b></p>
      <a href="#" class="btn btn-primary show-count-btn">Show count</a>
      <p class="product-quantity" style="display: none;">count: ${
        product.rating.count
      }</p>
    </div>
  </div>
`;

      document.body.appendChild(col);

      const showCountButton = col.querySelector(".show-count-btn");
      const quantityElement = col.querySelector(".product-quantity");

      showCountButton.addEventListener("click", function (event) {
        event.preventDefault();
        quantityElement.style.display = "block";
      });

      row.appendChild(col);
    }

    carouselItem.appendChild(row);
    carouselInner.appendChild(carouselItem);
  }
}


fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    createCarousel(products);
    //?------------------------------------------ Recreate carousel when the window is resized
    window.addEventListener("resize", () => {
      createCarousel(products);
    });
  })

//?------------------------------------------------------------ Function to generate star ratings
function generateStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars += '<li class="list-inline-item"><i class="fa fa-star"></i></li>';
    } else if (i < rating) {
      stars +=
        '<li class="list-inline-item"><i class="fa fa-star-half-o"></i></li>';
    } else {
      stars += '<li class="list-inline-item"><i class="fa fa-star-o"></i></li>';
    }
  }
  return stars;
}
