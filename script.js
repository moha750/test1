var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    autoplay:true,
  },
});


/* Slider */
$(document).ready(function(){
  $('.customer-logos').slick({
      slidesToShow: 2,
      autoplay: true,
      autoplaySpeed: 2600,
      arrows: false,
      dots: false,
      pauseOnHover: true,
  });
});

function alert(){
  Swal.fire({
    title: 'شغالين على الخدمة',
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  })
};