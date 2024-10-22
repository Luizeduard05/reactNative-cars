package com.revisao_carro.repositories;

import com.revisao_carro.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository <Usuario,Integer> {
    Optional<Usuario> findByEmail(String email);
}
