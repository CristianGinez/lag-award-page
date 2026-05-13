import { atom } from 'nanostores';

// Un átomo que guardará el usuario (o null si no hay sesión)
export const $currentUser = atom<any>(null);

// Función auxiliar para saber si está logueado
export const isLoggedIn = () => !!$currentUser.get();