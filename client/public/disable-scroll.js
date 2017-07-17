(function () {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }

    function wheel(event) {
        event.preventDefault();
        event.returnValue = false;
    }
    window.onmousewheel = document.onmousewheel = wheel;
});