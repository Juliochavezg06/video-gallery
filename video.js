function YouTubeGetID(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
  return ID;
}
$('.slider-for').children('div').each(function () {
  var YoutubeID = YouTubeGetID($(this).data('video-url'));
  console.log(YoutubeID);
  this.dataset.videoId = YoutubeID;
});
$('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav',
});
$('.slider-nav').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots: false,
  centerMode: true,
  focusOnSelect: true,
  nextArrow: '<a class="slick-custom-next"> <i class="fas fa-angle-right"></i> </a>',
  prevArrow: '<a class="slick-custom-prev"> <i class="fas fa-angle-left"></i> </a>',
});
var players = document.querySelectorAll('.youtube-player')
var loadPlayer = function (event) {
  var target = event.currentTarget
  var iframe = document.createElement('iframe')
  iframe.height = target.clientHeight
  iframe.width = target.clientWidth
  iframe.src = 'https://www.youtube.com/embed/' + target.dataset.videoId + '?autoplay=1'
  iframe.setAttribute('frameborder', 0)
  target.classList.remove('pristine')
  if (target.children.length) {
    target.replaceChild(iframe, target.firstElementChild)
  } else {
    target.appendChild(iframe)
  }
}
var config = { once: true }
Array.from(players).forEach(function (player) {
  player.addEventListener('click', loadPlayer, config)
})
