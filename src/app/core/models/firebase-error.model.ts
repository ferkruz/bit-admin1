export class FirebaseError {
  constructor() {}

  translate(err): string {
      let message = '';
      try {
          if (err != null && err.code != null) {
              if (typeof err.code == 'string') {
                  if (err.code.indexOf('auth/user-not-found') >= 0) {
                      err.message = 'El correo ingresado no existe';
                  }
                  if (err.code.indexOf('auth/email-already-in-use') >= 0) {
                      err.message = 'El correo ingresado ya se encuentra siendo utilizado';
                  }
                  if (err.code.indexOf('auth/invalid-email') >= 0) {
                      err.message = 'El correo ingresado NO es válido';
                  }
                  if (err.code.indexOf('auth/weak-password') >= 0) {
                      err.message = 'La contraseña debe tener al menos 6 caracteres';
                  }
                  if (err.code.indexOf('auth/wrong-password') >= 0) {
                      err.message = 'La contraseña ingresada es inválida';
                  }
                  if (err.code.indexOf('auth/too-many-requests') >= 0) {
                      err.message = 'Demasiados intentos inválidos. Por favor espere un momento e intente nuevamente';
                  }
                  if (err.code.indexOf('auth/network-request-failed') >= 0) {
                      err.message = 'Error de conectividad, verifique su conexión a internet. Por favor espere un momento e intente nuevamente';
                  }

                  message = err.message;
              }
          }
      } catch (ex) {}
      return message;
  }
}
