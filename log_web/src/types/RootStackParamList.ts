import { Detail } from "./detail";

export type RootStackParamList = {
    Main: undefined;
    Home: undefined;
    Detail: { detail: Detail };
    Sub: undefined;
    Search: undefined;
    Review: { detail: Detail };
    ButtonIcon: undefined;
};