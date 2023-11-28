Giancarlo:
- Created a mortgage calculator which can calculate a monthly mortgage payment amount for buyable homes of any price (given that a down payment, loan lifetime & annual interest rate are all provided) (10:10 AM - 11:15 AM (09/14/2023))
- Created a broker review form which allows individuals to review a specific broker by giving them a star rating from 1 to 5 stars as well as leaving one or more comments about them (10:20 AM - 11:15 AM (09/16/2023))
- Performed some re-organizing of files in order to give way to better resemblance of a more organized file & directory structure. Moved all of the Sprint-related documents and folders to a single folder for better organization's sake. Made some syntax adjustments (such as making use of === insteas of ==) in conjunction with recommendations from ESLint. Removed all (if not most) repeated references to helper functions and instead imported the methods within all other classes which need them. (3:00 PM - 11:15 PM (11/25/2023))
- Removed 'Sell' from the navigation bar since only brokers can list properties for sale. Changed some code around in order to only have one data retrieval function call in the useEffect() function within certain component classes, in order to minimize the risk of memory overflow. Updated the offer approval functionality (this needs to be code-reviewed) such that it now automatically rejects all other offers whenever one is accepted. Made it so that only brokers who do not own a certain property can make an offer. Made it so that searching for properties will now allow you to visit a property's listing page via a link button. Updated profile page such that it now shows whether a buyable property has had a purchase offer accepted or not. (3:30 - 5:30 PM, 6:00 - 11:15 PM (11/26/2023))
- Created a generic Account entity in the database in which one of three types of accounts (Homebuyer, Property Renter or Broker) may be stored. Adjusted view and interaction permissions accordingly for every type of account (property renters can now only view rentable properties, only homebuyers can access the mortgage calculator, etc.). Created separate profile pages for each type of account, with appropriate information displayed for every type. Optimized information viewing to not show empty tables. (9:00 AM - 8:00 PM (11/27/2023))

Shayne:
- Code Review (7:00 - 9:00 PM (11/27/2023))
- Maintenance of CSS, HTML code (10:00 - 12:00 PM (11/23/2023))
- Assisted Giancarlo with some decisions made for the functionality of code (11:00 - 12:00 (11/22/2023))
- 

Khanh:
- Wrote the meeting minutes for Meeting 10 (4:30 - 5:00 PM (11/16/2023))

Chimdindu:

Ashkan:
- Reviewed code for the backend (2:30 - 4:00 PM (11/27/2023))
- Worked on presentation and the presentation slides ( 4:00 - 5:30 PM (11/27/2023))
- Closed remaining open issues and check website functionality ( 8:00 - 8:30 PM (11/27/2023))
  
  
