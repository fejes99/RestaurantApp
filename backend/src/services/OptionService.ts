import { AppDataSource } from '../config/data-source';
import { Option } from '../entity';

const optionRepository = AppDataSource.manager.getRepository(Option);

const getOptions = async (): Promise<Option[]> => {
  const options = await optionRepository.find();
  return options;
};

const getOptionById = async (optionId): Promise<Option> => {
  const option = await optionRepository.findOneBy({ id: optionId });
  return option;
};

const getOptionByName = async (optionName: string): Promise<Option> => {
  const option = await optionRepository.findOneBy({ name: optionName });
  return option;
};

const addOption = async (option: Option): Promise<Option> => {
  const addedOption = await optionRepository.save(option);
  return addedOption;
};

const modifyOption = async (option: Option): Promise<Option> => {
  const modifiedOption = await optionRepository.save(option);
  return modifiedOption;
};

const removeOption = async (option: Option): Promise<Option> => {
  const removedOption = await optionRepository.remove(option);
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
