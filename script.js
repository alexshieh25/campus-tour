const html = document.documentElement;
const canvas = document.getElementById("images");
const context = canvas.getContext("2d");

const numOfFrames = 2341;
const frame = index => (
  `static/img${index.toString().padStart(5, '0')}.png`
)

const preloadImages = () => {
  for (let i = 1; i < numOfFrames; i++) {
    const img = new Image();
    img.src = frame(i);
  }
};

const img = new Image()
img.src = frame(1);
canvas.width=1158;
canvas.height=770;
img.onload=function(){
  context.drawImage(img, 0, 0, 1280, 720);
}

const updateImage = index => {
  img.src = frame(index);
  context.drawImage(img, 0, 0, 1280, 720);
}

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    numOfFrames - 1,
    Math.ceil(scrollFraction * numOfFrames)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1))

});

preloadImages();
