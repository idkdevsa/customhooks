import _ from "lodash";

const useDataFilter = (isLoading, inputData, filterName, filterValue) => {
  const dataD = isLoading ? [] : [].concat.apply([], inputData);
  const filter = (func, dataD) => dataD.filter(func);
  const prop = (key) => (obj) => obj[key];
  const getValue = prop(filterName);
  const strIncludes = (filterValue) => (str) => str.includes(filterValue);
  const filterPipe = (...fns) => (x) => fns.reduce((y, func) => func(y), x);
  const valueIncludes = (filterValue) =>
    filterPipe(getValue, strIncludes(filterValue));

  const filteredData = _.merge(...filter(valueIncludes(filterValue), dataD));

  return [{ filteredData }];
};

export default useDataFilter;
