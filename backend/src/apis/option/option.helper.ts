import { Request } from 'express';
import { AppDataSource } from '../../config/data-source';
import { Option } from './option.model';

const optionRepository = AppDataSource.getRepository(Option);

export const createOptionWithParams = (name, description): Option => {
  const createdOption: Option = optionRepository.create({
    name: name,
    description: description,
  });

  return createdOption;
};

export const mapOption = (req: Request, option: Option): Option => {
  option.name = req.body.name || option.name;
  option.description = req.body.description || option.description;
  return option;
};
