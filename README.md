`Range` is a React component allowing users to input numeric values within a specific range. It can accept a range of values (min/max), or a range of values (min/max) and an array with all the fixed positions for the range

## To run the application 🚀

Run the client:
````
cd range-mango
yarn 
yarn start
````

Run Jest tests:
`````
yarn test
`````


## Usage

Normal Range:
  - Drag and drop for select a new value
  - Writte the new value in the input
```jsx
import React, { useState } from "react";
import { Range } from "../components";

const Exercise1 = () => {

  const [priceData, setPriceData] = useState({ min: 1, max: 1 });

  return (
      <Range
        minPrice={priceData.min}
        maxPrice={priceData.max}
        fixedType={false}
      />
  );
};

export default Exercise1;
```

Fixed values range:
  - Values can be only from the array
```jsx
import React, { useState } from "react";
import { Range } from "../components";

const Exercise2 = () => {
  const [priceData, setPriceData] = useState({
    min: 1,
    max: 70.99,
    prices: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
  });
  return (
      <Range
        minPrice={priceData.min}
        maxPrice={priceData.max}
        priceArray={priceData.prices}
        fixedType={true}
      />
  );
};

export default Exercise2;

```
