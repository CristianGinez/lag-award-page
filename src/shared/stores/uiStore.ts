import { atom } from 'nanostores';

// Almacena la categoría seleccionada actualmente
export const $selectedCategory = atom<any>(null);

// Almacena el nominado seleccionado (para abrir el detalle)
export const $selectedNominee = atom<any>(null);

// Acciones simples
export const selectCategory = (category: any) => {
  $selectedCategory.set(category);
};

export const selectNominee = (nominee: any) => {
  $selectedNominee.set(nominee);
};

export const clearNomineeSelection = () => {
  $selectedNominee.set(null);
}