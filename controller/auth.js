const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');


const register = (email, password) => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return resolve(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return reject(errorCode);
            });
    });
}
const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return resolve(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return reject(errorCode);
            });
    });
}
module.exports = { register, signIn }

