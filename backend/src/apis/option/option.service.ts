import { AppDataSource } from '../../config/data-source';
import { createOptionWithParams, mapOption } from './option.helper';
import { Option } from './option.model';

const optionRepository = AppDataSource.manager.getRepository(Option);

const getOptions = async (): Promise<Option[]> => {
  const options: Option[] = await optionRepository.find();
  return options;
};

const getOptionById = async (optionId): Promise<Option> => {
  const option: Option = await optionRepository.findOneBy({ id: optionId });
  if (option === null) {
    throw new Error('Option with that id not found');
  }
  return option;
};

const getOptionByName = async (optionName: string): Promise<Option> => {
  const option: Option = await optionRepository.findOneBy({ name: optionName });
  if (option === null) {
    throw new Error(`Option with name: ${optionName} not found`);
  }
  return option;
};

const addOption = async (
  name: string,
  description: string
): Promise<Option> => {
  const optionToCreate: Option = createOptionWithParams(name, description);

  const addedOption: Option = await optionRepository.save(optionToCreate);
  if (addedOption === null) {
    throw new Error('Option not created');
  }
  return addedOption;
};

const modifyOption = async (id, req): Promise<Option> => {
  const option: Option = await getOptionById(id);

  const optionToModify: Option = mapOption(req, option);

  const modifiedOption: Option = await optionRepository.save(optionToModify);
  if (modifiedOption === null) {
    throw new Error('Option not modified');
  }
  return modifiedOption;
};

const removeOption = async (id): Promise<Option> => {
  const optionToRemove: Option = await getOptionById(id);

  const removedOption: Option = await optionRepository.remove(optionToRemove);
  if (removedOption === null) {
    throw new Error('Option not removed');
  }
  return removedOption;
};

export {
  getOptions,
  getOptionById,
  getOptionByName,
  addOption,
  modifyOption,
  removeOption,
};
