package com.revisao_carro.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record CadastroRequestDTO(
                                 @NotBlank(message = "Nome é obrigatório")  // validação de campo.
                                 String nome,
                                 @NotBlank(message = "Telefone é obrigatório")  // validação de campo.
                                 @Size(min = 11, max = 12, message = "O telefone deve ter entre 11 e 12 caracteres")  // validação de campo.
                                 String telefone,
                                 @NotBlank(message = "Email é obrigatório") // validação de campo.
                                 @Email(message = "Email inválido") // validação de campo.
                                 String email,
                                 @NotEmpty(message = "A senha não pode estar vazia.") // validação de campo
                                 @Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres") // validação de campo.
                                 String senha) {
}

