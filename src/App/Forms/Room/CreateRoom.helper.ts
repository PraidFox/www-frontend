import {IFieldsForForms} from "../../../tools/interfaces/fieldsForForms.interface.ts";
import {IOptLocation} from "../../../tools/interfaces/option.interface.ts";
import {CreateRoomDto, CreateRoomLocationDto, LocationMoreInfoDto} from "../../../tools/Models/room.dto.ts";
import {NF_CreateRoom} from "../../../tools/storage/FieldName.storage.ts";
import {UserDto} from "../../../tools/Models/user.dto.ts";
import {optionsDateTypeType} from "../../../tools/constant/options.constant.ts";

export const convertDataToPost = (
    values: IFieldsForForms,
    selectedLocations: { index: number, location: IOptLocation }[],
    newLocations: { index: number, location: string }[],
    infoUser: UserDto,
    typeDateValue: optionsDateTypeType
): CreateRoomDto => {

    const newRoom: CreateRoomDto = {
        title: values[NF_CreateRoom.nameRoom],
        description: values[NF_CreateRoom.nameRoom],
        authorId: infoUser.id,
        membersId: values[NF_CreateRoom.members],
    }

    if (typeDateValue === 'date_all_location') {
        newRoom.exactDate = values[NF_CreateRoom.dateAllLocation].format('YYYY-MM-DD HH:mm:ss')
    }


    if (selectedLocations.length > 0) {
        const existingLocations: LocationMoreInfoDto[] = []
        console.log("selectedLocations", selectedLocations)
        selectedLocations.forEach(selected => {
            const location: LocationMoreInfoDto = {
                existingLocationsId: selected.location.value!.toString(),
                description: values[`${NF_CreateRoom.location_info}${selected.index}`],
            }

            if (typeDateValue === 'date_for_every_location') {
                location.exactDate = values[`${NF_CreateRoom.location_data}${selected.index}`].format('YYYY-MM-DD HH:mm:ss')
            }
            existingLocations.push(location)
        })
        newRoom.existingLocations = existingLocations
    }

    if (newLocations.length > 0) {
        const newLocationsDto: CreateRoomLocationDto[] = []
        newLocations.forEach(newLocation => {
            const location: CreateRoomLocationDto = {
                name: values[`${NF_CreateRoom.new_location_name}${newLocation.index}`],
                description: values[`${NF_CreateRoom.new_location_info}${newLocation.index}`],
                url: values[`${NF_CreateRoom.new_location_url}${newLocation.index}`],
                address: values[`${NF_CreateRoom.new_location_address}${newLocation.index}`],
            }
            if (typeDateValue === 'date_for_every_location') {

                location.exactDate = values[`${NF_CreateRoom.new_location_data}${newLocation.index}`].format('YYYY-MM-DD HH:mm:ss')
            }
            newLocationsDto.push(location)
        })
        newRoom.newLocations = newLocationsDto
    }

    return newRoom
}