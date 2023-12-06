import { CaseConverterEnum, generateTemplateFilesBatch } from 'generate-template-files';

export interface IGenerateRouter {
  name: string;
  path: string;
}
export const GenerateRouter = ({ name, path }: IGenerateRouter) => {
  generateTemplateFilesBatch([
    {
      option: 'GENERATE_ROUTE',
      defaultCase: CaseConverterEnum.PascalCase,
      entry: {
        folderPath: './src/templates/route',
      },
      dynamicReplacers: [
          { slot: '__name__', slotValue: name },
          { slot: '__pathName__', slotValue: path },
        ],
      output: {
        path: './src/routes',
        pathAndFileNameDefaultCase: CaseConverterEnum.PascalCase,
        overwrite: false,
      },
    },
  ])
};

export interface IGenerateController {
  name: string;
}
export const GenerateController = ({ name }: IGenerateController) => {
  generateTemplateFilesBatch([
    {
      option: 'GENERATE_CONTROLLER',
      defaultCase: CaseConverterEnum.PascalCase,
      entry: {
        folderPath: './src/templates/controller',
      },
      dynamicReplacers: [
          { slot: '__name__', slotValue: name },
        ],
      output: {
        path: './src/controllers',
        pathAndFileNameDefaultCase: CaseConverterEnum.PascalCase,
        overwrite: false,
      },
    },
  ])
};
