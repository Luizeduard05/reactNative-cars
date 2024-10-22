package com.revisao_carro.dtos;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AgendamentoEditRequestDTO(
        @NotBlank
        @Size(min = 10, message = "o campo serviço deve ter pelo menos 10 caracteres") // validação de campo.
        String servico,
  
        @NotBlank
        @Size(min = 3, message = "o campo modelo deve ter pelo menos 3 caracteres") // validação de campo.
        String modeloCarro){
}


