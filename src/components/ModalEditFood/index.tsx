import React, { useRef, useCallback } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface FoodChoiceProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  available: boolean;
};

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: Omit<FoodChoiceProps, 'id' | 'available'>) => void;
  editingFood: FoodChoiceProps;
}

interface EditFoodDataProps {
  name: string;
  image: string;
  price: string;
  description: string;

}

const ModalEditFood: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood,
}) => {

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: EditFoodDataProps) => {
      handleUpdateFood(data);
      setIsOpen();
  }, [handleUpdateFood,setIsOpen],
  );

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
};

export default ModalEditFood;