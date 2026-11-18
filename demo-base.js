/* Demo RSVP: nunca se envían respuestas a números ficticios. */
(() => {"use strict";
 function showNotice(){
   let node=document.getElementById("demo-rsvp-notice");
   if(!node){node=document.createElement("aside");node.id="demo-rsvp-notice";node.className="demo-rsvp-notice";node.setAttribute("role","note");node.setAttribute("tabindex","-1");
     const heading=document.createElement("strong");heading.textContent="Esta función es una demostración";
     const p=document.createElement("p");p.textContent="La confirmación y las sugerencias se conectan al anfitrión cuando personalizamos tu invitación. No enviamos datos desde esta demo.";
     const a=document.createElement("a");a.href="/";a.textContent="Conocer ArteEnLink ↗";node.append(heading,p,a);document.body.append(node)}
   node.scrollIntoView({behavior:"auto",block:"center"});node.focus({preventScroll:true});return false;
 }window.ArteEnLinkDemo=Object.freeze({showNotice});
})();
