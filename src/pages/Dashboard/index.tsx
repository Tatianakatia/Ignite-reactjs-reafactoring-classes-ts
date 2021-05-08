import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface FoodChoiceProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  available: boolean;  
};

// interface DashboardProps {
//   food: FoodChoiceProps;
  // handleDelete: (id: number) => {};
  // handleEditFood: (food: FoodChoiceProps ) => void;

// }

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<FoodChoiceProps[]>([]);
  const [editingFood, setEditingFood] = useState<FoodChoiceProps>({} as FoodChoiceProps);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);


  useEffect(() => {
    async function foodsListMenu(): Promise<void> {
      const response = await api.get('/foods');
  
      setFoods(response.data); 
    }
    foodsListMenu();
  }, []);

  async function handleAddFood (
     food: Omit<FoodChoiceProps, 'id' | 'available'>,
     ): Promise<void> {
      try {
        const response = await api.post('/foods', {
          ...food,
          available: true,
        });

        setFoods([...foods, response.data]);
      } catch (err) {
        console.log(err);
      }
    }

  async function handleUpdateFood (
    food: Omit<FoodChoiceProps, 'id' | 'available'>,
    ): Promise<void> {
      try {
        const response = await api.put(`/foods/${editingFood.id}`, {
          ...editingFood,
          ...food,
        });
       
        setFoods(
          foods.map(f => 
            f.id === editingFood.id ? {...response.data }: f,
          ),
        ); 
      } catch (err) {
        console.log(err);
      }
    }

  async function handleDeleteFood(id: number): Promise<void> {
    try {
      await api.delete(`/foods/${id}`);

      setFoods(foods.filter(food => food.id !== id));
    } catch (error){
      console.log(error);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void  {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: FoodChoiceProps): void {
      setEditingFood(food);
      toggleEditModal();
  }

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );

};

export default Dashboard;
