// Create a helper to validate email syntax
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}   

export const formatDate = (date) => {
  return `${date[5]}${date[6]}/${date[8]}${date[9]}/${date[0]}${date[1]}${date[2]}${date[3]}`
}