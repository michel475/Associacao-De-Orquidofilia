export function parseAuthError(error: any): string {
  if (error?.error?.error === 'AUTH_USER_INACTIVE') {
    return 'Sua conta está aguardando liberação do administrador.';
  }
  if (error?.error?.error === 'AUTH_INVALID_CREDENTIALS') {
    return 'E-mail ou senha incorretos.';
  }
  if (error?.error?.error === 'AUTH_EMAIL_EXISTS') {
    return 'Este e-mail já está em uso.';
  }
  if (error?.error?.error === 'AUTH_INVALID_TOKEN') {  
    return 'O token de recuperação é inválido ou expirou.';
  }
  if (error?.error?.message) {
    if (Array.isArray(error.error.message)) {
      return error.error.message.join(', ');
    }
    return error.error.message;
  }
  return 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
}

export function parseOrquidarioError(error: any): string {
  if (error?.error?.error === 'ORQUIDARIO_NOT_FOUND') {
    return 'Orquidário não encontrado.';
  }
  if (error?.error?.error === 'ENDERECO_ORQUIDARIO_NAO_PREENCHIDO') {
    return 'Endereço do orquidário não foi informado.';
  }
  if (error?.error?.error === 'INVALID_DATA_CRIACAO') {
    return 'Data de criação inválida.';
  }
  if (error?.error?.error === 'INVALID_AREA_ORQUIDARIO') {
    return 'Área informada é inválida para o orquidário.';
  }
  if (error?.error?.message) {
    if (Array.isArray(error.error.message)) {
      return error.error.message.join(', ');
    }
    return error.error.message;
  }
  return 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
}

export function parseReproducaoError(error: any): string {

  if(error?.error?.error === 'HIBRIDO_NOME_ALREADY_EXISTS') {
    return 'Nome do híbrido já existe no orquidário';
  }

  if (error?.error?.error === 'ORQUIDARIO_NOT_FOUND') {
    return 'Orquidário não encontrado.';
  }

  if(error?.error?.error === 'INVALID_TAXA_SUCESSO_PCT') {
    return 'Taxa de sucesso é inválida';
  }

  if(error?.error.error === 'INVALID_DATA_GERMINACAO_REPRODUCAO') {
    return 'Data de germinação não pode ser inferior a data de criação do orquidário';
  }

  if(error?.error.error === 'REPRODUCAO_NOT_FOUND') {
    return 'Reprodução não encontrada';
  }

  return 'Ocorreu um erro insperado';
}