import { AppDataSource } from '../config/data-source';
import { Restaurant } from '../entity/Restaurant';

const restaurantRepository = AppDataSource.manager.getRepository(Restaurant);

const getRestaurants = async (): Promise<Restaurant[]> => {
  const restaurants: Restaurant[] = await restaurantRepository.find();
  return restaurants;
};
const getRestaurantById = async (restaurantId): Promise<Restaurant> => {
  const restaurant: Restaurant = await restaurantRepository.findOneBy({
    id: restaurantId,
  });
  return restaurant;
};
const getRestaurantByName = async (restaurantName): Promise<Restaurant> => {
  const restaurant: Restaurant = await restaurantRepository.findOneBy({
    name: restaurantName,
  });
  return restaurant;
};
const addRestaurant = async (restaurant: Restaurant): Promise<Restaurant> => {
  const addedRestaurant: Restaurant = await restaurantRepository.save(
    restaurant
  );
  return addedRestaurant;
};
const modifyRestaurant = async (
  restaurant: Restaurant
): Promise<Restaurant> => {
  const modifiedRestaurant = await restaurantRepository.save(restaurant);
  return modifiedRestaurant;
};
const removeRestaurant = async (
  restaurant: Restaurant
): Promise<Restaurant> => {
  const removedRestaurant = await restaurantRepository.remove(restaurant);
  return removedRestaurant;
};

export {
  getRestaurants,
  getRestaurantById,
  getRestaurantByName,
  addRestaurant,
  modifyRestaurant,
  removeRestaurant,
};
