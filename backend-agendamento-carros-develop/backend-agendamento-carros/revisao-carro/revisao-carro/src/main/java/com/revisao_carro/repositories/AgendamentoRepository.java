package com.revisao_carro.repositories;

import com.revisao_carro.entities.Agendamento;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {
    List<Agendamento> findByUsuarioId(Integer usuarioId, Sort sort);
    Optional<Agendamento> findById(Integer id);
    public List<Agendamento> findByRealizadoFalse();

}
