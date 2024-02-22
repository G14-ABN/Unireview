'use client'
import { List } from "../areaPersonale/createReview/myReviews"
import { PageModel } from "../areaPersonale/createReview/models/pageModel"

export default function reviews() {
  var pageModel = new PageModel("Le mie recensioni", List())
  return (
    <body>
      {pageModel.pageModel()}
    </body>
  )
}