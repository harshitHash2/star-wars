let mockRefreshToken = "refresh_token_123";

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Fake credentials check
      if (username === "admin" && password === "123") {

        const fakeAccessToken = "access_token_" + Date.now();
        mockRefreshToken = "refresh_token_" + Date.now();

        resolve({
          accessToken: fakeAccessToken,
          refreshToken: mockRefreshToken,
          expiresIn: 5000, // access token expires in 5 seconds
        });
      } else {
        reject("Invalid credentials");
      }
    }, 800); // simulate network delay
  });
}

// Mock refresh token request
export function refreshAccessToken(refreshToken) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (refreshToken !== mockRefreshToken) {
        return reject("Invalid refresh token");
      }

      resolve({
        accessToken: "access_token_" + Date.now(),
        expiresIn: 5000,
      });
    }, 800);
  });
}