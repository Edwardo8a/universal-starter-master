export function firebaseError(error: any): string {
    switch (error && error.code) {
        case 'permission-denied':
            return 'Firestore rechazó el acceso. Revisa las reglas del proyecto y vuelve a iniciar sesión.';
        case 'auth/unauthorized-domain':
            return 'Este dominio no está autorizado. Agrégalo en Firebase Authentication > Configuración > Dominios autorizados.';
        case 'auth/operation-not-allowed':
            return 'Activa el proveedor Google en Firebase Authentication.';
        case 'auth/popup-blocked':
            return 'El navegador bloqueó la ventana. Permite ventanas emergentes e intenta de nuevo.';
        case 'auth/popup-closed-by-user':
            return 'Se cerró la ventana antes de completar el inicio de sesión.';
        case 'auth/network-request-failed':
        case 'unavailable':
            return 'No se pudo conectar con Firebase. Revisa tu conexión e intenta de nuevo.';
        default:
            return error && error.message ? error.message : 'Ocurrió un error. Intenta de nuevo.';
    }
}
