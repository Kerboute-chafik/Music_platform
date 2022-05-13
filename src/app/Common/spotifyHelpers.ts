import { User } from "../interfaces/User";




export function SpotifyUserToUser(user: SpotifyApi.CurrentUsersProfileResponse): User{
    return {
        id: user.id,
        name: user.display_name,
        imagemUrl: user.images.pop().url
    }
}