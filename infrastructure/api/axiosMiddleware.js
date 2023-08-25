import apiClient from 'infrastructure/api/apiClient';

// Add your middleware logic here
apiClient.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response || {};
    console.log(error);
    // Check for the specific error and status code
    if (status === 401) {
      // Create and show the modal here
      const modal = document.createElement('div');
      modal.innerHTML = `
        <div class="modal">
          <p>You need to log in to proceed.</p>
          <button id="loginButton">Login</button>
        </div>
      `;
      document.body.appendChild(modal);

      const loginButton = document.getElementById('loginButton');
      loginButton.addEventListener('click', () => {
        // Handle login logic here
        // For example, redirect to a login page
        // window.location.href = '/login';
        // Once the user logs in, you can remove the modal
        modal.remove();
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
