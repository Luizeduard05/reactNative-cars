import { Center, Button, AlertDialog } from "native-base";
import React from "react";



const ModalExclusao = React.forwardRef(({ isOpen, onClose, removerAgendamento, id }, ref) => {
  const cancelRef = React.useRef(null);

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Excluir Agendamento</AlertDialog.Header>
          <AlertDialog.Body>
            Isso removerá todos os dados relacionados a esse agendamento. Essa
            ação não poderá ser revertida. Agendamentos excluídos não poderão
            ser recuperados.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >Cancelar</Button>
              <Button colorScheme="danger" onPress={() => removerAgendamento(id)}>Excluir</Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
});

export default ModalExclusao;
