const ID = 'testID';
const PW = 'testPW';

function login() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (usernameInput !== ID && passwordInput !== PW) {
        alert('ID와 PW가 잘못되었습니다.');
        errorMessage.textContent = 'ID와 PW가 잘못되었습니다.';
    } else if (usernameInput !== ID) {
        alert('ID가 잘못되었습니다.');
        errorMessage.textContent = 'ID가 잘못되었습니다.';
    } else if (passwordInput !== PW) {
        alert('비밀번호가 잘못되었습니다.');
        errorMessage.textContent = '비밀번호가 잘못되었습니다.';
    } else {
        alert('로그인이 되었습니다');
        errorMessage.textContent = '';
    }
}