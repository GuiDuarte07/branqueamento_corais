function validateNewAuthor(name: string, email: string, phone: string) {
  const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  const regPhone = new RegExp(
    '^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$'
  );
  const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const result = { name: false, email: false, phone: false };

  if (regName.test(name)) result.name = true;
  if (regPhone.test(phone)) result.phone = true;
  if (regEmail.test(email)) result.email = true;

  return result;
}

export default validateNewAuthor;
