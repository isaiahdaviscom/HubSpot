((e)=>{
  e.onload = ()=>{
    let winHeight = window.innerHeight;
    let header = document.querySelector('.header-wrapper');
    let headerHeight = header.clientHeight;
    let secondary_nav = document.querySelector('.secondary-nav');
    let the_fold_height = winHeight - headerHeight;
    if ( secondary_nav ){
     the_fold_height = the_fold_height - secondary_nav.clientHeight;
    }

    let media_player = document.querySelector('.media-player');
    let video = document.querySelector('.plyr--setup');

    media_player.style.maxHeight = the_fold_height + "px";
    video.style.maxHeight = the_fold_height + "px";
  }
})(window);

// inital load
// resizing