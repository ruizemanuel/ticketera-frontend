const regexTitle = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s?]+$/;
const regexDescription = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\d.,\s]+$/;
const regexUrl = /^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/;
const regexDifficulty = /^[A-Za-z\-\s?]+$/;


export const validateTitle = (field) => {
  if (regexTitle.test(field) && field.trim() !== "") {
    return 'ok';
  } else {
    return 'El título del ticket solo puede contener letras';
  }
};

export const validateDescription = (field) => {
  if (regexDescription.test(field) && field.trim() !== "") {
    return 'ok';
  } else {
    return 'El campo descripcion solo puede contener letras, números, puntos y comas';
  }
};

export const validateUrl = (field) => {
  if (regexUrl.test(field) && field.trim() !== "") {
    return 'ok';
  } else {
    return 'Ingresa una URL válida';
  }
};

export const validateDifficulty = (field) => {
  if (
    regexDifficulty.test(field) &&
    field?.trim() !== "" &&
    (field === "facil" ||
      field === "media" ||
      field === "dificil" )
  ) {
    return 'ok';
  } else {
    return 'Debes seleccionar un nivel de dificultad';
  }
};

export const validateDone = (field) => {
    if (typeof field === 'boolean') {
      return 'ok';
    } else {
      return 'El campo estado debe ser un valor booleano (true o false)';
    }
};
