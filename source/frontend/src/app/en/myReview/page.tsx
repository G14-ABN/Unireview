'use client'
import { List } from "../areaPersonale/createReview/myReviews"
import { PageModel } from "../areaPersonale/createReview/models/pageModel"

export default function reviews() {
  var pageModel = new PageModel("My reviews", List(), 'Search', '../')
  return (
      pageModel.pageModel()
  )
}