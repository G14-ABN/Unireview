'use client'
import { List } from "../areaPersonale/review/myReviews"
import { PageModel } from "../landing/models/pageModel"

export default function reviews() {
  //var pageModel = new PageModel("Le mie recensioni", List(), 'Cerca', '../')
  return (
      PageModel("Le mie recensioni", List(), 'Search', '../')
  )
}