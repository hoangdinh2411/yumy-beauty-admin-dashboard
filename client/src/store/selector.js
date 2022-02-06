import { createSelector } from "@reduxjs/toolkit";

const servicesData = (state) => state.services;
const categoriesData = (state) => state.categories;
const searchFilter = (state) => state.serviceFilter.search;
const categoryFilter = (state) => state.serviceFilter.category;
const priceFromFilter = (state) => state.serviceFilter.priceFrom;

const serviceRemainingSelector = createSelector(
  servicesData,
  searchFilter,
  categoryFilter,
  priceFromFilter,
  (services, searchText, category, priceFrom) => {
    const filteredServices = services?.filter((service) => {
      const text = new RegExp(searchText?.trim(), "i") ;
      if (category === "All") {
        return  service?.name?.match(text) 
      } 
      return service.name.match(text) && service.category === category
    });

    switch (priceFrom) {
      case "Hight":
        return filteredServices.sort((a, b) => b.price - a.price);
      case "Low":
        return filteredServices.sort((a, b) => a.price - b.price);
      default:
        return filteredServices;
    }
  }
);


const categoriesRemainingSelector = createSelector(categoriesData,searchFilter,categoryFilter, (categories, searchText, category)=>{
    return categories.filter(item=>{
      const text = new RegExp(searchText?.trim(), "i") ;
      if (category === "All") {
        return  item?.name?.match(text) 
      } 
      return item.name.match(text) && item._id === category
    })
})

export { serviceRemainingSelector,categoriesRemainingSelector };
