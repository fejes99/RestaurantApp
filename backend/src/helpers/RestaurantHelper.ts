import { AppDataSource } from '../config/data-source';
import { Restaurant } from '../entity';
import { Request } from 'express';

const restaurantRepository = AppDataSource.manager.getRepository(Restaurant);

export const createRestaurantWithParams = (
  name: string,
  phone: string,
  email: string,
  active: boolean,
  street: string,
  streetNumber: string,
  city: string,
  country: string
): Restaurant => {
  const restaurantName: string = name;
  const restaurantPhone: string = phone;
  const restaurantEmail: string = email;
  const restaurantActive: boolean = active;
  const restaurantStreet: string = street;
  const restaurantStreetNumber: string = streetNumber;
  const restaurantCity: string = city;
  const restaurantCountry: string = country;

  const createdRestaurant: Restaurant = restaurantRepository.create({
    name: restaurantName,
    phone: restaurantPhone,
    email: restaurantEmail,
    active: restaurantActive,
    street: restaurantStreet,
    streetNumber: restaurantStreetNumber,
    city: restaurantCity,
    country: restaurantCountry,
  });

  return createdRestaurant;
};

export const mapRestaurant = (
  req: Request,
  restaurant: Restaurant
): Restaurant => {
  restaurant.name = req.body.name || restaurant.name;
  restaurant.phone = req.body.phone || restaurant.phone;
  restaurant.email = req.body.email || restaurant.email;
  restaurant.active = req.body.active || restaurant.active;
  restaurant.street = req.body.street || restaurant.street;
  restaurant.streetNumber = req.body.streetNumber || restaurant.streetNumber;
  restaurant.city = req.body.city || restaurant.city;
  restaurant.country = req.body.country || restaurant.country;

  return restaurant;
};
