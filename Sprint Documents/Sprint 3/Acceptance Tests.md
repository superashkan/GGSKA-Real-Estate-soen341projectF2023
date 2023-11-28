# Searching for Brokers:
## Acceptance Test 1:

1. The user accesses the broker search form page.
2. The user inputs field-appropriate information for any (however at least 1) of the search criteria fields (such as first name and last name).
3. The user clicks on a “Search” button.
4. The user is redirected to a page (which could be the same page as that on which the user inputted the search criteria) containing a neatly formatted list of brokers whose information matches the recently inputted search criteria.

## Acceptance Test 2:

1. The user accesses the broker search form page.
2. The user inputs field-appropriate information for none of the search criteria fields (such as first name and last name).
3. The user clicks on a “Search” button.
4. The user receives an error message informing them that they must input field-appropriate information for at least one of the search criteria fields.
5. The user is kept on the broker search page.


# Submitting Offers to Purchase Properties:
## Acceptance Test 1:

1. The user accesses a property’s information page.
2. The user clicks on a “Make Purchase Offer” button/link.
3. The user is redirected to a “Make Purchase Offer” form.
4. The user inputs a positive value into the field where the monetary purchase offer is to be inputted
5. The user clicks on a “Make Offer” button.
6. The user is informed that their offer for purchase has been successfully submitted.

## Acceptance Test 2:

1. The user accesses a property’s information page.
2. The user clicks on a “Make Purchase Offer” button/link.
3. The user is redirected to a “Make Purchase Offer” form.
4. The user inputs either a negative value or a blank/empty value into the field where the monetary purchase offer is to be inputted
5. The user clicks on a “Make Offer” button.
6. The user receives an error message informing them that they must input a positive numeric value into the field for the monetary purchase offer.

# Managing Purchase Offers
## Acceptance Test 1:
1. The user, with a Broker account, accesses a list of their property listings.
2. The user accesses the information page of one of the property listings in the aforementioned list.
3. The user accesses a list of submitted offers for the purchase of the currently accessed property.
4. The user clicks on an “Accept Offer” button for any single offer.
5. The user receives a message that they have successfully accepted an offer for the purchase of the currently accessed property.
6. The user finds that they are no longer able to accept any other offers for the purchase of the currently accessed property as long as an offer has been accepted. 

## Acceptance Test 2:
1. The user, with a Broker account, accesses a list of their property listings.
2. The user accesses the information page of one of the property listings in the aforementioned list.
3. The user accesses a list of submitted offers for the purchase of the currently accessed property.
4. The user clicks on a “Reject Offer” button for any single offer.
5. The user receives a message that they have successfully rejected an offer for the purchase of the currently accessed property.
6. The user discovers that the offer which they had just rejected is no longer present on the list of submitted purchase offers for the currently accessed property.
