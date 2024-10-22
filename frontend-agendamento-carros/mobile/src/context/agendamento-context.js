import { createContext, useReducer } from "react";

export const AgendamentoContext = createContext({
  agendamentos: [],
  addAgendamento: ({ novoCadastro }) => {},
  setAgendamentos: (agendamentos) => {},
  deleteAgendamento: (id) => {},
  updateAgendamento: (id, { editarCadastro }) => {},
});

function agendamentosReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload;
    case "DELETE":
      return state.filter((agendamento) => agendamento.id !== action.payload);
    case "UPDATE":
      const agendamentoIndex = state.findIndex(
        (agendamento) => agendamento.id === action.payload.id
      );
      const agendamentoEditavel = state[agendamentoIndex];
      const agedamentoEmEdicao = {
        ...agendamentoEditavel,
        ...action.payload.data,
      };
      const agendamentoEditado = [...state];
      agendamentoEditado[agendamentoIndex] = agedamentoEmEdicao;
      return agendamentoEditado;

    default:
      return state;
  }
}
function AgendamentoContextProvider({ children }) {
  const [agendamentosState, dispatch] = useReducer(agendamentosReducer, []);
  function addAgendamento(agendamentoData) {
    dispatch({ type: "ADD", payload: agendamentoData });
  }
  function setAgendamentos(agendamentos) {
    dispatch({ type: "SET", payload: agendamentos });
  }
  function deleteAgendamento(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateAgendamento(id, agendamentoData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: agendamentoData } });
  }
  const value = {
    agendamentos: agendamentosState,
    addAgendamento: addAgendamento,
    setAgendamentos: setAgendamentos,
    deleteAgendamento: deleteAgendamento,
    updateAgendamento: updateAgendamento,
  };
  return (
    <AgendamentoContext.Provider value={value}>
      {children}
    </AgendamentoContext.Provider>
  );
}
export default AgendamentoContextProvider;
