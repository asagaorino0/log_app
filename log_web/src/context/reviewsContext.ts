import { createContext } from "react";
import { Review } from '../types/review'
// export interface review {
//     setReview: []
//     userId: string,
//     name: string,
//     src: string,
//     title: string,
//     dsc: string,
//     url: string,
//     reviewText; string,
//     navigation: any,
//     star: number
//     id: string
//     createdAt: string
// }

type ReviewsContextValue = {
    reviews: Review[];
    setReviews: (reviews: Review[]) => void;
};

export const ReviewsContext = createContext<ReviewsContextValue>({
    reviews: [],
    setReviews: () => { },
});