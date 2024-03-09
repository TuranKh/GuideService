import { AxiosResponse } from "axios";

export type AdditionalItemDto = {
    destination: string;
    paymentTypeEnumId: number;
    price: number;
    quantity: number;
};

export type AppealRequest = {
    assignedEmployeeId: number;
    requestDate: string;
    customerCount: number;
    languageEnumId: number;
    placeOfMeeting: string;
    groupLeadId: number;
    contactOfTourist: string;
    file: string[];
    tourInfoList: TourDto[];
    restaurantReservationList: RestaurantReservationDto[];
    museumList: MuseumDto[];
    additionalItems: AdditionalItemDto[];
    note: string;
    driverId: number;
};

export type MuseumDto = {
    name: string;
    price: number;
    quantity: number;
};

export type RestaurantReservationDto = {
    requestDateTime: string;
    restaurantId: number;
    mealTypeId: number;
    restaurantName: string;
    mealMenuId: number;
    quantity: number;
    paymentTypeEnumId: number;
    price: number;
};

export type TourDto = {
    dateTime: string;
    guideCategoryEnumId: number;
    carTypeId: number;
    tourDestinationId: number;
    guideTypeEnumId: number;
    transportId: number;
};

export type EnumResponse = {
    id: number;
    value: string;
    name: string;
    active: boolean;
    regDate: string;
};

export type Appeal = {
    regUserId: number;
    regDate: string;
    editUserId: number;
    editDate: string;
    archivedUserId: number;
    id: number;
    orderNumber: string;
    assignedEmployeeId: number;
    requestDate: string;
    customerCount: number;
    languageEnum: string;
    placeOfMeeting: string;
    note: string;
    // Assuming more properties as needed, complete them as per the actual schema
    groupLead: AppUser;
    contactOfTourist: string;
    file: string[];
    tourInfoList: TourDto[];
    restaurantReservationList: RestaurantReservationDto[];
    museumList: MuseumDto[];
    additionalItems: AdditionalItemDto[];
    appealStatus: string;
    driverId: number;
    driver: AppUser;
};

export type AppUser = {
    regUserId: number;
    regDate: string;
    editUserId: number;
    editDate: string;
    archivedUserId: number;
    id: number;
    username: string;
    pin: string;
    genderType: "MALE" | "FEMALE";
    lastName: string;
    firstName: string;
    fatherName: string;
    birth: string;
    photoUrl: string;
    currentRole: Role;
};

export type Role = {
    regUserId: number;
    regDate: string;
    editUserId: number;
    editDate: string;
    archivedUserId: number;
    id: number;
    name: string;
    keyword: string;
};

export type ServerResponse<T> = Promise<AxiosResponse<T>>;
