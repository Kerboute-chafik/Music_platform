import { User } from "../interfaces/User";
import {Playlist} from "../interfaces/Playlist";



export function SpotifyUserToUser(user: SpotifyApi.CurrentUsersProfileResponse): User{
    return {
        id: user.id,
        name: user.display_name,
        imagemUrl: user.images.pop().url
    }
}


export function SpotifyPlaylistforPlaylist(Playlist :SpotifyApi.PlaylistObjectSimplified):Playlist{
    return{
        id:Playlist.id,
        name:Playlist.name,
        urlImage:Playlist.images.pop().url
    };

}