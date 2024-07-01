'use client'
import React from 'react'
import { Search } from './search/search'
import { PageModel } from './models/pageModel'

export default function landing() {
  //var pageModel = pageModel("UniReview", Search(), 'Le mie recensioni', './myReview')
  
  return PageModel("UniReview", Search(), 'My reviews', './myReview')
}