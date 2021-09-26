import { Detail } from "./detail";
import { Review } from "./review";

export type RootStackParamList = {
    Main: undefined;
    Home: undefined;
    Detail: { detail: Detail };
    Sub: undefined;
    Search: { review: Review };
    Review: undefined;
    ReviewItem: { detail: Detail };
    Mikaiketu: { detail: Detail };
    ButtonIcon: undefined;
    ButtonImage: undefined;
};