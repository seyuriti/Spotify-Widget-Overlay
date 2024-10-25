const secretEyes = () => {
  const secretEyes = document.querySelectorAll('.eye-item');

  secretEyes.forEach((secretEye) => {
    secretEye.addEventListener('click', (e) => {
      const presentSecretEyes = e.target.parentElement;
      const eyeOpen = presentSecretEyes.querySelector('.open-eye');
      const eyeClose = presentSecretEyes.querySelector('.close-eye');
      const blurItem = presentSecretEyes.parentElement.querySelector('.blur');

      if (!eyeOpen || !eyeClose || !blurItem) return;

      if (eyeClose.classList.contains('hidden')) {
        eyeClose.classList.remove('hidden');
        eyeOpen.classList.add('hidden');
        blurItem.classList.add('not-blur');
      } else {
        eyeOpen.classList.remove('hidden');
        eyeClose.classList.add('hidden');
        blurItem.classList.remove('not-blur');
      }
    });
  });
};