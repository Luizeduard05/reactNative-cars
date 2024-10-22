package com.revisao_carro.services;


import com.revisao_carro.dtos.LoginRequestDTO;
import com.revisao_carro.dtos.LoginResponseDTO;
import com.revisao_carro.entities.Usuario;
import com.revisao_carro.infra.security.TokenService;
import com.revisao_carro.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    // Realiza o login do usuário: busca pelo e-mail, verifica a senha e gera um token se a autenticação for bem-sucedida.
    public LoginResponseDTO login(LoginRequestDTO body) {
        Usuario usuario = usuarioRepository.findByEmail(body.email())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (passwordEncoder.matches(body.senha(),usuario.getSenha())) {
            String token = tokenService.generateToken(usuario);
            return new LoginResponseDTO(usuario.getId(), token);
        } else {
            throw new RuntimeException("Senha incorreta");
        }
    }


}