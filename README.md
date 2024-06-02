## [Live Demo](https://pos-pt6u-kenans-projects-03b0f583.vercel.app/)

## how to run
```
npm install
npm run dev
```

## discount codes
- OVERALL10      (10% off overall)    
- BOGOFAPPLE     (buy one apple get 1 apple free)  
- THRESHOLD50     ($50 off once cart reach 200) , try 100 banana and 100 orange  

## how to run test
```
npm run test
```

## main ideas:
1. to add new discount, src/utils/discount/discountStrategies.ts need to be modified 
2. javascript Map is used for cart items considering update/remove is frequent and need to be efficiently, otherwise we would have to loop through the cart items to find the item product 'product id' before we can update/delete the cart item.
