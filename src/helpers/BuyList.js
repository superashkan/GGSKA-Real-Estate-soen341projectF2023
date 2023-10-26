//HomeBuy #1 https://www.centris.ca/en/houses~for-sale~montreal-pierrefonds-roxboro/13519692?view=Summary
//HomeBuy #2 https://www.centris.ca/en/houses~for-sale~kirkland/27617011?view=Summary
//HomeBuy #3 https://www.centris.ca/en/houses~for-sale~beaconsfield/26179711?view=Summary
//HomeBuy #4 https://www.centris.ca/en/houses~for-sale~westmount/27658752?view=Summary
//HomeBuy #5 https://www.centris.ca/en/duplexes~for-sale~montreal-lasalle/12395231?view=Summary
//HomeBuy #6 https://www.centris.ca/en/houses~for-sale~montreal-verdun-ile-des-soeurs/13434905?view=Summary
//HomeBuy #7 https://www.centris.ca/en/houses~for-sale~montreal-riviere-des-prairies-pointe-aux-trembles/12873755?view=Summary
//HomeBuy #8 https://www.centris.ca/en/houses~for-sale~montreal-pierrefonds-roxboro/13519692?view=Summary

import Buy1 from '../assets/buy1.jpg'
import Buy2 from '../assets/buy2.jpg'
import Buy3 from '../assets/buy3.jpg'
import Buy4 from '../assets/buy4.jpg'
import Buy5 from '../assets/buy5.jpg'
import Buy6 from '../assets/buy6.jpg'
import Buy7 from '../assets/buy7.jpg'
import Buy8 from '../assets/buy8.jpg'

var id = 0;

export let BuyList = [
    {
      id: id++,
      address: "4972, Rue Kent, Montréal (Pierrefonds-Roxboro)",
      image: Buy1,
      price: "579,000$",
      type: "Bungalow, Detached",
      lotSize: "5,402 sqft",
      purePrice: 579000,
      pureLotSize: 5402,
      bedrooms: 1,
      bathrooms: 2,
    },

    {
        id: id++,
        address: "2, Rue du Beaujolais, Kirkland",
        image: Buy2,
        price: "1,699,000$" ,
        type: "Two Storey, Detached",
        lotSize: "10,933 sqft",
        purePrice: 1699000,
        pureLotSize: 10933,
        bedrooms: 2,
        bathrooms: 2,
    },

    {
        id: id++,
        address: "84, Lynwood Drive, Beaconsfield",
        image: Buy3,
        price: "830,000$",
        type: "Two Storey, Detached",
        lotSize: "9,000 sqft",
        purePrice: 830000,
        pureLotSize: 9000,
        bedrooms: 4,
        bathrooms: 1,
    },

    {
          id: id++,
          address: "627, Avenue Murray Hill, Westmount",
          image: Buy4,
          price: "2,100,000$" ,
          type: "Two Storey, Semi-Detached",
          lotSize: "3,722 sqft",
          purePrice: 2100000,
          pureLotSize: 3722,
          bedrooms: 2,
          bathrooms: 2,
    },

    {
          id: id++,
          address: "445 - 447, Rue Dawn, Montréal (LaSalle)",
          image: Buy5,
          price: "774,000$",
          type: "Semi-Detached",
          lotSize: "3,363 sqft",
          purePrice: 774000,
          pureLotSize: 3363,
          bedrooms: 3,
          bathrooms: 1,
    },

    {
            id: id++,
            address: "1170, 2e Avenue, Montréal (Verdun/Île-des-Soeurs",
            image: Buy6,
            price: "1,179,000$" ,
            type: "Two Storey, Detached",
            lotSize: "4,408 sqft",
            purePrice: 1179000,
            pureLotSize: 4408,
            bedrooms: 5,
            bathrooms: 2,
    },

    {
            id: id++,
            address: "8495, Avenue Pierre-Martin, Montréal (Rivière-des-Prairies/Pointe-aux-Trembles)",
            image: Buy7,
            price: "849,900$",
            type: "Two Storey, Detached",
            lotSize: "8,150 sqft",
            purePrice: 849900,
            pureLotSize: 8150,
            bedrooms: 3,
            bathrooms: 2,
    },

    {
              id: id++,
              address: "171, Avenue Duke-of-Kent, Pointe-Claire",
              image: Buy8,
              price: "624,000$" ,
              type: "Split-level, Semi-Detached",
              lotSize: "6,500 sqft",
              purePrice: 624000,
              pureLotSize: 6500,
              bedrooms: 2,
              bathrooms: 1,
    },
]

export let createProperty = function(address, neatPrice, type, neatSize, purePrice, pureLotSize, bedrooms, bathrooms) {
  BuyList.push({
    id: id++,
    address: address,
    price: neatPrice,
    type: type,
    lotSize: neatSize,
    purePrice: purePrice,
    pureLotSize: pureLotSize,
    bedrooms: bedrooms,
    bathrooms: bathrooms
  })
}


// export let deleteProperty = function(idInput) {
//   for (var i = 0;i < BuyList.length;i++) {
//     if (BuyList[i].id == idInput) {
//       BuyList.splice(i);
//     }
//   }
// }
