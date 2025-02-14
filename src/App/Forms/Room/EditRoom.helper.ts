import {IFieldsForForms} from "../../../tools/interfaces/fieldsForForms.interface.ts";
import {IOptLocation} from "../../../tools/interfaces/option.interface.ts";
import {CreateRoomDto, LocationAndDetailsDto, NewLocationAndDetailsDto} from "../../../tools/Models/room.dto.ts";
import {NF_CreateRoom} from "../../../tools/storage/FieldName.storage.ts";
import {UserDto} from "../../../tools/Models/user.dto.ts";
import {DateType} from "../../../tools/constant/options.constant.ts";

export const convertDataToPost = (
    values: IFieldsForForms,
    selectedLocations: { index: number, linkId: number, location: IOptLocation }[],
    newLocations: { index: number, location: string }[],
    infoUser: UserDto,
    typeDateValue: DateType
): CreateRoomDto => {

    const newRoom: CreateRoomDto = {
        title: values[NF_CreateRoom.nameRoom],
        description: values[NF_CreateRoom.description],
        authorId: infoUser.id,
        membersId: values[NF_CreateRoom.members],
        dateType: values[NF_CreateRoom.dateType],
    }

    if (typeDateValue === DateType.ALL_LOCATIONS_DATE) {
        newRoom.exactDate = values[NF_CreateRoom.dateAllLocation]?.toDate()
    }

    if (selectedLocations.length > 0) {
        const existingLocations: LocationAndDetailsDto[] = []

        selectedLocations.forEach(selected => {
            const locationAndDetails: LocationAndDetailsDto = {
                linkId: selected.linkId,
                existingLocationsId: Number(selected.location.value),
                description: values[`${NF_CreateRoom.location_description}${selected.index}`],
            }

            if (typeDateValue === DateType.EACH_LOCATION_DATE) {
                locationAndDetails.exactDate = values[`${NF_CreateRoom.location_data}${selected.index}`]?.toDate()
            }
            existingLocations.push(locationAndDetails)
        })
        newRoom.existingLocationsAndDetails = existingLocations
    }

    if (newLocations.length > 0) {
        const newLocationsDto: NewLocationAndDetailsDto[] = []
        newLocations.forEach(newLocation => {
            const locationAndDetails: NewLocationAndDetailsDto = {
                newLocation: {
                    name: values[`${NF_CreateRoom.new_location_name}${newLocation.index}`],
                    url: values[`${NF_CreateRoom.new_location_url}${newLocation.index}`],
                    address: values[`${NF_CreateRoom.new_location_address}${newLocation.index}`],
                },
                description: values[`${NF_CreateRoom.new_location_description}${newLocation.index}`],
            }
            if (typeDateValue === DateType.EACH_LOCATION_DATE) {

                locationAndDetails.exactDate = values[`${NF_CreateRoom.new_location_data}${newLocation.index}`]?.toDate()
            }
            newLocationsDto.push(locationAndDetails)
        })
        newRoom.newLocationsAndDetails = newLocationsDto
    }

    return newRoom
}
