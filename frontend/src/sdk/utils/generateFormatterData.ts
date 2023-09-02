function cpfToFormat(cpf: string) {
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

function phoneToFormat(phone: string) {
  return phone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}

function cpfValidate(cpf: string) {
  var Soma;
  var Resto;
  Soma = 0;
  if (cpf == '00000000000') return false;

  let num1: number;
  for (num1 = 1; num1 <= 9; num1++)
    Soma = Soma + parseInt(cpf.substring(num1 - 1, num1)) * (11 - num1);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpf.substring(9, 10))) return false;

  Soma = 0;

  let num2: number;

  for (num2 = 1; num2 <= 10; num2++)
    Soma = Soma + parseInt(cpf.substring(num2 - 1, num2)) * (12 - num2);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpf.substring(10, 11))) return false;
  return true;
}

export { cpfToFormat, phoneToFormat, cpfValidate };
