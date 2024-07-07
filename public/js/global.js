window.onload = function(){
  if (document.getElementsByClassName('gallery').length > 0) {
    let masonry = new Masonry( '.gallery', {
      columnWidth: '.gallery-sizer',
      itemSelector: '.gallery-item',
      percentPosition: true,
      gutter: 5
    });
  }
}
