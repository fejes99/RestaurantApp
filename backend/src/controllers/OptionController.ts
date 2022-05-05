import { Request, Response } from 'express';
import { Option } from '../entity';
import {
  addOption,
  getOptionById,
  getOptions,
  modifyOption,
  removeOption,
} from '../services';
import { createOptionWithParams, mapOption } from '../helpers/OptionHelper';

const getAllOptions = async (req: Request, res: Response): Promise<void> => {
  const options: Option[] = await getOptions();

  if (!options) {
    res.status(404);
  }
  res.status(200).json(options);
};
const getOption = async (req: Request, res: Response): Promise<void> => {
  const optionId = req.params.id;
  const option = await getOptionById(optionId);

  if (!option) {
    res.status(404);
    throw new Error('Option not found');
  }

  res.status(200).json(option);
};

const createOption = async (req: Request, res: Response): Promise<void> => {
  const optionName = req.body.name;
  const optionDescription = req.body.description;

  const optionToCreate: Option = createOptionWithParams(
    optionName,
    optionDescription
  );

  const createdOption: Option = await addOption(optionToCreate);

  if (!createdOption) {
    res.status(500);
  }

  res.status(201).json(createdOption);
};

const updateOption = async (req: Request, res: Response): Promise<void> => {
  const optionId = req.params.id;
  let optionToUpdate = await getOptionById(optionId);

  if (!optionToUpdate) {
    res.status(404);
    throw new Error('Option not found');
  }

  optionToUpdate = mapOption(req, optionToUpdate);

  const updatedOption: Option = await modifyOption(optionToUpdate);

  if (!updatedOption) {
    res.status(404);
    throw new Error('Option not updated');
  }

  res.status(204).json(updatedOption);
};

const deleteOption = async (req: Request, res: Response): Promise<void> => {
  const optionId: String = req.params.id;
  const optionToDelete = await getOptionById(optionId);

  const deletedOption = await removeOption(optionToDelete);

  if (!deletedOption) {
    res.status(404);
  }

  res.json(deletedOption);
  res.status(204);
};

export { getAllOptions, getOption, createOption, updateOption, deleteOption };
