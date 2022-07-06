import { Request, Response } from 'express';
import { createOptionWithParams, mapOption } from './option.helper';
import { Option } from './option.model';
import {
  addOption,
  getOptionById,
  getOptions,
  modifyOption,
  removeOption,
} from './option.service';

const getAllOptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const options: Option[] = await getOptions();
    res.status(200).json(options);
  } catch (error) {
    res.status(500).json('Server error');
  }
};
const getOption = async (req: Request, res: Response): Promise<void> => {
  try {
    const optionId = req.params.id;
    const option: Option = await getOptionById(optionId);

    res.status(200).json(option);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const createOption = async (req: Request, res: Response): Promise<void> => {
  try {
    const optionName = req.body.name;
    const optionDescription = req.body.description;

    const createdOption: Option = await addOption(
      optionName,
      optionDescription
    );

    res.status(201).json(createdOption);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateOption = async (req: Request, res: Response): Promise<void> => {
  try {
    const optionId = req.params.id;
    const updatedOption: Option = await modifyOption(optionId, req);

    res.status(204).json(updatedOption);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteOption = async (req: Request, res: Response): Promise<void> => {
  try {
    const optionId = req.params.id;
    const deletedOption = await removeOption(optionId);

    res.status(204).json(deletedOption);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export { getAllOptions, getOption, createOption, updateOption, deleteOption };
