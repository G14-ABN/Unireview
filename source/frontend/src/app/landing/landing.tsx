'use client'
import React from 'react'
import { Search } from './search/search'
import { PageModel } from "../areaPersonale/createReview/models/pageModel"

export default function landing() {
  var pageModel = new PageModel("UniReview", Search(), 'Le mie recensioni', './myReview')
  return (
    <body>
      {pageModel.pageModel()}
    </body>
  )
}