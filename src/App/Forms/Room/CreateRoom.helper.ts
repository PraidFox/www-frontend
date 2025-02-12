import {IFieldsForForms} from "../../../tools/interfaces/fieldsForForms.interface.ts";
import {IOptLocation} from "../../../tools/interfaces/option.interface.ts";
import {CreateRoomDto, LocationAndDetailsDto, NewLocationAndDetailsDto} from "../../../tools/Models/room.dto.ts";
import {NF_CreateRoom} from "../../../tools/storage/FieldName.storage.ts";
import {UserDto} from "../../../tools/Models/user.dto.ts";
import {optionsDateTypeType} from "../../../tools/constant/options.constant.ts";
import {dateFormat} from "../../../tools/constant/constants.ts";

export const convertDataToPost = (
    values: IFieldsForForms,
    selectedLocations: { index: number, location: IOptLocation }[],
    newLocations: { index: number, location: string }[],
    infoUser: UserDto,
    typeDateValue: optionsDateTypeType
): CreateRoomDto => {

    const newRoom: CreateRoomDto = {
        title: values[NF_CreateRoom.nameRoom],
        //description: values[NF_CreateRoom.nameRoom],
        authorId: infoUser.id,
        membersId: values[NF_CreateRoom.members],
    }

    if (typeDateValue === 'date_all_location') {
        newRoom.exactDate = values[NF_CreateRoom.dateAllLocation]?.format(dateFormat)
    }


    if (selectedLocations.length > 0) {
        const existingLocations: LocationAndDetailsDto[] = []

        selectedLocations.forEach(selected => {
            const locationAndDetails: LocationAndDetailsDto = {
                existingLocationsId: Number(selected.location.value),
                description: values[`${NF_CreateRoom.location_info}${selected.index}`],
            }

            if (typeDateValue === 'date_for_every_location') {
                // location.exactDate = new Date(values[`${NF_CreateRoom.location_data}${selected.index}`].format(dateFormat))
                locationAndDetails.exactDate = values[`${NF_CreateRoom.location_data}${selected.index}`]?.format(dateFormat)
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
                description: values[`${NF_CreateRoom.new_location_info}${newLocation.index}`],
            }
            if (typeDateValue === 'date_for_every_location') {

                locationAndDetails.exactDate = values[`${NF_CreateRoom.new_location_data}${newLocation.index}`]?.format(dateFormat)
            }
            newLocationsDto.push(locationAndDetails)
        })
        newRoom.newLocationsAndDetails = newLocationsDto
    }

    return newRoom
}