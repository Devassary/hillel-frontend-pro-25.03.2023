(function setRandomImgSrc() {
    const imgFolderSrc = "../Assets/Images/";
    const maxName = 6;
    const imgId = 'img-random';

    const image = document.getElementById(imgId);
    const randomNum = Math.floor(Math.random() * (maxName - 1)) + 1;

    image.src = (imgFolderSrc + randomNum + '.jpg');
})();