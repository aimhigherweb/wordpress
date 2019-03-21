var mobileMenu = function() {
    if(document.getElementsByClassName('nav-main active').length < 1) {
        document.getElementById('nav-main').classList.add('active');
    }
    else {
        document.getElementById('nav-main').classList.remove('active');
    };
};

window.onscroll = function() {
        if(document.body.scrollTop > 20) {
            document.getElementById('root').classList.add('scrolled');
        }
        else {
            document.getElementById('root').classList.remove('scrolled');
        };
    };