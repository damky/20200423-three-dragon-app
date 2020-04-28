import React from "react";

function UnImg(props) {
  return (
    <img src={(props.photoId && props.wXh && `https://source.unsplash.com/${props.photoId}/${props.wXh}`) || (props.photoId && !props.wXh && `https://source.unsplash.com/${props.photoId}`) } alt={props.alt ? props.alt : "a placeholder image sourced from unsplash.com"}/>
  );
}

function UnBkg(props) {
  const bkg = `url(https://source.unsplash.com/${props.photoId}/${props.wXh})`;
  const bkgStyles = props.style;
  console.log(bkgStyles);
  
  const bkgOverlay = props.overlay;
  return (
    <React.Fragment>
      <div className={props.className} style={{...{backgroundImage: bkg, backgroundPosition: 'center', backgroundRepeat:'no-repeat', backgroundSize: 'cover'}, ...bkgStyles}}>
        <div className={`${props.bkgClassName ? props.bkgClassName : ""}Overlay`} style={{...{backgroundColor: 'rgba(0,0,0,.6)', display: 'block', bkgOverlay}, ...bkgOverlay}} >
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
}

export {UnBkg, UnImg};