// Validações login e cadastro
const validaNome = (nome) => {
    if (!nome) return 'O campo nome não pode ser nulo';
    return null;
};

const validaTelefone = (telefone) => {
    if (!telefone) return 'O campo telefone não pode ser nulo';
    if(!/^\d+$/.test(telefone)) return 'Digite apenas numeros e sem espaço'
    if(telefone.length !==11 ) return 'Quantidade incorreta de digitos'
    return null;
};

const validaEmail = (email) => {
    if (!email) return 'O campo email não pode ser nulo';
    if(!/\S+@\S+\.\S+/.test(email)) return "E-mail invalido" // verificando se possui caracteres antes de depois do @ e ponto apos o @
    return null;
};

const validaSenha = (senha) => {
    if (!senha) return 'O campo senha não pode ser nulo';
    if (senha.length < 8) return 'A senha deve ter pelo menos 8 caracteres';
    return null;
};

// Validações agendamentos
const validaData = (data) => {
    if(!data) return "O campo data não pode ser nulo"
}

const validaHora = (hora) => {
    if(!hora) return "O campo hora não pode ser nulo"
}

const validaServico = (servico) => {
    if(!servico) return "O campo servico não pode ser nulo"
    if(servico.length < 10) return "Preencha o campo serviço corretamente"
}

const validaCarro = (carro) => {
    if(!carro) return "O campo modelo carro não pode ser nulo"
    if(carro.length < 3) return "Preencha o campo modelo Carro corretamente"
}

export { 
    validaNome, 
    validaTelefone, 
    validaEmail, 
    validaSenha, 
    validaData, 
    validaHora, 
    validaServico,
    validaCarro 
};