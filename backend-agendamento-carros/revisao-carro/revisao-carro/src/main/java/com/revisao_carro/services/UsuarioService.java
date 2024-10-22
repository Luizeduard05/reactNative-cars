package com.revisao_carro.services;

import com.revisao_carro.dtos.CadastroRequestDTO;
import com.revisao_carro.entities.Usuario;
import com.revisao_carro.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UsuarioService {

    @Autowired
    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    // Cadastra um novo usuário se não existir um usuário com o mesmo e-mail.
    public Usuario cadastrarUsuario(CadastroRequestDTO body) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(body.email());

        if (usuarioExistente.isEmpty()) {
            Usuario novoUsuario = new Usuario();
            novoUsuario.setNome(body.nome());
            novoUsuario.setTelefone(body.telefone());
            novoUsuario.setEmail(body.email());
            novoUsuario.setSenha(passwordEncoder.encode(body.senha()));

            return usuarioRepository.save(novoUsuario);
        } else {
            throw new RuntimeException("Usuário já existe");
        }
    }
}
