import {all} from "redux-saga/effects"
import * as accountManageSaga from "./accountManageSaga"

export default function* rootSaga(){
    yield all([
        // Saga Staff
        accountManageSaga.followActiongetAccount(),
        accountManageSaga.followActionGetRole(),
        accountManageSaga.followActionCreateStaff(),
        accountManageSaga.followActionUpdateStaff(),
        accountManageSaga.followActionDeleteStaff(),
    ])
}