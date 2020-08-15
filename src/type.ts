export interface Film {
  id?: number,
  title?: string,
  src?: string,
  genre?: string,
  date?: number,
  posterBig?: string,
  rating?: number,
  ratingLevel?: string | number,
  ratingCount?: number,
  description?: string,
  actors?: string[] | string,
  director?: string,
  previewVideoLink?: string,
  runTime?: number,
  bg?: string,
  bgSrc?: string,
  videoLink?: string,
  isFavorite?: boolean
}
export interface Comment {
  reviewId?: number,
  reviewRating: number,
  reviewComment: string,
  reviewDate: string,
  reviewUserId?: number,
  reviewUserName:string
}
