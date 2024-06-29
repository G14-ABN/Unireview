'use client'
import React from 'react'
import { Search } from './search/search'
import { PageModel } from "./models/pageModel"

export default function landing() {
  var pageModel = new PageModel("UniReview", Search(), 'My reviews', 'http://localhost:3000/en/myReview')
  
  return pageModel.pageModel()
}