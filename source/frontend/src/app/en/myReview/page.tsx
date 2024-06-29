'use client'
import { List } from "../areaPersonale/review/myReviews"
import { PageModel } from "../landing/models/pageModel"

export default function reviews() {
  var pageModel = new PageModel("My reviews", List(), 'Search', 'http://localhost:3000/en')
  return (
      pageModel.pageModel()
  )
}