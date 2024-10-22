package com.revisao_carro.controllers;

import com.revisao_carro.dtos.LoginRequestDTO;
import com.revisao_carro.dtos.LoginResponseDTO;
import com.revisao_carro.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // Realiza a autenticação do usuário e retorna um token de login ou erro em caso de falha.
    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO body) {
        try {
            LoginResponseDTO response = authService.login(body);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}