function syncIframeHeight() {
  this.style.height = this.contentWindow.document.documentElement.offsetHeight + "px";
}

function syncAllIframeHeights() {
  document.querySelectorAll(".height-synced-iframe").forEach(el => syncIframeHeight.bind(el)() );
}

window.onload = function(){
  if (document.getElementsByClassName('gallery').length > 0) {
    new Masonry( '.gallery', {
      columnWidth: '.gallery-sizer',
      itemSelector: '.gallery-item',
      percentPosition: true,
      gutter: 5
    });
  }

  // Wee hack to make sure iFrame content has loaded
  syncAllIframeHeights();
  setTimeout(syncAllIframeHeights, 2000);
}

window.onresize = (event) => {
  syncAllIframeHeights();
};
