import { Request, Response } from 'express';
import { Restaurant } from '../entity';
import {
  createRestaurantWithParams,
  mapRestaurant,
} from '../helpers/RestaurantHelper';

import {
  addRestaurant,
  getRestaurantById,
  getRestaurants,
  modifyRestaurant,
  removeRestaurant,
} from '../services';

const getAllRestaurants = async (
  req: Request,
  res: Response
): Promise<void> => {
  const users: Restaurant[] = await getRestaurants();

  if (!users) {
    res.status(404);
  }
  res.status(200).json(users);
};
const getRestaurant = async (req: Request, res: Response): Promise<void> => {
  const restaurantId = req.params.id;
  const restaurant: Restaurant = await getRestaurantById(restaurantId);

  if (!restaurant) {
    res.status(404);
    throw new Error('Restaurant not found');
  }

  res.status(200).json(restaurant);
};

const createRestaurant = async (req: Request, res: Response): Promise<void> => {
  const name: string = req.body.name;
  const phone: string = req.body.phone;
  const email: string = req.body.email;
  const active: boolean = req.body.active;
  const street: string = req.body.street;
  const streetNumber: string = req.body.streetNumber;
  const city: string = req.body.city;
  const country: string = req.body.country;

  const restaurantToCreate: Restaurant = createRestaurantWithParams(
    name,
    phone,
    email,
    active,
    street,
    streetNumber,
    city,
    country
  );

  const createdRestaurant: Restaurant = await addRestaurant(restaurantToCreate);

  if (!createdRestaurant) {
    res.status(500);
  }

  res.status(201).json(createdRestaurant);
};
const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
  const restaurantId = req.params.id;
  let restaurantToUpdate: Restaurant = await getRestaurantById(restaurantId);

  if (!restaurantToUpdate) {
    res.status(404);
    throw new Error('Restaurant not found');
  }

  restaurantToUpdate = mapRestaurant(req, restaurantToUpdate);

  const updatedRestaurant: Restaurant = await modifyRestaurant(
    restaurantToUpdate
  );
  if (!updatedRestaurant) {
    res.status(404);
    throw new Error('Restaurant not updated');
  }

  res.status(204).json(updatedRestaurant);
};
const deleteRestaurant = async (req: Request, res: Response): Promise<void> => {
  const restaurantId = req.params.id;
  const restaurantToDelete = await getRestaurantById(restaurantId);

  const deletedRestaurant = await removeRestaurant(restaurantToDelete);

  if (!deletedRestaurant) {
    res.status(404);
  }

  res.json(deletedRestaurant);
  res.status(204);
};

export {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
