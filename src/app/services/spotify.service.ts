import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from "spotify-web-api-js"
import { User } from '../interfaces/User';
import { SpotifyPlaylistforPlaylist, SpotifyUserToUser } from '../Common/spotifyHelpers';
import { Playlist } from '../interfaces/Playlist';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: User;
  constructor() {
    this.spotifyApi = new Spotify();
   }

   async initializeUser() {
    if(!!this.user)
      return true;

    const token = localStorage.getItem('token');

    if(!token)
      return false;

    try {

      this.defineAccessToken(token);
      await this.getSpotifyUser();
      return !!this.user;

    }catch(ex){
      return false;
    }
  }
  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = SpotifyUserToUser(userInfo);
    console.log(this.user);
  }

  getUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType; 
  }

  getTokenUrlCallback() {
    if(!window.location.hash)
      return '';
      const params = window.location.hash.substring(1).split('&');
      return params[0].split('=')[1];
  }

  defineAccessToken(token: string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async getPlaylistUser(offset=0 ,limit=50):Promise<Playlist[]>{
    const playlist = await this.spotifyApi.getUserPlaylists(this.user.id,{offset,limit});
    return playlist.items.map(x=> SpotifyPlaylistforPlaylist(x))
  }

}
