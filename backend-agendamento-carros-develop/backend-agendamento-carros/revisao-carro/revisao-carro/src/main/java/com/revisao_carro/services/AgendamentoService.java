package com.revisao_carro.services;

import com.revisao_carro.dtos.AgendamentoEditRequestDTO;
import com.revisao_carro.dtos.AgendamentoRequestDTO;
import com.revisao_carro.entities.Agendamento;
import com.revisao_carro.entities.Usuario;
import com.revisao_carro.repositories.AgendamentoRepository;
import com.revisao_carro.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;


@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    // Cadastra um novo agendamento para o usuário, associando dados do DTO e definindo como não realizado.
    @Transactional
    public Agendamento cadastrarAgendamento(String email, AgendamentoRequestDTO dto) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Agendamento agendamento = new Agendamento();
        agendamento.setData(dto.data());
        agendamento.setHoraFromLocalTime(dto.hora());
        agendamento.setServico(dto.servico());
        agendamento.setModeloCarro(dto.modeloCarro());
        agendamento.setUsuario(usuario);
        agendamento.setRealizado(false);
        return agendamentoRepository.save(agendamento);
    }

    // Retorna uma lista de agendamentos do usuário, ordenados por data em ordem decrescente.
    @Transactional
    public List<Agendamento> listarAgendamentosPorEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Sort sort = Sort.by("data").descending();
        return agendamentoRepository.findByUsuarioId(usuario.getId(), sort);
    }

    // Edita um agendamento existente, atualizando apenas campos permitidos, se não tiver sido realizado.
    @Transactional
    public Agendamento editarAgendamento(Integer id, AgendamentoEditRequestDTO dto) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        if (dto.servico() != null) {
            agendamento.setServico(dto.servico());
        }
        if (dto.modeloCarro() != null) {
            agendamento.setModeloCarro(dto.modeloCarro());
        }

        if (agendamento.getRealizado()) {
            throw new RuntimeException("Não é possível editar este agendamento, pois já foi realizado");
        }

        return agendamentoRepository.save(agendamento);
    }

    // Deleta um agendamento se ele não tiver sido realizado.
    public void deletarAgendamento(Integer id) {
        Optional<Agendamento> agendamentoOpt = agendamentoRepository.findById(id);
        if (agendamentoOpt.isPresent()) {
            Agendamento agendamento = agendamentoOpt.get();
            List<Agendamento> agendamentosNaoRealizados = agendamentoRepository.findByRealizadoFalse();
            boolean agendamentoEditavel = agendamentosNaoRealizados.stream().anyMatch(a -> a.getId().equals(agendamento.getId()));
            if (agendamentoEditavel) {
                agendamentoRepository.delete(agendamento);
            } else {
                throw new RuntimeException("Não é possível excluir este agendamento");
            }
        } else {
            throw new RuntimeException("Agendamento não encontrado");
        }}


    // Marca um agendamento como realizado, se ainda não estiver concluído.
    public Agendamento marcarComoRealizado(Integer id) {
        Optional<Agendamento> agendamentoOptional = agendamentoRepository.findById(id);
        if (agendamentoOptional.isPresent()) {
            Agendamento agendamento = agendamentoOptional.get();
            if (agendamento.getRealizado()) {
                throw new RuntimeException("Agendamento já foi concluído.");
            }
            agendamento.setRealizado(true);
            return agendamentoRepository.save(agendamento);
        }
        throw new RuntimeException("Agendamento não encontrado.");
    }


}


