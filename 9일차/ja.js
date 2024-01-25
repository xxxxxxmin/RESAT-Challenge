document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');
    const sideMenu = document.querySelector('.side-menu'); 
    
    hamburgerMenu.addEventListener('click', function () {
      navbar.classList.toggle('active');
      sideMenu.style.display = navbar.classList.contains('active') ? 'block' : 'none'; // 햄버거 메뉴 클릭 시 사이드 메뉴 보이거나 숨기기
    });
  
    document.addEventListener('click', function (event) {
      
      if (!navbar.contains(event.target)) {
        navbar.classList.remove('active');
        sideMenu.style.display = 'none'; 
      }
    });
});
