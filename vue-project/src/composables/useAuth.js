import { ref } from 'vue';

// Aquí gestionaremos si el usuario está autenticado
const isAuthenticated = ref(false);

// Función para verificar si el usuario está autenticado
export const useAuth = () => {
  // Aquí puedes integrar tu lógica de autenticación, como verificar un token en localStorage
  const checkAuth = () => {
    // Ejemplo: Verificamos si hay un token en localStorage
    return !!localStorage.getItem('auth-token');
  };

  // Establecer el estado de autenticación
  isAuthenticated.value = checkAuth();

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('auth-token');
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated: checkAuth,  // Para comprobar si el usuario está autenticado
    logout,                       // Para cerrar sesión
  };
};
