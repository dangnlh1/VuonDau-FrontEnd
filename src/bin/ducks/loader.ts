/**
 * @app VuonDau
 * @author phutruongck
 */

import {Reducer} from 'redux';

type RequireContext = {
  keys(): string[];
  (id: string): any;
  <T>(id: string): T;
  resolve(id: string): string;
  id: string;
};

type Reducers = {
  [key: string]: Reducer;
};

type Sagas = GeneratorFunction[];

type ReducerModule = {
  default: Reducer;
};

type SagaModule = {
  default: GeneratorFunction;
};

if (process.env.NODE_ENV === 'test' && typeof require.context === 'undefined') {
  const fs = require('fs');
  const path = require('path');

  require.context = (baseDir = '.', subDir = false, pattern = /\.ts$/) => {
    const files: any = {};
    function readDirectory(directory: any) {
      fs.readdirSync(directory).forEach((file: any) => {
        const fullPath = path.resolve(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
          if (subDir) readDirectory(fullPath);
          return;
        }
        if (!pattern.test(fullPath)) return;
        files[fullPath] = true;
      });
    }

    readDirectory(path.resolve(__dirname, baseDir));

    function Module(file: string) {
      return require(file);
    }

    Module.keys = () => Object.keys(files);
    return Module as RequireContext;
  };
}

const snakeToCamel = (str: string) => {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', ''),
  );
};

const getModuleName = (path: string): string => {
  const name = path.replace(/\.\/(.+)\/.+\.ts/, '$1');
  return snakeToCamel(name);
};

export const loadReducers = (): Reducers => {
  const reducers: Reducers = {};
  const context = require.context('./', true, /\.\/.+\/reducers\.ts$/);
  context.keys().forEach((key: string) => {
    const name = getModuleName(key);
    if (reducers[name]) {
      throw new Error(`Store name already existing: ${key}`);
    }
    const loadedModule = <ReducerModule>context(key);
    if (!loadedModule.default) {
      throw new Error(
        `Reducer must be exported with default statement: ${key}`,
      );
    }
    reducers[name] = loadedModule.default;
  });

  return reducers;
};

export const loadSagas = (): Sagas => {
  const sagas: Sagas = [];
  const context = require.context('./', true, /\.\/.+\/sagas.ts$/);
  context.keys().forEach((key: any) => {
    const loadedModule = <SagaModule>context(key);
    if (!loadedModule.default) {
      throw new Error(`Saga must be exported with default statement: ${key}`);
    }
    sagas.push(loadedModule.default);
  });

  return sagas;
};
