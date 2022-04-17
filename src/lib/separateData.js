const separateData = (type, data) => {
  // Take data out of movies that matches type into new Array
  // then get index of data in the new array and compare it to the current index
  // of the filter method. If the index matches it will return a single one of the data type
  // filtering out the duplicates.
  console.log('sep data', data);
  const dataList = data
    .map((item) => item[type])
    .filter(
      (item, index, self) =>
        self.findIndex((dir) => dir.Name === item.Name) === index
    );

  return dataList;
};

export default separateData;
