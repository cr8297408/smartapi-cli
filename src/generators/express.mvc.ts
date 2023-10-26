import { CaseConverterEnum, generateTemplateFilesBatch } from 'generate-template-files';

export interface IGenerateRouter {
  name: string;
}

export const GenerateRouter = ({ name }: IGenerateRouter) => {
  generateTemplateFilesBatch([
  {
    option: 'GENERATE_TEST',
    defaultCase: CaseConverterEnum.PascalCase,
    entry: {
      folderPath: './src/templates/route',
    },
    dynamicReplacers: [
        { slot: '__name__', slotValue: name },
      ],
    output: {
      path: './src/routes',
      pathAndFileNameDefaultCase: CaseConverterEnum.KebabCase,
      overwrite: false,
    },
  },
])
}
